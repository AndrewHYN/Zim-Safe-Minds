import {CRISIS_TEXT, screenText, moderationSignal, parseMessages, SYSTEM_INSTRUCTIONS} from "../lib/safety.mjs";

export const config={maxDuration:30};
const requests=new Map();

function json(res,status,body){
 res.setHeader("Content-Type","application/json; charset=utf-8");
 res.setHeader("Cache-Control","no-store, max-age=0");
 res.setHeader("X-Content-Type-Options","nosniff");
 return res.status(status).json(body);
}
function throttle(req){
 const now=Date.now();
 if(requests.size>3000) requests.clear();
 const ip=String(req.headers["x-vercel-forwarded-for"]||req.headers["x-forwarded-for"]||req.socket?.remoteAddress||"unknown").split(",")[0].slice(0,80);
 const item=requests.get(ip);
 if(!item||item.end<now){requests.set(ip,{count:1,end:now+60000});return false;}
 item.count++;return item.count>8;
}
class ProviderFailure extends Error {
 constructor(stage,status,providerCode){
  super("AI upstream request failed");
  this.stage=stage;this.status=status;this.providerCode=providerCode;
 }
}
async function openai(path,data,key,timeoutMs){
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),timeoutMs);
 try {
  const res=await fetch("https://api.openai.com/v1/"+path,{
   method:"POST",headers:{"Authorization":"Bearer "+key,"Content-Type":"application/json"},
   body:JSON.stringify(data),signal:controller.signal
  });
  if(!res.ok){
   let raw;
   try {raw=await res.json();}catch(_){}
   const code=typeof raw?.error?.code==="string" ? raw.error.code : typeof raw?.error?.type==="string" ? raw.error.type : "unknown";
   throw new ProviderFailure(path,res.status,code.slice(0,80));
  }
  return await res.json();
 }finally{clearTimeout(timer);}
}
function responseText(result){
 if(typeof result?.output_text==="string" && result.output_text.trim())return result.output_text.trim().slice(0,2200);
 return (result?.output||[]).flatMap(x=>x?.content||[])
 .filter(x=>x?.type==="output_text"&&typeof x.text==="string")
 .map(x=>x.text).join("\n").trim().slice(0,2200);
}
function failureInfo(e){
 if(e?.name==="AbortError") return {code:"UPSTREAM_TIMEOUT",error:"The AI provider took too long to respond. Please try again."};
 if(e?.message==="EMPTY_AI_OUTPUT") return {code:"EMPTY_AI_OUTPUT",error:"The AI returned no usable reply. Please try again or ask the developer to inspect the model response."};
 if(e?.message==="MODERATION_INVALID") return {code:"MODERATION_UNAVAILABLE",error:"The safety check returned an invalid result. This request was not sent to the conversation model."};
 if(e instanceof ProviderFailure){
  const code=e.providerCode.toLowerCase(),status=e.status;
  if(status===401)return{code:"OPENAI_AUTH_FAILED",error:"The AI key was rejected by OpenAI. The project owner needs to check its API key."};
  if(status===403)return{code:"OPENAI_PERMISSION",error:"This OpenAI project or API key does not have access to the required model or endpoint."};
  if(status===429 && /insufficient_quota|billing|credit|quota|exceeded_budget|usage_limit/.test(code))
   return{code:"OPENAI_CREDITS",error:"The OpenAI API project has no available credits or has reached its usage limit. The owner needs to check API billing and limits."};
  if(status===429)return{code:"OPENAI_RATE_LIMIT",error:"The OpenAI API is rate limiting requests. Please wait a moment before trying again."};
  if(status===404)return{code:"OPENAI_MODEL_NOT_FOUND",error:"The AI model or API endpoint could not be found or is not available to this project."};
  if(status===400||status===422)return{code:"OPENAI_REQUEST_INVALID",error:"The OpenAI API rejected the request format. The developer needs to fix the integration."};
  if(status>=500)return{code:"OPENAI_UPSTREAM_ERROR",error:"The AI provider is temporarily unavailable. Please try again later."};
  return{code:"OPENAI_UPSTREAM_ERROR",error:"The OpenAI API could not complete this request."};
 }
 return{code:"AI_CONNECTION_FAILED",error:"The AI connection failed unexpectedly. Please try again later."};
}
export default async function handler(req,res){
 if(req.method!=="POST")return json(res,405,{error:"Method not allowed",code:"METHOD_NOT_ALLOWED"});
 if(String(req.headers["content-type"]||"").split(";")[0].trim()!=="application/json")return json(res,415,{error:"Send JSON",code:"INVALID_CONTENT_TYPE"});
 if(Number(req.headers["content-length"]||0)>11000)return json(res,413,{error:"Request too large",code:"REQUEST_TOO_LARGE"});
 if(throttle(req))return json(res,429,{error:"Too many demo requests. Please wait a minute before trying again.",code:"DEMO_RATE_LIMIT"});
 const history=parseMessages(req.body?.messages);
 if(!history||req.body?.consented!==true)return json(res,400,{error:"Consent and 1–7 valid messages are required.",code:"INVALID_CHAT_INPUT"});
 const last=history.at(-1).content;
 const direct=screenText(last);
 if(direct==="urgent")return json(res,200,{reply:CRISIS_TEXT,risk:"urgent",mode:"safety",contacted:false});
 const key=process.env.OPENAI_API_KEY;
 if(!key)return json(res,503,{error:"The live AI is not configured for this preview. The owner needs to set OPENAI_API_KEY in Vercel Preview.",code:"KEY_MISSING"});
 let stage="moderations";
 try{
  const checked=await openai("moderations",{model:"omni-moderation-latest",input:last},key,8000);
  const risk=moderationSignal(checked);
  if(risk==="unknown")throw new Error("MODERATION_INVALID");
  if(risk==="urgent")return json(res,200,{reply:CRISIS_TEXT,risk:"urgent",mode:"safety",contacted:false});
  const needsCare=direct==="concern"||risk==="concern";
  stage="responses";
  const completion=await openai("responses",{
   model:process.env.OPENAI_MODEL||"gpt-5.4-mini",
   instructions:SYSTEM_INSTRUCTIONS + (needsCare ? "\nThe user may need additional support. Speak empathetically, explore whether they are currently safe, and invite human support if relevant. Do not make assumptions or invent services." : "\nFor a casual greeting, greet naturally; for ordinary frustration, explore gently without suggesting a crisis. Don't give emergency instructions unless the content actually indicates danger."),
   input:history.map(({role,content})=>({role,content})),
   reasoning:{effort:"low"},
   max_output_tokens:850,
   store:false
  },key,19000);
  const reply=responseText(completion);
  if(!reply)throw new Error("EMPTY_AI_OUTPUT");
  return json(res,200,{reply,risk:needsCare?"concern":"none",mode:"live-ai",contacted:false});
 }catch(err){
  const failure=failureInfo(err);
  // Log only technical status and codes. Never log chat content or credentials.
  console.error("ZSM_AI_LAB_FAILURE",JSON.stringify({stage,status:err instanceof ProviderFailure?err.status:null,providerCode:err instanceof ProviderFailure?err.providerCode:null,publicCode:failure.code}));
  return json(res,503,{...failure,contacted:false});
 }
}

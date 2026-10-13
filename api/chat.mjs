import {CRISIS_TEXT, SUPPORT_TEXT, screenText, moderationSignal, parseMessages, SYSTEM_INSTRUCTIONS} from "../lib/safety.mjs";

export const config = {maxDuration: 30};
const requests = new Map();
function json(res, status, body) {
  res.setHeader("Content-Type","application/json; charset=utf-8");
  res.setHeader("Cache-Control","no-store, max-age=0");
  res.setHeader("X-Content-Type-Options","nosniff");
  return res.status(status).json(body);
}
function throttle(req) {
  const now = Date.now();
  if (requests.size > 3000) requests.clear(); // best-effort only; not distributed across instances
  const ip = String(req.headers["x-vercel-forwarded-for"] || req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].slice(0,80);
  const item = requests.get(ip);
  if (!item || item.end < now) {requests.set(ip,{count:1,end:now+60000});return false;}
  item.count++;
  return item.count > 8;
}
async function openai(path, data, key, timeoutMs) {
  const controller = new AbortController();
  const timer=setTimeout(()=>controller.abort(),timeoutMs);
  try {
    const response=await fetch("https://api.openai.com/v1/"+path,{
      method:"POST", headers:{"Authorization":"Bearer "+key,"Content-Type":"application/json"},
      body:JSON.stringify(data), signal:controller.signal
    });
    if (!response.ok) throw new Error("AI provider returned HTTP "+response.status);
    return await response.json();
  } finally {clearTimeout(timer);}
}
function responseText(value) {
  return (value?.output || []).flatMap(x=>x?.content || [])
    .filter(x=>x?.type==="output_text" && typeof x.text==="string")
    .map(x=>x.text).join("\n").trim().slice(0,2200);
}
export default async function handler(req,res) {
  if (req.method!=="POST") return json(res,405,{error:"Method not allowed"});
  if (String(req.headers["content-type"]||"").split(";")[0]!=="application/json") return json(res,415,{error:"Send JSON"});
  if (Number(req.headers["content-length"] || 0) > 11000) return json(res,413,{error:"Request too large"});
  if (throttle(req)) return json(res,429,{error:"Too many requests. Please wait a minute before trying again."});
  const history=parseMessages(req.body?.messages);
  if (!history || req.body?.consented !== true) return json(res,400,{error:"Consent and 1–7 valid messages are required."});
  const last=history.at(-1).content;
  const direct=screenText(last);
  if(direct==="urgent") return json(res,200,{reply:CRISIS_TEXT,risk:"urgent",mode:"safety",contacted:false});
  // Requires conscious opt-in. No OpenAI call or chat collection if unconfigured.
  const key=process.env.OPENAI_API_KEY;
  if (!key) return json(res,503,{error:"Live AI is not configured yet. Please ask the demo owner to set OPENAI_API_KEY for the Preview deployment.",code:"KEY_MISSING"});
  try {
    const check=await openai("moderations",{model:"omni-moderation-latest",input:last},key,7500);
    const signal=moderationSignal(check);
    if (signal==="unknown" || signal==="urgent") return json(res,200,{reply:CRISIS_TEXT,risk:"urgent",mode:"safety",contacted:false});
    const needsSupport=direct==="concern" || signal==="concern";
    const context=history.map(({role,content})=>({role,content}));
    const completion=await openai("responses",{
      model:process.env.OPENAI_MODEL || "gpt-5.4-mini",
      instructions:SYSTEM_INSTRUCTIONS + (needsSupport ? "\nIMPORTANT: There are signs of self-harm concern; express care, suggest real-world support and explicitly ask about immediate safety without giving methods." : ""),
      input:context, max_output_tokens:420, store:false
    },key,18000);
    const reply=responseText(completion);
    if (!reply) throw new Error("Empty AI response");
    return json(res,200,{reply,risk:needsSupport?"concern":"none",mode:"live-ai",contacted:false});
  } catch (_e) {
    // Fail closed: never claim safety triage succeeded if moderation or model is unavailable.
    return json(res,503,{error:"The AI service is unavailable. No safety assessment or doctor contact was completed. If this is urgent, contact emergency services or go to the nearest emergency department.",help:SUPPORT_TEXT,code:"AI_UNAVAILABLE"});
  }
}

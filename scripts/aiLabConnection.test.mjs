import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import handler from "../api/chat.mjs";
const ui=readFileSync(new URL("../public/ai-lab/lab.js",import.meta.url),"utf8");
function replyMock(){
 let body,code,headers={};
 const res={setHeader(k,v){headers[k]=v;return this;},status(v){code=v;return this;},json(v){body=v;return this;}};
 return{res,snapshot:()=>({code,body,headers})};
}
let id=0;
function reqFor(message){
 return{method:"POST",headers:{"content-type":"application/json","x-vercel-forwarded-for":"test-ip-"+(++id)},body:{consented:true,messages:[{role:"user",content:message}]}};
}
function withMockFetch(fetcher,work){
 const old=global.fetch,key=process.env.OPENAI_API_KEY;
 process.env.OPENAI_API_KEY="test-mocked-key";
 global.fetch=fetcher;
 return Promise.resolve().then(work).finally(()=>{global.fetch=old;if(key===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=key;});
}
function response(status,json){
 return{ok:status>=200&&status<300,status,json:async()=>json};
}
test("no credentials returns a transparent configuration error",async()=>{
 const key=process.env.OPENAI_API_KEY;delete process.env.OPENAI_API_KEY;
 try{
 const{res,snapshot}=replyMock();await handler(reqFor("hey"),res);
 assert.equal(snapshot().code,503);assert.equal(snapshot().body.code,"KEY_MISSING");
 assert.equal(snapshot().body.reply,undefined);
 }finally{if(key)process.env.OPENAI_API_KEY=key;}
});
test("a normal 'hey' produces the model's reply (not support fallback)",()=>withMockFetch(async url=>{
 if(url.endsWith("/moderations"))return response(200,{results:[{categories:{"self-harm":false}}]});
 return response(200,{output:[{content:[{type:"output_text",text:JSON.stringify({decision:"support",reply:"Hey! What's up?"})}]}]});
},async()=>{
 const{res,snapshot}=replyMock();await handler(reqFor("hey"),res);
 assert.equal(snapshot().code,200);assert.equal(snapshot().body.reply,"Hey! What's up?");
 assert.equal(snapshot().body.risk,"none");
}));
test("'i dont like people' does not trigger an emergency message",()=>withMockFetch(async (url,req)=>{
 if(url.endsWith("/moderations"))return response(200,{results:[{categories:{"self-harm":false}}]});
 const name=JSON.parse(req.body).text?.format?.name;
 if(name==="zsm_topic_scope")return response(200,{output:[{content:[{type:"output_text",text:JSON.stringify({decision:"support"})}]}]});
 return response(200,{output:[{content:[{type:"output_text",text:JSON.stringify({decision:"support",reply:"People can be exhausting sometimes. What happened?"})}]}]});
},async()=>{
 const{res,snapshot}=replyMock();await handler(reqFor("i dont like people"),res);
 assert.equal(snapshot().code,200);assert.equal(snapshot().body.risk,"none");
 assert.match(snapshot().body.reply,/People can be exhausting/);
}));
test("a missing moderator category fails closed without falsely labeling an emergency",()=>withMockFetch(async ()=>response(200,{results:[{}]}),async()=>{
 const{res,snapshot}=replyMock();await handler(reqFor("hey"),res);
 assert.equal(snapshot().code,503);assert.equal(snapshot().body.code,"MODERATION_UNAVAILABLE");
 assert.equal(snapshot().body.reply,undefined);
}));
test("API billing exhaustion returns OPENAI_CREDITS, never a fake supportive reply",()=>withMockFetch(async ()=>response(429,{error:{code:"insufficient_quota",message:"secret vendor message"}}),async()=>{
 const{res,snapshot}=replyMock();await handler(reqFor("hey"),res);
 assert.equal(snapshot().code,503);assert.equal(snapshot().body.code,"OPENAI_CREDITS");
 assert.equal(snapshot().body.reply,undefined);
 assert.doesNotMatch(JSON.stringify(snapshot().body),/secret vendor message/);
}));
test("bad key is distinguishable from missing API credits",()=>withMockFetch(async ()=>response(401,{error:{code:"invalid_api_key"}}),async()=>{
 const{res,snapshot}=replyMock();await handler(reqFor("hey"),res);
 assert.equal(snapshot().body.code,"OPENAI_AUTH_FAILED");
}));
test("bad model is distinguishable from rate limit",()=>withMockFetch(async url=>{
 if(url.endsWith("/moderations"))return response(200,{results:[{categories:{}}]});
 return response(404,{error:{code:"model_not_found"}});
},async()=>{
 const{res,snapshot}=replyMock();await handler(reqFor("hey"),res);
 assert.equal(snapshot().body.code,"OPENAI_MODEL_NOT_FOUND");
}));
test("invalid upstream request returns specific integration error",()=>withMockFetch(async url=>{
 if(url.endsWith("/moderations"))return response(200,{results:[{categories:{}}]});
 return response(400,{error:{code:"unsupported_parameter"}});
},async()=>{
 const{res,snapshot}=replyMock();await handler(reqFor("hey"),res);
 assert.equal(snapshot().body.code,"OPENAI_REQUEST_INVALID");
}));
test("empty model output cannot be shown as successful AI reply",()=>withMockFetch(async url=>{
 if(url.endsWith("/moderations"))return response(200,{results:[{categories:{}}]});
 return response(200,{status:"incomplete",output:[]});
},async()=>{
 const{res,snapshot}=replyMock();await handler(reqFor("hey"),res);
 assert.equal(snapshot().code,503);assert.equal(snapshot().body.code,"EMPTY_AI_OUTPUT");
}));
test("urgent phrases bypass OpenAI and do not imply a doctor was contacted",async()=>{
 const key=process.env.OPENAI_API_KEY;delete process.env.OPENAI_API_KEY;
 try{const{res,snapshot}=replyMock();await handler(reqFor("I want to kill myself"),res);
 assert.equal(snapshot().code,200);assert.equal(snapshot().body.risk,"urgent");assert.equal(snapshot().body.contacted,false);}
 finally{if(key)process.env.OPENAI_API_KEY=key;}
});
test("browser error UI does not pretend to respond for provider errors",()=>{
 assert.match(ui,/AI connection issue — not a reply/);
 assert.match(ui,/showConnectionIssue\(data.error/);
 assert.doesNotMatch(ui,/if\(data\.help\)/);
 assert.match(ui,/input.value=text/);
 assert.match(ui,/Diagnostic: /);
});

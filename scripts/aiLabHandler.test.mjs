import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/chat.mjs";
function createResponse() {
 let body,code,headers={};
 const res={setHeader(k,v){headers[k]=v;return this;},status(v){code=v;return this;},json(v){body=v;return this;}};
 return {res,snapshot:()=>({code,body,headers})};
}
function reqFor(text,ip="case-a") {
 return {method:"POST",headers:{"content-type":"application/json","x-vercel-forwarded-for":ip},body:{consented:true,messages:[{role:"user",content:text}]}};
}
test("urgent phrasing exits before credential or external AI calls",async()=>{
 const previous=process.env.OPENAI_API_KEY;delete process.env.OPENAI_API_KEY;
 const {res,snapshot}=createResponse();
 await handler(reqFor("I want to kill myself","urgent-unique"),res);
 const {code,body}=snapshot();
 assert.equal(code,200);assert.equal(body.risk,"urgent");assert.equal(body.contacted,false);
 if(previous)process.env.OPENAI_API_KEY=previous;
});
test("lack of key is surfaced as unavailable, not mocked intelligence",async()=>{
 const previous=process.env.OPENAI_API_KEY;delete process.env.OPENAI_API_KEY;
 const {res,snapshot}=createResponse();
 await handler(reqFor("I feel a little stressed","nokey-unique"),res);
 assert.equal(snapshot().code,503);assert.equal(snapshot().body.code,"KEY_MISSING");
 if(previous)process.env.OPENAI_API_KEY=previous;
});
test("consent is mandatory",async()=>{
 const {res,snapshot}=createResponse();
 const request=reqFor("Hello","consent-unique");request.body.consented=false;
 await handler(request,res);assert.equal(snapshot().code,400);
});
test("moderation failure returns an unavailable response rather than an invented clinical answer",async()=>{
 const key=process.env.OPENAI_API_KEY;process.env.OPENAI_API_KEY="mock";
 const original=global.fetch;
 global.fetch=async()=>({ok:false,status:502});
 try{
   const {res,snapshot}=createResponse();
   await handler(reqFor("A normal synthetic example","moderation-unique"),res);
   assert.equal(snapshot().code,503);assert.equal(snapshot().body.code,"OPENAI_UPSTREAM_ERROR");assert.equal(snapshot().body.reply,undefined);
 }finally{
   global.fetch=original;if(key)process.env.OPENAI_API_KEY=key;else delete process.env.OPENAI_API_KEY;
 }
});
test("successful mock model response is returned without claiming a doctor was contacted",async()=>{
 const key=process.env.OPENAI_API_KEY;process.env.OPENAI_API_KEY="mock";
 const original=global.fetch;const called=[];
 global.fetch=async (url,req)=>{
  called.push({url,body:JSON.parse(req.body)});
  if(url.endsWith("/moderations"))return {ok:true,json:async()=>({results:[{categories:{"self-harm":false,"self-harm/intent":false,"self-harm/instructions":false,"violence":false}}]})};
  return {ok:true,json:async()=>({output:[{content:[{type:"output_text",text:"That sounds difficult. What feels most important right now?"}]}]})};
 };
 try{
   const {res,snapshot}=createResponse();
   await handler(reqFor("A synthetic story about exam stress","ai-unique"),res);
   assert.equal(snapshot().code,200);assert.equal(snapshot().body.mode,"live-ai");assert.equal(snapshot().body.contacted,false);
   assert.equal(called[1].body.store,false);
   assert.equal(called[1].body.model,"gpt-5.4-mini");
 }finally{global.fetch=original;if(key)process.env.OPENAI_API_KEY=key;else delete process.env.OPENAI_API_KEY;}
});

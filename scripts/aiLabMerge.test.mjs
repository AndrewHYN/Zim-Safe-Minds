import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import handler from "../api/chat.mjs";
const app=readFileSync(new URL("../src/App.tsx",import.meta.url),"utf8");
const page=readFileSync(new URL("../public/ai-lab/index.html",import.meta.url),"utf8");
const lab=readFileSync(new URL("../public/ai-lab/lab.js",import.meta.url),"utf8");
test("unfinished AI lab is reachable from Talk without replacing the scripted demo",()=>{
 assert.match(app,/className="trio-ai-bridge"/);
 assert.match(app,/ai-lab\/index\.html\?lang=/);
 assert.match(app,/id="trio-entry"/);
 assert.match(app,/className="trio-glass-card"/);
 assert.match(page,/id="consentCheck"/);
 assert.match(page,/id="ai-lab-language"/);
 assert.match(lab,/consented:true,language:languageSelect.value/);
});
test("live AI remains off on production unless deliberately approved",async()=>{
 const prev=process.env.VERCEL_ENV,flag=process.env.AI_LAB_ENABLED,key=process.env.OPENAI_API_KEY;
 process.env.VERCEL_ENV="production";delete process.env.AI_LAB_ENABLED;process.env.OPENAI_API_KEY="test-should-not-be-used";
 const old=global.fetch;global.fetch=async()=>{throw Error("Must not call external AI");};
 let status,body;const res={setHeader(){return this;},status(code){status=code;return this;},json(data){body=data;return this;}};
 try{
  await handler({method:"POST",headers:{"content-type":"application/json","x-vercel-forwarded-for":"merged-preview-production-guard"},body:{consented:true,messages:[{role:"user",content:"Hello"}]}},res);
  assert.equal(status,503);
  assert.equal(body.code,"AI_LAB_PREVIEW_ONLY");
  assert.equal(body.reply,undefined);
 }finally{
  global.fetch=old;
  if(prev===undefined)delete process.env.VERCEL_ENV;else process.env.VERCEL_ENV=prev;
  if(flag===undefined)delete process.env.AI_LAB_ENABLED;else process.env.AI_LAB_ENABLED=flag;
  if(key===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=key;
 }
});

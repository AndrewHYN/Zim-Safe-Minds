import test from "node:test";
import assert from "node:assert/strict";
import { guideReply, hasExplicitDangerPhrase } from "../src/lib/demoGuide.mjs";
test("explicit self-harm expressions return urgent guidance",()=>{
 for(const x of ["I want to die","I might kill myself","I am suicidal","thinking about self-harm"]){
  assert.equal(hasExplicitDangerPhrase(x),true);assert.equal(guideReply(x).kind,"urgent");
 }
});
test("stress receives scripted empathy",()=>assert.equal(guideReply("school stress").kind,"support"));
test("professional requests do not claim live bookings",()=>{const r=guideReply("I need a therapist");assert.equal(r.kind,"referral");assert.match(r.text,/aren't live/);});
test("empty input does not add dialogue",()=>assert.equal(guideReply("  ").kind,"empty"));

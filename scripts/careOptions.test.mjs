import test from "node:test";
import assert from "node:assert/strict";
import { careCopy, careSummary } from "../src/lib/careOptions.mjs";
test("care preference summary includes choices, not clinical conversation",()=>{
 const summary=careSummary({mode:"online",budget:"free",language:"Shona"});
 assert.match(summary,/Online \/ phone/);assert.match(summary,/Free support/);assert.match(summary,/Shona/);
 assert.match(summary,/No clinical information/);
});
test("invalid preferences fall back to safe display labels",()=>{
 const result=careCopy({mode:"hacked",budget:"bad",language:"unknown"});
 assert.deepEqual(result.map(x=>x.value),["Either","Any","English"]);
});

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

test("first-contact note includes only safe allowlisted preferences",async()=>{
 const { firstContactNote } = await import("../src/lib/careOptions.mjs");
 const text=firstContactNote({mode:"online",budget:"free",language:"Shona",diagnosis:"CONFIDENTIAL TEST",chat:"NEVER LEAK THIS"});
 assert.match(text,/Shona/);
 assert.match(text,/online \/ phone/);
 assert.doesNotMatch(text,/CONFIDENTIAL TEST|NEVER LEAK THIS/);
});
test("first-contact note does not echo unexpected input",async()=>{
 const { firstContactNote } = await import("../src/lib/careOptions.mjs");
 const text=firstContactNote({mode:"<script>steal</script>",budget:"leak",language:"medical details"});
 assert.doesNotMatch(text,/script|medical details|leak/);
 assert.match(text,/either/i);
});

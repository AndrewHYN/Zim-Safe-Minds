import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const app=readFileSync(new URL("../src/App.tsx",import.meta.url),"utf8");
const css=readFileSync(new URL("../src/styles.css",import.meta.url),"utf8");
test("the hero contains the only active chat, not a decorative mockup",()=>{
 assert.match(app,/className="trio-chat-panel trio-hero-chat"/);
 assert.doesNotMatch(app,/trio-glass-card/);
 assert.equal((app.match(/id="trio-entry"/g)||[]).length,1);
 assert.equal((app.match(/className="trio-chat-panel/g)||[]).length,1);
 const hero=app.indexOf('className="trio-hero"');
 const band=app.indexOf('className="trio-band"');
 const chat=app.indexOf('className="trio-chat-panel trio-hero-chat"');
 assert.ok(hero<chat&&chat<band);
});
test("chat entry and starters require consent before sending",()=>{
 assert.ok(app.includes("readOnly={!accepted}"));
 assert.ok(app.includes("function selectSuggestion(value:string)"));
 assert.ok(app.includes("setPendingPrompt(value);setConsent(true)"));
 assert.ok(app.includes("onClick={beginAfterConsent}"));
 assert.match(app,/Not live AI or therapy/);
});
test("bright chat overrides the dark Afterglow background",()=>{
 assert.ok(css.includes(".trio-app .trio-hero-chat{"));
 assert.match(css,/--chat-panel:#f3fbf9/);
 assert.match(css,/border:2px solid #60cbbd/);
 assert.ok(css.includes(".trio-app .trio-hero-chat .trio-chat-composer input{"));
});

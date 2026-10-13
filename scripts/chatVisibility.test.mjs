import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const app=readFileSync(new URL("../src/App.tsx",import.meta.url),"utf8");
const css=readFileSync(new URL("../src/styles.css",import.meta.url),"utf8");
test("the original beautiful hero graphic is restored and real chat comes directly beneath it",()=>{
 assert.match(app,/className="trio-chat-panel trio-hero-chat"/);
 assert.equal((app.match(/className="trio-glass-card"/g)||[]).length,1);
 assert.equal((app.match(/id="trio-entry"/g)||[]).length,1);
 assert.equal((app.match(/className="trio-chat-panel/g)||[]).length,1);
 const art=app.indexOf('className="trio-glass-card"');
 const section=app.indexOf('className="trio-real-chat-zone"');
 const chat=app.indexOf('className="trio-chat-panel trio-hero-chat"');
 const band=app.indexOf('className="trio-band"');
 assert.ok(art<section&&section<chat&&chat<band);
 assert.match(app,/scrollIntoView/);
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

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const app=readFileSync(new URL("../src/App.tsx",import.meta.url),"utf8");
const html=readFileSync(new URL("../index.html",import.meta.url),"utf8");
const css=readFileSync(new URL("../src/styles.css",import.meta.url),"utf8");
const pub=(name)=>readFileSync(new URL("../public/"+name,import.meta.url));
test("real generated brand mark and wordmark exist as optimized WebP files",()=>{
 for(const path of ["brand/zim-safe-minds-mark.webp","brand/zim-safe-minds-wordmark.webp"]){
  const bytes=pub(path);
  assert.equal(bytes.toString("ascii",0,4),"RIFF");
  assert.equal(bytes.toString("ascii",8,12),"WEBP");
  assert.ok(bytes.byteLength>5000);
 }
});
test("new favicon and Apple icon are valid PNG images",()=>{
 for(const name of ["favicon-32.png","apple-touch-icon.png"]){
  const bytes=pub(name);
  assert.equal(bytes.subarray(0,8).toString("hex"),"89504e470d0a1a0a");
 }
});
test("wordmark and icon are used in the UI using Vite base-safe paths",()=>{
 assert.match(app,/import\.meta\.env\.BASE_URL/);
 assert.match(app,/brand\/zim-safe-minds-mark\.webp/);
 assert.match(app,/brand\/zim-safe-minds-wordmark\.webp/);
 assert.match(app,/brand-wordmark-glass/);
 assert.match(html,/%BASE_URL%favicon-32\.png/);
 assert.match(html,/%BASE_URL%apple-touch-icon\.png/);
});
test("Afterglow branding motion respects reduced-motion preference",()=>{
 assert.match(css,/prefers-reduced-motion:no-preference/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(css,/zsm-afterglow-breathe/);
});

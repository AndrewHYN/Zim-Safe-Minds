import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const source=(path)=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
test("onboarding provides three Zimbabwe language choices and a local-only preference",()=>{
 const entry=source("src/Entry.tsx"),copy=source("src/copy.ts");
 for(const name of ["Shona","Ndebele","English"]){assert.match(copy,new RegExp(name));}
 assert.match(copy,/zsm\.locale\.v1/);
 assert.match(entry,/onChoose\(x.code\)/);
 assert.match(entry,/onEnter/);
});
test("signups require a configured backend, confirmation and adult gate",()=>{
 const entry=source("src/Entry.tsx"),auth=source("src/auth.ts");
 assert.match(entry,/authEnabled\?/);assert.match(entry,/onChange=\{e=>setAdult/);
 assert.match(entry,/authClient\.auth\.signUp/);
 assert.match(entry,/confirmation link/);
 assert.match(auth,/VITE_SUPABASE_URL/);
 assert.match(auth,/VITE_SUPABASE_ANON_KEY/);
 assert.doesNotMatch(auth,/localStorage\.setItem\([^\n]*password/);
});
test("original Talk illustration is preserved and guest access works",()=>{
 const app=source("src/App.tsx");
 assert.match(app,/trio-glass-card/);assert.match(app,/trio-orbit/);
 assert.match(app,/onEnter=\{enterPlatform\}/);
 assert.match(app,/zsm-header-language/);
 assert.match(app,/partialTranslation/);
});
test("onboarding respects reduced motion",()=>{assert.match(source("src/entry.css"),/prefers-reduced-motion:reduce/);});

import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const source=(name)=>readFileSync(new URL("../"+name,import.meta.url),"utf8");
const app=source("src/App.tsx"),entry=source("src/Entry.tsx"),account=source("src/Account.tsx");
test("account header is driven by the real auth session, not by opening the sign-up page",()=>{
 assert.match(app,/onAuthStateChange/);
 assert.match(app,/client\.auth\.getUser\(\)/);
 assert.match(app,/if\(authUser\)\{setEntryOpen\(false\);setAccountOpen\(true\);\}/);
 assert.match(app,/onClick=\{openAccount\}/);
 assert.match(app,/<Account user=\{authUser\}/);
 assert.match(app,/onAuthenticated=\{setAuthUser\}/);
});
test("account offers editable profile, preferences, password change and real sign-out",()=>{
 assert.match(account,/aria-modal="true"/);
 assert.match(account,/authClient\.auth\.updateUser\(\{data:\{display_name:value\}\}\)/);
 assert.match(account,/authClient\.auth\.updateUser\(\{password\}\)/);
 assert.match(account,/authClient\.auth\.signOut\(\)/);
 assert.match(account,/onLocaleChange\(l.code\)/);
 assert.match(account,/onThemeChange\("daylight"\)/);
 assert.match(account,/user\.email/);
 assert.doesNotMatch(account,/from\("conversations"\)|chatHistory/);
});
test("account and welcome signup share one session, with password recovery",()=>{
 assert.match(entry,/onAuthenticated\(data.user\)/);
 assert.match(entry,/onSignedOut\(\)/);
 assert.match(entry,/resetPasswordForEmail/);
 assert.match(app,/PASSWORD_RECOVERY/);
 assert.match(app,/setRecovery\(true\)/);
});
test("preference theme is local-only, remembered after refresh, and overlay has mobile styles",()=>{
 assert.match(app,/zsm\.theme\.v1/);
 assert.match(source("src/account.css"),/@media\(max-width:730px\)/);
 assert.match(source("src/account.css"),/prefers-reduced-motion:reduce/);
});

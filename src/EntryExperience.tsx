import { useState } from "react";
import type { FormEvent } from "react";
import { auth, authConfigured } from "./authClient";
import { languages, tr, type Language } from "./i18n";

type Props={
 language:Language|null;
 onSelectLanguage:(lang:Language|null)=>void;
 onGuest:()=>void;
 onAuthenticated:()=>void;
};
export default function EntryExperience({language,onSelectLanguage,onGuest,onAuthenticated}:Props){
 const [mode,setMode]=useState<"login"|"signup">("signup");
 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [adult,setAdult]=useState(false);
 const [visible,setVisible]=useState(false);
 const [working,setWorking]=useState(false);
 const [notice,setNotice]=useState("");
 const [error,setError]=useState("");
 const active=language??"en";
 const t=(text:string)=>tr(active,text);
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();setError("");setNotice("");
  if(!auth){setError(t("Accounts aren't active yet. You can explore without signing in."));return;}
  if(mode==="signup"&&!adult){setError(t("Please confirm you are 18 or older."));return;}
  if(mode==="signup"&&name.trim().length<2){setError("Please enter a display name of at least 2 characters.");return;}
  if(password.length<8){setError(t("At least 8 characters"));return;}
  setWorking(true);
  try{
   if(mode==="signup"){
    const result=await auth.auth.signUp({email:email.trim().toLowerCase(),password,options:{
     data:{display_name:name.trim().slice(0,70)},emailRedirectTo:location.origin+import.meta.env.BASE_URL
    }});
    if(result.error)throw result.error;
    if(result.data.session){setPassword("");onAuthenticated();return;}
    setPassword("");setNotice(t("Check your email to confirm your account."));
   }else{
    const result=await auth.auth.signInWithPassword({email:email.trim().toLowerCase(),password});
    if(result.error)throw result.error;
    setPassword("");onAuthenticated();
   }
  }catch(e){setError(e instanceof Error?e.message:"Something went wrong. Please try again.");}
  finally{setWorking(false);}
 }
 async function resetPassword(){
  setError("");setNotice("");
  if(!email.trim()){setError(t("Please enter your email address."));return;}
  if(!auth){setError(t("Accounts aren't active yet. You can explore without signing in."));return;}
  setWorking(true);
  try{
   const r=await auth.auth.resetPasswordForEmail(email.trim(),{redirectTo:location.origin+import.meta.env.BASE_URL});
   if(r.error)throw r.error;
   setNotice(t("Email sent. Follow the password reset link."));
  }catch(e){setError(e instanceof Error?e.message:"Could not send reset email.");}
  finally{setWorking(false);}
 }
 return <main className="zsm-entry">
  <div className="zsm-entry-halo zsm-entry-halo-one" aria-hidden="true"/>
  <div className="zsm-entry-halo zsm-entry-halo-two" aria-hidden="true"/>
  <div className="zsm-entry-wrap">
   <header className="zsm-entry-top">
    <div className="zsm-entry-brand"><img src={import.meta.env.BASE_URL+"brand/zim-safe-minds-mark.webp"} alt="" width="46" height="46"/><span>Zim<span>Safe</span>Minds<span className="zsm-entry-dot">.</span></span></div>
    <div className="zsm-entry-top-right"><span className="zsm-entry-live"><i/> ZIMBABWE · WELLBEING PROTOTYPE</span>{language&&<button type="button" className="zsm-entry-switch" onClick={()=>{setNotice("");setError("");onSelectLanguage(null);}}>{t("Change language")} ↗</button>}</div>
   </header>
   {!language?<section className="zsm-entry-language" aria-labelledby="zsm-lang-title">
     <span className="zsm-entry-eyebrow"><i/> A PLACE TO BEGIN · NZVIMBO YEKUTANGA · INDAWO YOKUQALA</span>
     <div className="zsm-entry-language-grid"><div className="zsm-entry-heading">
       <p className="zsm-entry-overline">01 — WELCOME / SIYAKWAMUKELA / TINOKUGAMUCHIRA</p>
       <h1 id="zsm-lang-title">A space where <em>every voice</em> belongs.</h1>
       <p>Choose your language. Sarudza mutauro wako. Khetha ulimi lwakho.</p>
       <span className="zsm-entry-scribble">Take your time — there is no wrong choice.</span>
      </div>
      <div className="zsm-language-panel"><span className="zsm-entry-eyebrow">SELECT YOUR LANGUAGE</span><h2>How would you like to feel at home?</h2>
       <div className="zsm-language-options">{languages.map((l,i)=><button className="zsm-language-option" key={l.id} onClick={()=>{onSelectLanguage(l.id);setNotice("");setError("");}} lang={l.id==="sn"?"sn":l.id==="nd"?"nd":"en"}><span className="zsm-language-count">0{i+1}</span><span><strong>{l.local}</strong><small>{l.welcome}</small></span><span className="zsm-language-arrow" aria-hidden="true">↗</span></button>)}</div>
       <p className="zsm-entry-hint">You can switch languages anytime. Nothing personal is collected on this screen.</p>
      </div>
     </div>
    </section>:<section className="zsm-auth-grid" aria-label="Welcome and account access">
     <div className="zsm-entry-story">
      <span className="zsm-entry-eyebrow"><i/> {t("A calmer beginning.")}</span>
      <h1>{t("You belong here.")}<br/><em>One gentle step at a time.</em></h1>
      <p>{t("A safe space to talk. A path to real support.")}</p>
      <div className="zsm-entry-glass" aria-hidden="true">
       <div className="zsm-glass-head"><span className="zsm-glass-avatar">✳</span><span>Your space<small>Reflect · Learn · Connect</small></span><b>● PREVIEW</b></div>
       <div className="zsm-glass-bubble">You don't have to figure everything out today.</div>
       <div className="zsm-glass-bubble reply">One step at a time. ♡</div>
       <div className="zsm-glass-foot"><span>✦</span> NO PRESSURE · YOUR PACE</div>
      </div>
      <div className="zsm-story-note"><span>✳</span><p>A clearly labeled wellbeing prototype. Not live AI, therapy or emergency response.</p></div>
     </div>
     <div className="zsm-auth-panel">
      <div className="zsm-auth-inner">
       <span className="zsm-entry-eyebrow">02 — {mode==="signup"?"JOIN THE SPACE":"WELCOME BACK"}</span>
       <h2>{t(mode==="signup"?"Your space starts here.":"Welcome back.")}</h2>
       <p className="zsm-auth-subtitle">{t(mode==="signup"?"Create a quiet corner of your own.":"Sign in to your space.")}</p>
       <div className="zsm-auth-tabs" role="tablist" aria-label="Account action">
        <button type="button" role="tab" aria-selected={mode==="signup"} onClick={()=>{setMode("signup");setError("");setNotice("");}}>{t("Create account")}</button>
        <button type="button" role="tab" aria-selected={mode==="login"} onClick={()=>{setMode("login");setError("");setNotice("");}}>{t("Sign in")}</button>
       </div>
       <form onSubmit={submit} className="zsm-auth-form">
        {mode==="signup"&&<label><span>{t("Display name")}</span><input autoComplete="nickname" maxLength={70} minLength={2} required placeholder="e.g. Tadiwa" value={name} onChange={e=>setName(e.target.value)}/></label>}
        <label><span>{t("Email address")}</span><input type="email" autoComplete="email" inputMode="email" required placeholder="you@example.com" maxLength={254} value={email} onChange={e=>setEmail(e.target.value)}/></label>
        <label><span>{t("Password")}</span><div className="zsm-auth-password"><input type={visible?"text":"password"} autoComplete={mode==="signup"?"new-password":"current-password"} minLength={8} maxLength={128} required placeholder={t("At least 8 characters")} value={password} onChange={e=>setPassword(e.target.value)}/><button type="button" onClick={()=>setVisible(v=>!v)} aria-label={t(visible?"Hide":"Show")+" password"}>{t(visible?"Hide":"Show")}</button></div></label>
        {mode==="signup"?<label className="zsm-age-check"><input type="checkbox" checked={adult} onChange={e=>setAdult(e.target.checked)} required/><span>{t("I am 18 or older.")}</span></label>:<button className="zsm-forgot" type="button" onClick={resetPassword} disabled={working}>{t("Forgot password?")}</button>}
        {error&&<p className="zsm-auth-alert" role="alert">{error}</p>}
        {notice&&<p className="zsm-auth-notice" role="status">{notice}</p>}
        {!authConfigured&&<p className="zsm-auth-setup" role="status">{t("Accounts aren't active yet. You can explore without signing in.")}</p>}
        <button className="zsm-auth-submit" disabled={working||!authConfigured} type="submit">{working?"Please wait…":t(mode==="signup"?"Create account":"Sign in")} <span aria-hidden="true">↗</span></button>
        <p className="zsm-auth-privacy">♡ {t("Account details only. We do not save your chat messages to your profile.")}</p>
       </form>
       <div className="zsm-auth-divider"><span>OR / KANA / NOMA</span></div>
       <button className="zsm-guest-button" type="button" onClick={onGuest}>{t("Continue as a guest")} <span aria-hidden="true">→</span></button>
       <p className="zsm-guest-note">{t("No account needed to explore.")}</p>
      </div>
     </div>
    </section>}
   <footer className="zsm-entry-bottom"><span>© 2026 Zim Safe Minds</span><span>Mindful by design · Built in Zimbabwe</span><span>18+ prototype · Not a clinical service</span></footer>
  </div>
 </main>;
}

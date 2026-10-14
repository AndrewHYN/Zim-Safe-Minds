import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { authClient, authEnabled } from "./auth";
import { languages, type Locale } from "./copy";

type Mode="register"|"login";
type Props={locale:Locale;onChoose:(locale:Locale)=>void;onEnter:()=>void;onUrgent:()=>void};
const words={
 sn:{eyebrow:"WAKAGAMUCHIRWA",headline:"Tanga zvishoma.",italic:"Uri munzvimbo yako.",description:"Sarudza mutauro waunoda. Unogona kuongorora pasina akaundi.",language:"Sarudza mutauro wako",continue:"Pinda muZim Safe Minds",existing:"Une akaundi?",create:"Gadzira akaundi",login:"Pinda",guest:"Enderera pasina akaundi",note:"Akaunzi haidiwi kuti uone ruzivo nerubatsiro.",privacy:"Usanyora mashoko ehutano muchimiro cheakaundi.",urgent:"Rubatsiro rwechimbichimbi"},
 nd:{eyebrow:"SIYAKWAMUKELA",headline:"Qala kancane.",italic:"Indawo le ngeyakho.",description:"Khetha ulimi olufunayo. Ungahlola ungela-akhawunti.",language:"Khetha ulimi lwakho",continue:"Ngena kuZim Safe Minds",existing:"Ule-akhawunti?",create:"Vula i-akhawunti",login:"Ngena",guest:"Qhubeka ungela-akhawunti",note:"I-akhawunti ayidingeki ukuze uthole ulwazi losizo.",privacy:"Ungabhali imininingwane yempilakahle kufomu ye-akhawunti.",urgent:"Usizo oluphuthumayo"},
 en:{eyebrow:"YOU BELONG HERE",headline:"Come as you are.",italic:"Take your time.",description:"Choose the language that feels most comfortable. You can explore without an account.",language:"Choose your language",continue:"Enter Zim Safe Minds",existing:"Already have an account?",create:"Create account",login:"Sign in",guest:"Explore without an account",note:"An account is always optional. Explore support freely.",privacy:"Never put sensitive health information in your account details.",urgent:"Get urgent guidance"}
} as const;
export default function Entry({locale,onChoose,onEnter,onUrgent}:Props){
 const [mode,setMode]=useState<Mode>("register");
 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [adult,setAdult]=useState(false);
 const [busy,setBusy]=useState(false);
 const [notice,setNotice]=useState("");
 const [signedIn,setSignedIn]=useState("");
 const w=words[locale];
 useEffect(()=>{
  if(!authClient)return;
  let active=true;
  authClient.auth.getUser().then(({data})=>{if(active)setSignedIn(data.user?.email??"");}).catch(()=>{});
  return()=>{active=false;};
 },[]);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(!authClient||busy)return;
  setNotice("");
  const userEmail=email.trim().toLowerCase();
  if(mode==="register"&&!adult){setNotice("Please confirm you are at least 18.");return;}
  if(mode==="register"&&name.trim().length<2){setNotice("Enter a name of at least two characters.");return;}
  if(password.length<8){setNotice("Your password must contain at least eight characters.");return;}
  setBusy(true);
  try{
   if(mode==="register"){
    const {data,error}=await authClient.auth.signUp({email:userEmail,password,options:{data:{display_name:name.trim()},emailRedirectTo:window.location.origin+import.meta.env.BASE_URL}});
    if(error)throw error;
    if(data.session){setSignedIn(data.user?.email??userEmail);setPassword("");onEnter();}
    else{setPassword("");setNotice("Please check your email for a confirmation link. Account access starts only after verification.");}
   }else{
    const {data,error}=await authClient.auth.signInWithPassword({email:userEmail,password});
    if(error)throw error;
    setSignedIn(data.user.email??userEmail);setPassword("");onEnter();
   }
  }catch(error){setNotice(error instanceof Error?error.message:"Unable to complete authentication. Please try again.");}
  finally{setBusy(false);}
 }
 async function signOut(){
  if(!authClient)return;
  setBusy(true);
  const {error}=await authClient.auth.signOut();
  setBusy(false);
  if(error){setNotice(error.message);}else{setSignedIn("");setNotice("You've signed out.");}
 }
 return <div className="zsm-entry" aria-label="Zim Safe Minds welcome and account access">
  <div className="zsm-entry-spark spark-one"/><div className="zsm-entry-spark spark-two"/>
  <header className="zsm-entry-head">
   <div className="zsm-entry-brand"><span className="zsm-entry-logo"><img src={import.meta.env.BASE_URL+"brand/zim-safe-minds-mark.webp"} alt="" width="48" height="48"/></span><span>Zim<span>Safe</span>Minds<em>.</em></span></div>
   <button type="button" className="zsm-entry-urgent" onClick={onUrgent}>{w.urgent} <span aria-hidden="true">↗</span></button>
  </header>
  <div className="zsm-entry-stage">
   <section className="zsm-entry-story" aria-labelledby="zsm-entry-title">
    <div className="zsm-entry-tag"><span className="zsm-entry-beacon"/> {w.eyebrow} <span className="zsm-entry-tagline"> · MADE WITH CARE IN ZIMBABWE</span></div>
    <h1 id="zsm-entry-title">{w.headline}<br/><em>{w.italic}</em></h1>
    <p className="zsm-entry-intro">{w.description}</p>
    <div className="zsm-entry-language-box">
     <div className="zsm-entry-language-title"><span>01 / {w.language}</span><span>↙</span></div>
     <div className="zsm-entry-language-list" role="group" aria-label={w.language}>
      {languages.map(x=><button key={x.code} type="button" className={"zsm-entry-language "+(locale===x.code?"is-active":"")} aria-pressed={locale===x.code} onClick={()=>onChoose(x.code)}>
       <span className="zsm-entry-language-code">{x.code.toUpperCase()}</span><span><strong>{x.native}</strong><small>{x.greeting}</small></span><span className="zsm-entry-check">{locale===x.code?"✓":"↗"}</span>
      </button>)}
     </div>
    </div>
    <button type="button" className="zsm-entry-primary" onClick={onEnter}>{w.continue}<span aria-hidden="true">↗</span></button>
    <p className="zsm-entry-under">{w.note}</p>
    <div className="zsm-entry-circles" aria-hidden="true"><span/><span/><span/><span/><span/><span/></div>
   </section>
   <aside className="zsm-entry-access" aria-label="Optional account access">
    <div className="zsm-access-bloom" aria-hidden="true"><div><span>✳</span></div></div>
    <div className="zsm-access-inner">
     <span className="zsm-access-kicker">02 / A SPACE OF YOUR OWN</span>
     <h2>Feel at home.<br/><em>Stay in control.</em></h2>
     <p className="zsm-access-description">Accounts are optional. We only ask for basic account details—never how you're feeling.</p>
     {signedIn?<div className="zsm-access-signed"><span className="zsm-auth-tick">✓</span><strong>You're signed in</strong><span>{signedIn}</span><button type="button" onClick={onEnter}>Return to your space ↗</button><button type="button" className="zsm-auth-signout" onClick={signOut} disabled={busy}>Sign out</button></div>:<>
      <div className="zsm-access-tabs" role="group" aria-label="Account mode">
       <button type="button" onClick={()=>{setMode("register");setNotice("");}} className={mode==="register"?"active":""} aria-pressed={mode==="register"}>{w.create}</button>
       <button type="button" onClick={()=>{setMode("login");setNotice("");}} className={mode==="login"?"active":""} aria-pressed={mode==="login"}>{w.login}</button>
      </div>
      {authEnabled?<form className="zsm-access-form" onSubmit={submit}>
       {mode==="register"&&<label>What should we call you?<input autoComplete="nickname" required minLength={2} maxLength={60} value={name} onChange={e=>setName(e.target.value)} placeholder="Your first name"/></label>}
       <label>Email address<input autoComplete="email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label>
       <label>Password<input autoComplete={mode==="register"?"new-password":"current-password"} type="password" required minLength={8} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 8 characters"/></label>
       {mode==="register"&&<label className="zsm-adult-checkbox"><input type="checkbox" checked={adult} onChange={e=>setAdult(e.target.checked)}/> <span>I confirm I'm 18 or older and understand this is not a clinical service.</span></label>}
       <button className="zsm-access-submit" disabled={busy||mode==="register"&&!adult} type="submit">{busy?"Please wait…":mode==="register"?"Create my account ↗":"Sign in ↗"}</button>
      </form>:<div className="zsm-auth-pending" role="status"><span>✳</span><strong>Account registration is being prepared.</strong><p>Secure sign-in requires the project's own authentication service. No account details or passwords are being collected yet.</p></div>}
      {notice&&<p className="zsm-access-notice" role="status">{notice}</p>}
      <button className="zsm-access-guest" type="button" onClick={onEnter}>{w.guest} <span aria-hidden="true">↗</span></button>
     </>}
     <p className="zsm-access-privacy"><span aria-hidden="true">◇</span> {w.privacy}</p>
     <p className="zsm-access-footnote">Zim Safe Minds is a youth-wellbeing prototype, not an emergency or therapy service.</p>
    </div>
   </aside>
  </div>
  <footer className="zsm-entry-bottom"><span>© 2026 Zim Safe Minds</span><span>Talk · Learn · Connect <span aria-hidden="true">✳</span> Your pace, your choice.</span></footer>
 </div>;
}

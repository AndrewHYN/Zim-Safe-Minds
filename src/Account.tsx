import {useEffect,useRef,useState} from "react";
import type {FormEvent} from "react";
import type {User} from "@supabase/supabase-js";
import {authClient} from "./auth";
import {languages,type Locale} from "./copy";
import "./account.css";
type Theme="afterglow"|"daylight";
type Pane="profile"|"preferences"|"security";
type Props={user:User;locale:Locale;theme:Theme;recovery:boolean;onRecoveryComplete:()=>void;onLocaleChange:(l:Locale)=>void;onThemeChange:(t:Theme)=>void;onClose:()=>void;onSignOut:()=>void};
const getName=(user:User):string=>typeof user.user_metadata?.display_name==="string"?user.user_metadata.display_name:"";
export default function Account({user,locale,theme,recovery,onRecoveryComplete,onLocaleChange,onThemeChange,onClose,onSignOut}:Props){
 const [pane,setPane]=useState<Pane>(recovery?"security":"profile");
 const [name,setName]=useState(getName(user));
 const [password,setPassword]=useState("");
 const [confirm,setConfirm]=useState("");
 const [busy,setBusy]=useState(false);
 const [notice,setNotice]=useState("");
 const titleRef=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{titleRef.current?.focus();const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape"&&!recovery)onClose();};document.addEventListener("keydown",onKey);return()=>document.removeEventListener("keydown",onKey);},[recovery,onClose]);
 useEffect(()=>{setName(getName(user));},[user.id,user.user_metadata?.display_name]);
 useEffect(()=>{if(recovery)setPane("security");},[recovery]);
 const display=getName(user).trim()||"Your space";
 function show(msg:string){setNotice(msg);}
 async function save(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(!authClient||busy)return;const value=name.trim();
  if(value.length<2||value.length>60){show("Use a name between 2 and 60 characters.");return;}
  setBusy(true);show("");
  try{
   const {error}=await authClient.auth.updateUser({data:{display_name:value}});
   show(error?.message||"Profile updated successfully.");
  }catch(e){show(e instanceof Error?e.message:"Unable to save your profile.");}
  finally{setBusy(false);}
 }
 async function updatePassword(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(!authClient||busy)return;
  if(password.length<8){show("Choose at least 8 characters.");return;}
  if(password!==confirm){show("Passwords do not match.");return;}
  setBusy(true);show("");
  try{
   const {error}=await authClient.auth.updateUser({password});
   if(error){show(error.message);return;}
   setPassword("");setConfirm("");show("Your password has been updated.");
   if(recovery)onRecoveryComplete();
  }catch(e){show(e instanceof Error?e.message:"Unable to update your password.");}
  finally{setBusy(false);}
 }
 async function logout(){
  if(!authClient||busy)return;setBusy(true);show("");
  try{
   const {error}=await authClient.auth.signOut();
   if(error)show(error.message);else onSignOut();
  }catch(e){show(e instanceof Error?e.message:"Sign-out failed. Please try again.");}
  finally{setBusy(false);}
 }
 const joined=Number.isNaN(Date.parse(user.created_at))?"Unknown":new Intl.DateTimeFormat("en-ZW",{month:"long",year:"numeric"}).format(new Date(user.created_at));
 return <div className="zsm-profile-overlay" onMouseDown={e=>{if(e.target===e.currentTarget&&!recovery)onClose();}}>
  <section className="zsm-profile-dialog" role="dialog" aria-modal="true" aria-labelledby="zsm-profile-title">
   <div className="zsm-profile-top"><span>✳ Zim Safe Minds <small>/ Your account</small></span><button type="button" onClick={onClose} aria-label="Close account panel">×</button></div>
   <div className="zsm-profile-grid">
    <aside className="zsm-profile-side">
     <div className="zsm-profile-person"><span className="zsm-profile-avatar" aria-hidden="true">{display[0].toUpperCase()}</span><div><strong>{display}</strong><small>{user.email||"Account"}</small></div></div>
     <p className="zsm-profile-kicker">YOUR SPACE</p>
     <nav className="zsm-profile-nav" aria-label="Account sections">
      <button type="button" className={pane==="profile"?"active":""} aria-current={pane==="profile"?"page":undefined} onClick={()=>{setPane("profile");show("");}}>◎ <span>My profile</span></button>
      <button type="button" className={pane==="preferences"?"active":""} aria-current={pane==="preferences"?"page":undefined} onClick={()=>{setPane("preferences");show("");}}>◈ <span>Preferences</span></button>
      <button type="button" className={pane==="security"?"active":""} aria-current={pane==="security"?"page":undefined} onClick={()=>{setPane("security");show("");}}>◇ <span>Security</span></button>
     </nav>
     <p className="zsm-profile-privacy">Your account stores basic sign-in details, not your wellbeing conversations or AI Lab messages.</p>
     <button type="button" className="zsm-profile-signout" onClick={logout} disabled={busy}>Sign out ↗</button>
    </aside>
    <div className="zsm-profile-content">
     <span className="zsm-profile-kicker">A SPACE OF YOUR OWN</span>
     <h2 ref={titleRef} tabIndex={-1} id="zsm-profile-title">{pane==="profile"?"Your profile.":pane==="preferences"?"Make it yours.":"Account security."}</h2>
     <p className="zsm-profile-lead">{pane==="profile"?"Manage the basic information that appears on your account.":pane==="preferences"?"Choose your language and appearance.":"Keep your access secure."}</p>
     {pane==="profile"&&<section className="zsm-profile-card">
      <div className="zsm-profile-verified"><span aria-hidden="true">●</span> {user.email_confirmed_at?"Verified email":"Email confirmation pending"} <small>· Joined {joined}</small></div>
      <form className="zsm-profile-form" onSubmit={save}>
       <label htmlFor="zsm-display">Display name <small>Use your first name or nickname.</small></label>
       <input id="zsm-display" type="text" minLength={2} maxLength={60} autoComplete="nickname" value={name} onChange={e=>setName(e.target.value)} required/>
       <label htmlFor="zsm-email">Email address <small>Used for login and recovery.</small></label>
       <input id="zsm-email" type="email" readOnly value={user.email||""}/>
       <button type="submit" disabled={busy||name.trim()===getName(user).trim()}>{busy?"Saving…":"Save changes ↗"}</button>
      </form>
     </section>}
     {pane==="preferences"&&<section className="zsm-profile-card">
      <h3>Language</h3><p>Some long-form wellbeing content is still awaiting translation review.</p>
      <div className="zsm-profile-options" role="group" aria-label="Language">
       {languages.map(l=><button type="button" key={l.code} aria-pressed={locale===l.code} className={locale===l.code?"chosen":""} onClick={()=>onLocaleChange(l.code)}><strong>{l.native}</strong><small>{locale===l.code?"✓ Selected":l.name}</small></button>)}
      </div>
      <h3>Appearance</h3><p>Select your preferred color theme.</p>
      <div className="zsm-profile-options" role="group" aria-label="Theme">
       <button type="button" aria-pressed={theme==="afterglow"} className={theme==="afterglow"?"chosen":""} onClick={()=>onThemeChange("afterglow")}><strong>☾ Afterglow</strong><small>Dark calm</small></button>
       <button type="button" aria-pressed={theme==="daylight"} className={theme==="daylight"?"chosen":""} onClick={()=>onThemeChange("daylight")}><strong>☀ Daylight</strong><small>Light and airy</small></button>
      </div>
      <p className="zsm-profile-hint">These are local browser preferences, not sensitive account records.</p>
     </section>}
     {pane==="security"&&<section className="zsm-profile-card">
      {recovery&&<p className="zsm-profile-hint">Finish your password recovery by choosing a new password here.</p>}
      <div className="zsm-profile-verified">✳ Signed in as {user.email}</div>
      <form className="zsm-profile-form" onSubmit={updatePassword}>
       <label htmlFor="zsm-password-new">New password <small>Eight characters minimum; use a unique password.</small></label>
       <input id="zsm-password-new" autoComplete="new-password" type="password" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} required/>
       <label htmlFor="zsm-password-confirm">Confirm new password</label>
       <input id="zsm-password-confirm" autoComplete="new-password" type="password" minLength={8} value={confirm} onChange={e=>setConfirm(e.target.value)} required/>
       <button type="submit" disabled={busy}>{busy?"Updating…":"Update password ↗"}</button>
      </form>
      <p className="zsm-profile-hint">Some password changes may require recent authentication. Never share your password with anyone.</p>
     </section>}
     {notice&&<p className="zsm-profile-notice" role="status">{notice}</p>}
     <p className="zsm-profile-foot">Zim Safe Minds is not a clinical or emergency service. An account does not enroll you in monitoring, referrals or appointments.</p>
    </div>
   </div>
  </section>
 </div>;
}

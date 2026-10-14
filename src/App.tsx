import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Learn from "./Learn";
import Entry from "./Entry";
import {languages,readPreferredLocale,savePreferredLocale,t,type Locale,type CopyKey} from "./copy";
import "./entry.css";
import Connect from "./Connect";
import { CRISIS_COPY,guideReply } from "./lib/demoGuide.mjs";
type Tab="talk"|"learn"|"connect";
type Theme="daylight"|"afterglow";
type Message={role:"guide"|"user";text:string;urgent?:boolean};
const welcome:Message={role:"guide",text:"Hey, welcome. This is a scripted preview of our future AI reflection space. You don't have to have all the answers. How are things feeling today?"};
const suggestions=[
 {text:"I've been feeling stressed",sub:"There's a lot on my mind"},
 {text:"I've felt a little lonely",sub:"I'd like to talk about connection"},
 {text:"I'm worried about the future",sub:"My thoughts have been racing"},
 {text:"I'd like to speak to a therapist",sub:"I'd rather find professional support"}
];
const pauses=[
 {title:"Notice five things",body:"If it feels comfortable, look around and name five things you can see. Take your time."},
 {title:"Reconnect with your surroundings",body:"Notice where your feet or hands meet a stable surface. You can stop whenever you want."},
 {title:"Choose one small next step",body:"Maybe take a little water, rest, or ask someone you trust for company. There is no perfect answer."}
];
const brandAssetBase = import.meta.env.BASE_URL;
function Brand({small=false}:{small?:boolean}){
 return <span className={"trio-brandmark "+(small?"trio-small":"")} aria-hidden="true">
  <img src={brandAssetBase+"brand/zim-safe-minds-mark.webp"} alt="" width={small?36:52} height={small?36:52} decoding="async" />
 </span>;
}
export default function App(){
 const [tab,setTab]=useState<Tab>("talk");
 const [locale,setLocale]=useState<Locale|null>(readPreferredLocale);
 const [entryOpen,setEntryOpen]=useState(()=>!readPreferredLocale());
 const uiLocale=locale??"sn";
 const translate=(key:CopyKey)=>t(uiLocale,key);
 function chooseLocale(code:Locale){setLocale(code);savePreferredLocale(code);}
 function enterPlatform(){savePreferredLocale(uiLocale);setLocale(uiLocale);setEntryOpen(false);}
 const [theme,setTheme]=useState<Theme>("afterglow");
 const [mobile,setMobile]=useState(false);
 const [consent,setConsent]=useState(false);
 const [accepted,setAccepted]=useState(false);
 const [emergency,setEmergency]=useState(false);
 const [pause,setPause]=useState<number|null>(null);
 const [message,setMessage]=useState("");
 const [history,setHistory]=useState<Message[]>([welcome]);
 const [pendingPrompt,setPendingPrompt]=useState<string|null>(null);
 const chatLogRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{chatLogRef.current?.scrollTo({top:chatLogRef.current.scrollHeight,behavior:"smooth"});},[history]);
 useEffect(()=>{document.title="Zim Safe Minds | Talk · Learn · Connect";},[]);
 useEffect(()=>{document.documentElement.lang=uiLocale==="sn"?"sn":uiLocale==="nd"?"nd":"en";setHistory(h=>h.length===1?[{role:"guide",text:t(uiLocale,"welcomeChat")}]:h);},[uiLocale]);
 function navigate(next:Tab){setTab(next);setMobile(false);window.scrollTo({top:0,behavior:"smooth"});}
 function talk(){
   navigate("talk");
   requestAnimationFrame(()=>{
     document.getElementById("talk-space")?.scrollIntoView({behavior:"smooth",block:"start"});
     if(!accepted)setConsent(true);else document.getElementById("trio-entry")?.focus({preventScroll:true});
   });
 }
 function selectSuggestion(value:string){if(!accepted){setPendingPrompt(value);setConsent(true);}else{send(value);}}
 function beginAfterConsent(){
   setAccepted(true);setConsent(false);setTab("talk");
   if(pendingPrompt){send(pendingPrompt);setPendingPrompt(null);}
   requestAnimationFrame(()=>{
     document.getElementById("talk-space")?.scrollIntoView({behavior:"smooth",block:"start"});
     if(!pendingPrompt)document.getElementById("trio-entry")?.focus({preventScroll:true});
   });
 }
 function send(value:string){
  const input=value.trim();if(!input)return;
  const response=guideReply(input,history.length);
  setHistory(h=>[...h,{role:"user",text:input},{role:"guide",text:response.text,urgent:response.kind==="urgent"}]);
  setMessage("");
 }
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();if(accepted)send(message);}
 const hasUrgent=history.some(m=>m.urgent);
 return <div className={"app-shell palette-"+theme+" trio-app "+(entryOpen?"zsm-entry-open":"")}>
  {entryOpen&&<Entry locale={uiLocale} onChoose={chooseLocale} onEnter={enterPlatform} onUrgent={()=>setEmergency(true)}/>}
  <div className="service-ribbon"><div className="layout ribbon-content"><span><span className="live-dot"/> ZIMBABWE-BUILT · YOUTH MENTAL WELLBEING PROTOTYPE</span><button onClick={()=>setEmergency(true)}>{translate("urgent")} ↗</button></div></div>
  <header className="site-header trio-header"><div className="layout nav-shell trio-navshell">
   <button className="brand" onClick={()=>navigate("talk")} aria-label="Zim Safe Minds — Talk"><Brand/><span>Zim<span className="brand-light">Safe</span>Minds<span className="brand-period">.</span></span></button>
   <nav className={"site-nav trio-nav "+(mobile?"nav-open":"")} aria-label="Three main sections">
    <button className={tab==="talk"?"selected":""} aria-current={tab==="talk"?"page":undefined} onClick={()=>navigate("talk")}><span>01</span> {translate("talk")}</button>
    <button className={tab==="learn"?"selected":""} aria-current={tab==="learn"?"page":undefined} onClick={()=>navigate("learn")}><span>02</span> {translate("learn")}</button>
    <button className={tab==="connect"?"selected":""} aria-current={tab==="connect"?"page":undefined} onClick={()=>navigate("connect")}><span>03</span> {translate("connect")}</button>
   </nav>
   <div className="nav-actions"><label className="sr-only" htmlFor="zsm-language-switch">{translate("changeLanguage")}</label><select id="zsm-language-switch" className="zsm-header-language" aria-label={translate("changeLanguage")} value={uiLocale} onChange={e=>chooseLocale(e.target.value as Locale)}>{languages.map(l=><option key={l.code} value={l.code}>{l.native}</option>)}</select><button className="zsm-header-account" onClick={()=>setEntryOpen(true)}>{translate("account")}</button><button className="palette-switch" onClick={()=>setTheme(t=>t==="daylight"?"afterglow":"daylight")} aria-label={theme==="daylight"?"Switch to Afterglow night theme":"Switch to Daylight theme"} title="Switch calming color theme"><span aria-hidden="true">{theme==="daylight"?"☾":"☀"}</span><span>{theme==="daylight"?"Afterglow":"Daylight"}</span></button><button className="menu-control" onClick={()=>setMobile(v=>!v)} aria-label="Toggle main navigation" aria-expanded={mobile}>☰</button></div>
  </div></header>
  <main>
   {tab==="talk"&&<section className="trio-talk">
     <div className="trio-hero"><div className="layout trio-hero-grid">
      <div className="trio-hero-content"><span className="section-label"><span className="section-dot"/> {translate("label")}</span>
       <h1>{translate("heroStart")} <em>{translate("heroEm")}</em></h1>
       <p>{translate("heroDescription")}</p>
       <div className="trio-hero-buttons"><button className="button button-dark button-large" onClick={talk}>{translate("guided")} <span aria-hidden="true">↓</span></button><button className="button button-outline button-large" onClick={()=>navigate("connect")}>{translate("human")} <span aria-hidden="true">↗</span></button></div>
       <div className="trio-trustline"><span>✳ {translate("trustYouth")}</span><span>◎ {translate("trustChoice")}</span><span>♡ {translate("trustHuman")}</span></div>
       <p className="trio-tech-note">{translate("prototype")}</p>
      </div>
      <div className="trio-hero-art" aria-label="Illustration of a calm, supportive conversation">
        <div className="trio-orbit one"/><div className="trio-orbit two"/>
        <div className="trio-glass-card">
          <div className="trio-glass-top"><Brand small/><div><strong>Your space</strong><small>Reflect · Explore · Reach out</small></div><span className="trio-availability">DEMO</span></div>
          <div className="trio-glass-messages"><span>{translate("glassNotice")}</span><div className="mini-guide">{translate("glassWelcome")}</div><div className="mini-user">{translate("glassUser")}</div><div className="mini-guide">{translate("glassReply")}</div></div>
          <div className="trio-glass-input">{translate("glassInput")} <span>↑</span></div>
        </div>
        <div className="trio-annotation first">One step at a time <span>✦</span></div><div className="trio-annotation second">No pressure. No judgment.</div>
      </div>
     </div></div>

     <section className="trio-real-chat-zone" aria-labelledby="chat-section-heading">
      <div className="layout trio-real-chat-layout">
        <div className="trio-real-chat-intro">
          <div><span className="section-label"><span className="section-dot"/> {translate("chatEyebrow")}</span>
           <h2 id="chat-section-heading">{translate("chatHeading")} <em>{translate("chatEm")}</em></h2>
           <p>{translate("chatDescription")}</p>
          </div>
          <div className="trio-chat-direction"><span>01 — {translate("reflect")}</span><span>↓</span></div>
        </div>
      <section className="trio-chat-panel trio-hero-chat" aria-label="Interactive guided reflection" id="talk-space">
        <header className="trio-chat-header">
         <div className="preview-identity"><Brand small/><div><strong>Let's talk.</strong><span>Your guided reflection space</span></div></div>
         <span className="chat-preview-pill"><span className="chat-preview-dot"/> SCRIPTED DEMO</span>
        </header>
        <div className="trio-chat-topline">
          <div><span>01 / TALK</span><h2>{translate("chatTitle")}</h2><p>{translate("chatSubtitle")}</p></div>
          <button type="button" className="chat-clear" onClick={()=>{setHistory([welcome]);setMessage("");}} aria-label="Clear and start a new conversation">↺ <span>{translate("clear")}</span></button>
        </div>
        <div ref={chatLogRef} className="trio-chat-log" role="log" aria-live="polite" aria-label="Conversation messages">
          {history.map((entry,i)=><div className={"trio-chat-row "+(entry.role==="user"?"mine":"theirs")} key={i}>
           {entry.role==="guide"&&<span className="chat-guide-avatar" aria-hidden="true">✳</span>}
           <p className={"trio-chat-bubble "+(entry.urgent?"urgent":"")}>{entry.text}</p>
          </div>)}
          {history.length===1&&<div className="trio-prompts" aria-label="Conversation starters">
           {suggestions.map((s,i)=>{const key=(["promptOne","promptTwo","promptThree","promptFour"] as const)[i];const sub=(["promptOneSub","promptTwoSub","promptThreeSub","promptFourSub"] as const)[i];return <button key={s.text} type="button" onClick={()=>selectSuggestion(translate(key))}><span><strong>{translate(key)}</strong><small>{translate(sub)}</small></span><span aria-hidden="true">↗</span></button>;})}
          </div>}
          {hasUrgent&&<button className="trio-urgent-action" onClick={()=>setEmergency(true)}>{translate("helpGuidance")} ↗</button>}
        </div>
        <form className="trio-chat-composer" onSubmit={submit}>
          <label className="sr-only" htmlFor="trio-entry">Write your message</label>
          <input id="trio-entry" value={message} onChange={e=>setMessage(e.target.value)} maxLength={400} autoComplete="off"
           readOnly={!accepted} onFocus={()=>{if(!accepted)setConsent(true);}}
           onClick={()=>{if(!accepted)setConsent(true);}}
           placeholder={accepted?translate("inputReady"):translate("inputWait")} />
          <button type={accepted?"submit":"button"} onClick={accepted?undefined:()=>setConsent(true)} disabled={accepted&&!message.trim()} aria-label={accepted?"Send your message":"Begin guided conversation"}>{accepted?"↑":translate("start")+" ↗"}</button>
        </form>
        <div className="trio-chat-foot"><span>ⓘ</span> {accepted?translate("chatFooterReady"):translate("chatFooterWait")}</div>
        {uiLocale!=="en"&&<div className="zsm-speech-translation">{translate("chatLanguageNotice")}</div>}
      </section>
      </div>
     </section>
     <div className="trio-band"><div className="layout"><span>AN OUTLET TO TALK</span><span>✳</span><span>A LIBRARY TO LEARN</span><span>✳</span><span>A PATH TO CONNECT</span></div></div>
     <div className="layout trio-below-chat">
      <div className="trio-support-heading"><span className="section-label">{translate("supportLabel")}</span><h2>{translate("supportTitle")}</h2><p>{translate("supportText")}</p></div>
      <div className="trio-quick-actions" aria-label="More support options">
       <button onClick={()=>setPause(0)}><span className="quick-icon">◌</span><span><strong>{translate("pause")}</strong><small>{translate("pauseSub")}</small></span><b>↗</b></button>
       <button onClick={()=>navigate("learn")}><span className="quick-icon">▤</span><span><strong>{translate("awareness")}</strong><small>{translate("awarenessSub")}</small></span><b>↗</b></button>
       <button onClick={()=>navigate("connect")}><span className="quick-icon">♡</span><span><strong>{translate("reach")}</strong><small>{translate("reachSub")}</small></span><b>↗</b></button>
       <button onClick={()=>setEmergency(true)}><span className="quick-icon">+</span><span><strong>{translate("helpTitle")}</strong><small>{translate("helpSub")}</small></span><b>↗</b></button>
      </div>
     </div>
     <div className="layout trio-next-steps"><button onClick={()=>navigate("learn")}><span className="section-label">02 / LEARN</span><strong>{translate("nextLearn")}</strong><span>Mental-health awareness, simple education and source links →</span></button><button onClick={()=>navigate("connect")}><span className="section-label">03 / CONNECT</span><strong>{translate("nextConnect")}</strong><span>Understand care options and prepare a first message →</span></button></div>
   </section>}
   {tab!=="talk"&&uiLocale!=="en"&&<p className="zsm-partial-translation" role="status">{translate("partialTranslation")}</p>}
   {tab==="learn"&&<Learn locale={uiLocale} onTalk={talk} onConnect={()=>navigate("connect")}/>}
   {tab==="connect"&&<Connect locale={uiLocale}/>}
  </main>
  <footer className="site-footer trio-footer"><div className="layout trio-footer-grid"><div><button className="footer-brand brand-signature" onClick={()=>navigate("talk")} aria-label="Zim Safe Minds — return to Talk"><span className="brand-wordmark-glass"><img src={brandAssetBase+"brand/zim-safe-minds-wordmark.webp"} alt="Zim Safe Minds" width="920" height="292" decoding="async" /></span></button><p>{translate("footTagline")}</p><small>{translate("footPrototype")}</small></div><nav aria-label="Footer"><strong>{translate("footExplore")}</strong><button onClick={()=>navigate("talk")}>{translate("talk")}</button><button onClick={()=>navigate("learn")}>{translate("learn")}</button><button onClick={()=>navigate("connect")}>{translate("connect")}</button></nav><div><strong>{translate("footImportant")}</strong><button onClick={()=>setEmergency(true)}>{translate("urgent")}</button><a href="https://www.friendshipbenchzimbabwe.org/online" target="_blank" rel="noopener noreferrer">{translate("footIndependent")} ↗</a><small>{translate("footTherapy")}</small></div></div><div className="layout footer-bottom"><span>© 2026 Zim Safe Minds · Developed in Zimbabwe</span><span>{translate("footScripted")}</span></div></footer>
  <button className="urgent-float" onClick={()=>setEmergency(true)}>{translate("helpNow")} ↗</button>
  {consent&&<div className="modal-backdrop" role="presentation"><div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="trio-consent-title"><span className="section-label">{translate("consentLabel")}</span><h2 id="trio-consent-title">{translate("consentTitle")}</h2><p>{translate("consentP1")}</p><p>{translate("consentP2")}</p><p>Website hosts may retain ordinary access logs. {uiLocale==="en"?"You can skip this and visit Connect instead.":translate("partialTranslation")}</p><div className="modal-buttons"><button className="button button-outline" onClick={()=>{setConsent(false);setPendingPrompt(null);}}>{translate("notNow")}</button><button className="button button-dark" onClick={beginAfterConsent}>{translate("agree")} ↗</button></div></div></div>}
  {emergency&&<div className="modal-backdrop" role="presentation"><div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="trio-emergency-title"><span className="section-label">{translate("emergencyLabel")}</span><h2 id="trio-emergency-title">{translate("emergencyTitle")}</h2><p>{translate("emergencyNote")}</p>{uiLocale==="en"&&<p>{CRISIS_COPY}</p>}<button className="button button-dark" onClick={()=>setEmergency(false)}>{translate("emergencyClose")}</button></div></div>}
  {pause!==null&&<div className="modal-backdrop" role="presentation"><div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="trio-pause-title"><span className="section-label">A GENTLE MOMENT · {pause+1} / 3</span><h2 id="trio-pause-title">{pauses[pause].title}</h2><p>{pauses[pause].body}</p><p className="smallprint">Optional grounding activity. This is not clinical treatment; stop if uncomfortable.</p><div className="modal-buttons"><button className="button button-outline" onClick={()=>setPause(null)}>Finish</button><button className="button button-dark" onClick={()=>setPause(pause===2?null:pause+1)}>{pause===2?"Done":"Next step"} ↗</button></div></div></div>}
 </div>;
}

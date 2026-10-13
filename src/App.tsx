import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Learn from "./Learn";
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
function Brand({small=false}:{small?:boolean}){
 return <span className={"trio-brandmark "+(small?"trio-small":"")} aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="M6 26h10l6-12 7 20 5-9h8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="24" r="21" stroke="currentColor" opacity=".3"/></svg></span>;
}
export default function App(){
 const [tab,setTab]=useState<Tab>("talk");
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
 function navigate(next:Tab){setTab(next);setMobile(false);window.scrollTo({top:0,behavior:"smooth"});}
 function talk(){navigate("talk"); if(!accepted){setConsent(true);}else{requestAnimationFrame(()=>document.getElementById("trio-entry")?.focus());}}
 function selectSuggestion(value:string){if(!accepted){setPendingPrompt(value);setConsent(true);}else{send(value);}}
 function beginAfterConsent(){
   setAccepted(true);setConsent(false);setTab("talk");
   if(pendingPrompt){send(pendingPrompt);setPendingPrompt(null);}
   else requestAnimationFrame(()=>document.getElementById("trio-entry")?.focus());
 }
 function send(value:string){
  const input=value.trim();if(!input)return;
  const response=guideReply(input,history.length);
  setHistory(h=>[...h,{role:"user",text:input},{role:"guide",text:response.text,urgent:response.kind==="urgent"}]);
  setMessage("");
 }
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();if(accepted)send(message);}
 const hasUrgent=history.some(m=>m.urgent);
 return <div className={"app-shell palette-"+theme+" trio-app"}>
  <div className="service-ribbon"><div className="layout ribbon-content"><span><span className="live-dot"/> ZIMBABWE-BUILT · YOUTH MENTAL WELLBEING PROTOTYPE</span><button onClick={()=>setEmergency(true)}>Need urgent help? ↗</button></div></div>
  <header className="site-header trio-header"><div className="layout nav-shell trio-navshell">
   <button className="brand" onClick={()=>navigate("talk")} aria-label="Zim Safe Minds, Talk"><Brand/><span>Zim<span className="brand-light">Safe</span>Minds<span className="brand-period">.</span></span></button>
   <nav className={"site-nav trio-nav "+(mobile?"nav-open":"")} aria-label="Three main sections">
    <button className={tab==="talk"?"selected":""} aria-current={tab==="talk"?"page":undefined} onClick={()=>navigate("talk")}><span>01</span> Talk</button>
    <button className={tab==="learn"?"selected":""} aria-current={tab==="learn"?"page":undefined} onClick={()=>navigate("learn")}><span>02</span> Learn</button>
    <button className={tab==="connect"?"selected":""} aria-current={tab==="connect"?"page":undefined} onClick={()=>navigate("connect")}><span>03</span> Connect</button>
   </nav>
   <div className="nav-actions"><button className="palette-switch" onClick={()=>setTheme(t=>t==="daylight"?"afterglow":"daylight")} aria-label={theme==="daylight"?"Switch to Afterglow night theme":"Switch to Daylight theme"} title="Switch calming color theme"><span aria-hidden="true">{theme==="daylight"?"☾":"☀"}</span><span>{theme==="daylight"?"Afterglow":"Daylight"}</span></button><button className="menu-control" onClick={()=>setMobile(v=>!v)} aria-label="Toggle main navigation" aria-expanded={mobile}>☰</button></div>
  </div></header>
  <main>
   {tab==="talk"&&<section className="trio-talk">
     <div className="trio-hero"><div className="layout trio-hero-grid">
      <div className="trio-hero-content"><span className="section-label"><span className="section-dot"/> A SAFER FIRST STEP STARTS HERE</span>
       <h1>It's okay to <em>not feel okay.</em></h1>
       <p>When you need somewhere to start, talk it through here. Explore mental-health resources and take the next step toward human support whenever you choose.</p>
       <div className="trio-hero-buttons"><button className="button button-dark button-large" onClick={talk}>Open the chat <span aria-hidden="true">↗</span></button><button className="button button-outline button-large" onClick={()=>navigate("connect")}>Find human support <span aria-hidden="true">↗</span></button></div>
       <div className="trio-trustline"><span>✳ Youth-first</span><span>◎ Your choice</span><span>♡ Human care matters</span></div>
       <p className="trio-tech-note">Early prototype: today's conversation is scripted, not connected to a live AI or clinician.</p>
      </div>
      <section className="trio-chat-panel trio-hero-chat" aria-label="Interactive guided reflection" id="talk-space">
        <header className="trio-chat-header">
         <div className="preview-identity"><Brand small/><div><strong>Let's talk.</strong><span>Your guided reflection space</span></div></div>
         <span className="chat-preview-pill"><span className="chat-preview-dot"/> SCRIPTED DEMO</span>
        </header>
        <div className="trio-chat-topline">
          <div><span>01 / TALK</span><h2>A space to be heard.</h2><p>You can start with a prompt or write something yourself.</p></div>
          <button type="button" className="chat-clear" onClick={()=>{setHistory([welcome]);setMessage("");}} aria-label="Clear and start a new conversation">↺ <span>Clear</span></button>
        </div>
        <div ref={chatLogRef} className="trio-chat-log" role="log" aria-live="polite" aria-label="Conversation messages">
          {history.map((entry,i)=><div className={"trio-chat-row "+(entry.role==="user"?"mine":"theirs")} key={i}>
           {entry.role==="guide"&&<span className="chat-guide-avatar" aria-hidden="true">✳</span>}
           <p className={"trio-chat-bubble "+(entry.urgent?"urgent":"")}>{entry.text}</p>
          </div>)}
          {history.length===1&&<div className="trio-prompts" aria-label="Conversation starters">
           {suggestions.map(s=><button key={s.text} type="button" onClick={()=>selectSuggestion(s.text)}><span><strong>{s.text}</strong><small>{s.sub}</small></span><span aria-hidden="true">↗</span></button>)}
          </div>}
          {hasUrgent&&<button className="trio-urgent-action" onClick={()=>setEmergency(true)}>Read immediate-help guidance ↗</button>}
        </div>
        <form className="trio-chat-composer" onSubmit={submit}>
          <label className="sr-only" htmlFor="trio-entry">Write your message</label>
          <input id="trio-entry" value={message} onChange={e=>setMessage(e.target.value)} maxLength={400} autoComplete="off"
           readOnly={!accepted} onFocus={()=>{if(!accepted)setConsent(true);}}
           onClick={()=>{if(!accepted)setConsent(true);}}
           placeholder={accepted?"Type your message here…":"Tap here to begin talking…"} />
          <button type={accepted?"submit":"button"} onClick={accepted?undefined:()=>setConsent(true)} disabled={accepted&&!message.trim()} aria-label={accepted?"Send your message":"Begin guided conversation"}>{accepted?"↑":"Start ↗"}</button>
        </form>
        <div className="trio-chat-foot"><span>ⓘ</span> {accepted?"Messages stay in this tab; they are not sent to a clinician.":"Not live AI or therapy. Review the demo disclosure before chatting."}</div>
      </section>
     </div></div>
     <div className="trio-band"><div className="layout"><span>AN OUTLET TO TALK</span><span>✳</span><span>A LIBRARY TO LEARN</span><span>✳</span><span>A PATH TO CONNECT</span></div></div>
     <div className="layout trio-below-chat">
      <div className="trio-support-heading"><span className="section-label">SUPPORT BEYOND THE CONVERSATION</span><h2>There is no <em>single right way</em> to begin.</h2><p>Take a quiet moment, explore trusted information, or move directly toward human support. You're always in control.</p></div>
      <div className="trio-quick-actions" aria-label="More support options">
       <button onClick={()=>setPause(0)}><span className="quick-icon">◌</span><span><strong>Take a pause</strong><small>Three optional grounding steps</small></span><b>↗</b></button>
       <button onClick={()=>navigate("learn")}><span className="quick-icon">▤</span><span><strong>Explore awareness</strong><small>Read approachable wellbeing articles</small></span><b>↗</b></button>
       <button onClick={()=>navigate("connect")}><span className="quick-icon">♡</span><span><strong>Reach real support</strong><small>Plan the next step with a person</small></span><b>↗</b></button>
       <button onClick={()=>setEmergency(true)}><span className="quick-icon">+</span><span><strong>Need urgent help?</strong><small>Access independent emergency guidance</small></span><b>↗</b></button>
      </div>
     </div>
     <div className="layout trio-next-steps"><button onClick={()=>navigate("learn")}><span className="section-label">02 / LEARN</span><strong>Find a little perspective.</strong><span>Mental-health awareness, simple education and source links →</span></button><button onClick={()=>navigate("connect")}><span className="section-label">03 / CONNECT</span><strong>Take the next step with a person.</strong><span>Understand care options and prepare a first message →</span></button></div>
   </section>}
   {tab==="learn"&&<Learn onTalk={talk} onConnect={()=>navigate("connect")}/>}
   {tab==="connect"&&<Connect/>}
  </main>
  <footer className="site-footer trio-footer"><div className="layout trio-footer-grid"><div><button className="footer-brand" onClick={()=>navigate("talk")}><Brand small/> Zim Safe Minds</button><p>A safe space to talk. A path to real support.</p><small>Early Zimbabwe youth mental-wellbeing research prototype.</small></div><nav aria-label="Footer"><strong>Explore</strong><button onClick={()=>navigate("talk")}>Talk</button><button onClick={()=>navigate("learn")}>Learn</button><button onClick={()=>navigate("connect")}>Connect</button></nav><div><strong>Important</strong><button onClick={()=>setEmergency(true)}>Urgent help</button><a href="https://www.friendshipbenchzimbabwe.org/online" target="_blank" rel="noopener noreferrer">Independent support ↗</a><small>Not therapy or a crisis service</small></div></div><div className="layout footer-bottom"><span>© 2026 Zim Safe Minds · Developed in Zimbabwe</span><span>Scripted prototype · Human care comes first</span></div></footer>
  <button className="urgent-float" onClick={()=>setEmergency(true)}>Help right now ↗</button>
  {consent&&<div className="modal-backdrop" role="presentation"><div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="trio-consent-title"><span className="section-label">BEFORE YOU BEGIN</span><h2 id="trio-consent-title">Your comfort comes first.</h2><p>This is a <strong>scripted demonstration</strong> of our future AI-guided reflection feature, not a live AI model or therapist. It cannot diagnose, provide medical advice, monitor safety or book care.</p><p>Messages remain in your browser tab only until you refresh or leave. The host may log standard website access. Do not share identifying or sensitive health information. If someone is in immediate danger, seek emergency medical care.</p><p><strong>For adults 18+ only.</strong> You can skip this and visit Connect instead.</p><div className="modal-buttons"><button className="button button-outline" onClick={()=>{setConsent(false);setPendingPrompt(null);}}>Not now</button><button className="button button-dark" onClick={beginAfterConsent}>I understand · Continue ↗</button></div></div></div>}
  {emergency&&<div className="modal-backdrop" role="presentation"><div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="trio-emergency-title"><span className="section-label">IMMEDIATE SUPPORT</span><h2 id="trio-emergency-title">Please seek real help now.</h2><p>{CRISIS_COPY}</p><p>This website is not monitored by any clinician. It cannot call anyone for you. We do not show unverified crisis hotline details.</p><button className="button button-dark" onClick={()=>setEmergency(false)}>Close guidance</button></div></div>}
  {pause!==null&&<div className="modal-backdrop" role="presentation"><div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="trio-pause-title"><span className="section-label">A GENTLE MOMENT · {pause+1} / 3</span><h2 id="trio-pause-title">{pauses[pause].title}</h2><p>{pauses[pause].body}</p><p className="smallprint">Optional grounding activity. This is not clinical treatment; stop if uncomfortable.</p><div className="modal-buttons"><button className="button button-outline" onClick={()=>setPause(null)}>Finish</button><button className="button button-dark" onClick={()=>setPause(pause===2?null:pause+1)}>{pause===2?"Done":"Next step"} ↗</button></div></div></div>}
 </div>;
}

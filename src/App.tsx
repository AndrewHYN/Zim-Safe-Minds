import { useEffect, useState } from "react";
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
 useEffect(()=>{document.title="Zim Safe Minds | Talk · Learn · Connect";},[]);
 function navigate(next:Tab){setTab(next);setMobile(false);window.scrollTo({top:0,behavior:"smooth"});}
 function talk(){navigate("talk"); if(!accepted){setConsent(true);}else{requestAnimationFrame(()=>document.getElementById("talk-space")?.scrollIntoView({behavior:"smooth",block:"start"}));}}
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
       <p>Some conversations are hard to begin. We're making it easier to express what's on your mind, discover mental-health resources, and reach real people when you choose.</p>
       <div className="trio-hero-buttons"><button className="button button-dark button-large" onClick={talk}>Try guided conversation <span aria-hidden="true">↗</span></button><button className="button button-outline button-large" onClick={()=>navigate("connect")}>Find human support <span aria-hidden="true">↗</span></button></div>
       <div className="trio-trustline"><span>✳ Youth-first</span><span>◎ Your choice</span><span>♡ Human care matters</span></div>
       <p className="trio-tech-note">Early prototype: today's conversation is scripted, not connected to a live AI or clinician.</p>
      </div>
      <div className="trio-hero-art">
        <div className="trio-orbit one"/><div className="trio-orbit two"/>
        <div className="trio-glass-card"><div className="trio-glass-top"><Brand small/><div><strong>Your space</strong><small>Reflect · Explore · Reach out</small></div><span className="trio-availability">DEMO</span></div><div className="trio-glass-messages"><span>THERE IS NO PERFECT WAY TO START</span><div className="mini-guide">Hi, you're welcome here. What's been on your mind lately?</div><div className="mini-user">A lot, honestly.</div><div className="mini-guide">Would it help to talk a little, or would you prefer to explore human support?</div></div><div className="trio-glass-input">Say what's on your mind <span>↑</span></div></div>
        <div className="trio-annotation first">One step at a time <span>✦</span></div><div className="trio-annotation second">No pressure. No judgment.</div>
      </div>
     </div></div>
     <div className="trio-band"><div className="layout"><span>AN OUTLET TO TALK</span><span>✳</span><span>A LIBRARY TO LEARN</span><span>✳</span><span>A PATH TO CONNECT</span></div></div>
     <div className="layout trio-intro-block"><div><span className="section-label">YOUR FIRST STEP</span><h2>Let's start wherever <em>you are.</em></h2></div><p>Our vision puts AI-assisted reflection alongside real human care, rather than in place of it. Try the guided prototype below, or head directly to Learn or Connect.</p></div>
     <div className="layout trio-workspace" id="talk-space">
       <aside className="trio-chat-side"><span className="section-label">01 / TALK IT THROUGH</span><h2>Your thoughts, at your pace.</h2><p>This is a safe-feeling interface designed around choice. Please don't share identifying or sensitive medical information in this demo.</p>
        <div className="trio-side-divider"/>
        <button onClick={()=>setPause(0)}><span>◌</span> Take a grounding pause <b>↗</b></button>
        <button onClick={()=>navigate("learn")}><span>▤</span> Explore awareness resources <b>↗</b></button>
        <button onClick={()=>navigate("connect")}><span>♡</span> Explore human support <b>↗</b></button>
        <button onClick={()=>{setHistory([welcome]);setMessage("");}}><span>↺</span> Clear conversation</button>
        <div className="trio-side-disclaimer">This site cannot diagnose, prescribe, monitor crises, or send help. Messages remain only in your current browser tab.</div>
       </aside>
       <section className="trio-chat-panel" aria-label="Guided reflection prototype">
        <header className="trio-chat-header"><div className="preview-identity"><Brand small/><div><strong>Guided reflection</strong><span>Scripted preview · Not live AI</span></div></div><button onClick={()=>setEmergency(true)}>Urgent help ↗</button></header>
        {accepted?
          <><div className="trio-chat-log" role="log" aria-live="polite"><p className="trio-log-label">TAKE YOUR TIME</p>{history.map((entry,i)=><div className={"trio-chat-row "+(entry.role==="user"?"mine":"theirs")} key={i}><p className={"trio-chat-bubble "+(entry.urgent?"urgent":"")}>{entry.text}</p></div>)}
            {history.length===1&&<div className="trio-prompts">{suggestions.map(s=><button key={s.text} onClick={()=>send(s.text)}><span><strong>{s.text}</strong><small>{s.sub}</small></span><span aria-hidden="true">↗</span></button>)}</div>}
            {hasUrgent&&<button className="trio-urgent-action" onClick={()=>setEmergency(true)}>Read immediate-help guidance ↗</button>}
          </div><form className="trio-chat-composer" onSubmit={submit}><label className="sr-only" htmlFor="trio-entry">Write a message</label><input id="trio-entry" value={message} onChange={e=>setMessage(e.target.value)} maxLength={400} autoComplete="off" placeholder="Write something, if you'd like…"/><button type="submit" disabled={!message.trim()} aria-label="Send">↑</button></form></>
          :<div className="trio-consent-gate"><span className="trio-consent-glyph">♡</span><h3>Come as you are.</h3><p>Before you begin, please review the demo's privacy and safety boundaries. No account is needed.</p><button className="button button-dark" onClick={()=>setConsent(true)}>Start guided preview ↗</button><button className="trio-simple-link" onClick={()=>navigate("connect")}>I'd prefer to find a human instead →</button></div>
        }
        <p className="trio-chat-foot">Non-clinical scripted demo · No server-side messages or booking</p>
       </section>
     </div>
     <div className="layout trio-next-steps"><button onClick={()=>navigate("learn")}><span className="section-label">02 / LEARN</span><strong>Find a little perspective.</strong><span>Mental-health awareness, simple education and source links →</span></button><button onClick={()=>navigate("connect")}><span className="section-label">03 / CONNECT</span><strong>Take the next step with a person.</strong><span>Understand care options and prepare a first message →</span></button></div>
   </section>}
   {tab==="learn"&&<Learn onTalk={talk} onConnect={()=>navigate("connect")}/>}
   {tab==="connect"&&<Connect/>}
  </main>
  <footer className="site-footer trio-footer"><div className="layout trio-footer-grid"><div><button className="footer-brand" onClick={()=>navigate("talk")}><Brand small/> Zim Safe Minds</button><p>A safe space to talk. A path to real support.</p><small>Early Zimbabwe youth mental-wellbeing research prototype.</small></div><nav aria-label="Footer"><strong>Explore</strong><button onClick={()=>navigate("talk")}>Talk</button><button onClick={()=>navigate("learn")}>Learn</button><button onClick={()=>navigate("connect")}>Connect</button></nav><div><strong>Important</strong><button onClick={()=>setEmergency(true)}>Urgent help</button><a href="https://www.friendshipbenchzimbabwe.org/online" target="_blank" rel="noopener noreferrer">Independent support ↗</a><small>Not therapy or a crisis service</small></div></div><div className="layout footer-bottom"><span>© 2026 Zim Safe Minds · Developed in Zimbabwe</span><span>Scripted prototype · Human care comes first</span></div></footer>
  <button className="urgent-float" onClick={()=>setEmergency(true)}>Help right now ↗</button>
  {consent&&<div className="modal-backdrop" role="presentation"><div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="trio-consent-title"><span className="section-label">BEFORE YOU BEGIN</span><h2 id="trio-consent-title">Your comfort comes first.</h2><p>This is a <strong>scripted demonstration</strong> of our future AI-guided reflection feature, not a live AI model or therapist. It cannot diagnose, provide medical advice, monitor safety or book care.</p><p>Messages remain in your browser tab only until you refresh or leave. The host may log standard website access. Do not share identifying or sensitive health information. If someone is in immediate danger, seek emergency medical care.</p><p><strong>For adults 18+ only.</strong> You can skip this and visit Connect instead.</p><div className="modal-buttons"><button className="button button-outline" onClick={()=>setConsent(false)}>Not now</button><button className="button button-dark" onClick={()=>{setAccepted(true);setConsent(false);setTab("talk");requestAnimationFrame(()=>document.getElementById("talk-space")?.scrollIntoView({behavior:"smooth"}));}}>I understand · Continue ↗</button></div></div></div>}
  {emergency&&<div className="modal-backdrop" role="presentation"><div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="trio-emergency-title"><span className="section-label">IMMEDIATE SUPPORT</span><h2 id="trio-emergency-title">Please seek real help now.</h2><p>{CRISIS_COPY}</p><p>This website is not monitored by any clinician. It cannot call anyone for you. We do not show unverified crisis hotline details.</p><button className="button button-dark" onClick={()=>setEmergency(false)}>Close guidance</button></div></div>}
  {pause!==null&&<div className="modal-backdrop" role="presentation"><div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="trio-pause-title"><span className="section-label">A GENTLE MOMENT · {pause+1} / 3</span><h2 id="trio-pause-title">{pauses[pause].title}</h2><p>{pauses[pause].body}</p><p className="smallprint">Optional grounding activity. This is not clinical treatment; stop if uncomfortable.</p><div className="modal-buttons"><button className="button button-outline" onClick={()=>setPause(null)}>Finish</button><button className="button button-dark" onClick={()=>setPause(pause===2?null:pause+1)}>{pause===2?"Done":"Next step"} ↗</button></div></div></div>}
 </div>;
}

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import CarePath from "./CarePath";
import { CRISIS_COPY, guideReply } from "./lib/demoGuide.mjs";

type View = "home" | "talk" | "care" | "mission" | "support";
type Palette = "daylight" | "afterglow";
type ChatMessage = { by: "guide" | "user"; body: string; urgent?: boolean };
const welcome: ChatMessage = { by: "guide", body: "Hi, I'm your guided support preview. You don't need to find the perfect words. What would you like to talk about?" };
const topics = [
  { title: "I'm feeling overwhelmed", detail: "When everything feels like too much" },
  { title: "I'm feeling lonely", detail: "When connection feels difficult" },
  { title: "I've been worried lately", detail: "When your mind won't slow down" },
  { title: "I'd like professional help", detail: "Find a pathway to a real person" }
];
const exercises = [
 { title: "Notice what is around you", text: "If it feels comfortable, slowly notice five things you can see. You can stop whenever you like." },
 { title: "Feel where you are", text: "Bring your attention to where your hands or feet touch something stable, like the ground or a chair." },
 { title: "Choose one gentle next step", text: "Maybe a little water, a short break, or reaching out to someone you trust. You can choose." }
];
function Mark({compact=false}:{compact?:boolean}){
 return <span className={"brand-mark" + (compact?" brand-mark-small":"")} aria-hidden="true"><svg viewBox="0 0 40 40" fill="none"><path d="M6 21h9l4-10 6 18 4-8h5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="20" cy="20" r="17.4" stroke="currentColor" strokeWidth="1.3" opacity=".4"/></svg></span>;
}
function Arrow(){return <span aria-hidden="true" className="arrow">↗</span>;}
function SectionLabel({children}:{children:string}){return <span className="section-label"><span className="section-dot"/> {children}</span>;}
export default function App(){
 const [view,setView]=useState<View>("home");
 const [palette,setPalette]=useState<Palette>("daylight");
 const [drawer,setDrawer]=useState(false);
 const [consent,setConsent]=useState(false);
 const [hasConsent,setHasConsent]=useState(false);
 const [urgent,setUrgent]=useState(false);
 const [exercise,setExercise]=useState<number|null>(null);
 const [messages,setMessages]=useState<ChatMessage[]>([welcome]);
 const [input,setInput]=useState("");
 useEffect(()=>{document.title="Zim Safe Minds — A space to talk. A way forward.";},[]);
 function navigate(next:View){setView(next);setDrawer(false);window.scrollTo({top:0,behavior:"smooth"});}
 function startTalking(){if(!hasConsent){setConsent(true);}else{navigate("talk");}}
 function send(value:string){
  const cleaned=value.trim();if(!cleaned)return;
  const response=guideReply(cleaned,messages.length);
  setMessages(current=>[...current,{by:"user",body:cleaned},{by:"guide",body:response.text,urgent:response.kind==="urgent"}]);
  setInput("");
 }
 function submit(e:FormEvent){e.preventDefault();send(input);}
 function resetChat(){setMessages([welcome]);setInput("");}
 return <div className={"app-shell palette-"+palette}>
  <div className="service-ribbon"><div className="layout ribbon-content"><span><span className="live-dot"/> A youth-first mental wellbeing initiative, made for Zimbabwe</span><button onClick={()=>setUrgent(true)}>Need immediate help? <Arrow/></button></div></div>
  <header className="site-header"><div className="layout nav-shell">
   <button className="brand" onClick={()=>navigate("home")} aria-label="Zim Safe Minds home"><Mark/><span>Zim<span className="brand-light">Safe</span>Minds<span className="brand-period">.</span></span></button>
   <nav className={"site-nav "+(drawer?"nav-open":"")} aria-label="Main navigation">
    <button className={view==="home"?"selected":""} onClick={()=>navigate("home")}>Home</button>
    <button className={view==="talk"?"selected":""} onClick={startTalking}>Talk it through</button>
    <button className={view==="care"?"selected":""} onClick={()=>navigate("care")}>Find support</button>
    <button className={view==="mission"?"selected":""} onClick={()=>navigate("mission")}>Our mission</button>
   </nav>
   <div className="nav-actions">
    <button className="palette-switch" onClick={()=>setPalette(p=>p==="daylight"?"afterglow":"daylight")} aria-label={"Switch to "+(palette==="daylight"?"Afterglow night":"Daylight")+" theme"} title="Change color theme"><span aria-hidden="true">{palette==="daylight"?"☾":"☀"}</span><span>{palette==="daylight"?"Afterglow":"Daylight"}</span></button>
    <button className="button button-dark nav-primary" onClick={startTalking}>Start here <Arrow/></button>
    <button className="menu-control" aria-label="Toggle menu" aria-expanded={drawer} onClick={()=>setDrawer(!drawer)}>☰</button>
   </div>
  </div></header>
  <main>
   {view==="home" && <>
    <section className="hero-area"><div className="layout hero-grid">
      <div className="hero-copy">
       <SectionLabel>YOUR MIND MATTERS HERE</SectionLabel>
       <h1>Whatever's on your mind, <span className="headline-emphasis">you don't have to hold it alone.</span></h1>
       <p className="hero-lead">A gentler first step toward mental wellbeing. Explore AI-guided reflection, take a quiet moment for yourself, and find a path to real human support — on your terms.</p>
       <div className="hero-buttons"><button className="button button-dark button-large" onClick={startTalking}>Start a conversation <Arrow/></button><button className="button button-outline button-large" onClick={()=>navigate("care")}>Explore care options <Arrow/></button></div>
       <div className="hero-assurance"><span className="assurance-symbol">✓</span><span>No account needed for the preview</span><span className="assurance-separator"/><span>Support is always your choice</span></div>
      </div>
      <div className="visual-stage" aria-label="Example of a gentle support conversation">
       <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="glow-halo"/>
       <div className="preview-panel">
        <div className="preview-top"><div className="preview-identity"><Mark compact/><div><strong>Your space</strong><span>AI-guided reflection · Product preview</span></div></div><span className="status-tag"><span/> Demo</span></div>
        <div className="preview-main"><span className="preview-date">A MOMENT FOR YOURSELF</span><div className="chat-bubble guide-bubble">Hello. No pressure to explain everything at once. How's your day been?</div><div className="chat-bubble user-bubble">Honestly? A bit overwhelming.</div><div className="chat-bubble guide-bubble">That sounds like a lot. Would you like to tell me what's been weighing on you?</div></div>
        <div className="preview-compose"><span>Say what's on your mind…</span><span className="preview-send">↑</span></div>
       </div>
       <div className="floating-note note-one"><span className="tiny-orb"/> Made for your pace</div>
       <div className="floating-note note-two"><span>✦</span> Real support when you're ready</div>
      </div>
    </div></section>
    <div className="trust-bar"><div className="layout trust-inner"><span>BUILT AROUND PEOPLE</span><span className="trust-bullet">✳</span><span>DESIGNED WITH PRIVACY IN MIND</span><span className="trust-bullet">✳</span><span>HUMAN CARE COMES FIRST</span></div></div>
    <section className="layout home-section journey-section">
      <div className="section-heading-row"><div><SectionLabel>SUPPORT, YOUR WAY</SectionLabel><h2>There's more than <em>one way</em><br/>to feel supported.</h2></div><p>Some days you want to talk. Some days you want a moment of calm. And sometimes you want a real professional. You choose your next step.</p></div>
      <div className="path-grid">
       <article className="path-card card-chat"><div className="path-top"><span>01 / EXPRESS</span><span className="path-icon">◉</span></div><div className="card-illustration dots-art"><span/><span/><span/><i/></div><h3>Talk things through</h3><p>Find your words in a private-feeling, low-pressure conversation. Our AI-assisted experience is the product vision; the current demo is scripted.</p><button className="text-link" onClick={startTalking}>Try the conversation <Arrow/></button></article>
       <article className="path-card card-ground"><div className="path-top"><span>02 / RECENTER</span><span className="path-icon">✳</span></div><div className="card-illustration waves-art"><span/><span/><span/></div><h3>Find a moment of calm</h3><p>Small, optional grounding exercises that help you pause and notice what you need, without pressure or expectations.</p><button className="text-link" onClick={()=>setExercise(0)}>Take a gentle pause <Arrow/></button></article>
       <article className="path-card card-care"><div className="path-top"><span>03 / CONNECT</span><span className="path-icon">↗</span></div><div className="card-illustration connect-art"><span/><i/><b/></div><h3>Reach human support</h3><p>Explore publicly available support and tell us your care preferences. Verified professional referrals are a future pilot feature.</p><button className="text-link" onClick={()=>navigate("care")}>Explore support <Arrow/></button></article>
      </div>
    </section>
    <section className="wide-feature"><div className="layout feature-split"><div className="feature-visual"><div className="signal-grid"/><div className="feature-center"><div className="feature-center-mark"><Mark/></div><span>PEOPLE + TECHNOLOGY</span><div className="signal-line">⌁ ─── ● ─── ⌁</div></div></div><div className="feature-copy"><SectionLabel>TECHNOLOGY WITH EMPATHY</SectionLabel><h2>AI can help you start.<br/><em>People help you go further.</em></h2><p>We're designing AI-guided self-expression for the moments when it's hard to open up. It won't diagnose you, decide what treatment you need, or quietly share your conversations. When you want human help, the decision stays with you.</p><div className="feature-points"><div><span className="point-mark">01</span><span>Supportive reflection without judgment</span></div><div><span className="point-mark">02</span><span>Your choice to explore qualified care</span></div><div><span className="point-mark">03</span><span>No automatic sharing of private conversations</span></div></div><button className="button button-light" onClick={()=>navigate("mission")}>Why we're building this <Arrow/></button></div></div></section>
    <section className="layout final-section"><SectionLabel>HERE WHEN YOU'RE READY</SectionLabel><h2>A small first step can be <em>a meaningful one.</em></h2><p>You don't need a diagnosis or the perfect words to begin exploring support.</p><div className="hero-buttons center-buttons"><button className="button button-dark button-large" onClick={startTalking}>Try the guided preview <Arrow/></button><button className="button button-outline button-large" onClick={()=>navigate("care")}>See support options <Arrow/></button></div></section>
   </>}
   {view==="talk" && <section className="layout conversation-layout">
    <aside className="conversation-side"><SectionLabel>YOUR OWN PACE</SectionLabel><h2>One thought<br/>at a time.</h2><p>This is an interactive scripted preview of our future AI-assisted support experience. It is not yet a live AI model or a mental-health service.</p><div className="side-divider"/>
     <button className="side-action" onClick={()=>setExercise(0)}><span className="side-action-icon">◌</span><span>Take a grounding pause</span><Arrow/></button>
     <button className="side-action" onClick={()=>navigate("care")}><span className="side-action-icon">↗</span><span>Find human support</span><Arrow/></button>
     <button className="side-action" onClick={resetChat}><span className="side-action-icon">↺</span><span>Clear this conversation</span></button>
     <div className="notice-side"><strong>Before you share</strong><p>Please avoid names, addresses, diagnoses or other identifying health details. This preview keeps messages in this browser tab only; hosting services may still record basic web traffic.</p></div>
    </aside>
    <div className="conversation-panel"><header className="conversation-header"><div className="preview-identity"><Mark compact/><div><strong>Guided reflection</strong><span>Scripted preview · Not live AI or therapy</span></div></div><button className="help-inline" onClick={()=>setUrgent(true)}>Urgent help <Arrow/></button></header>
     <div className="conversation-stream" role="log" aria-live="polite"><span className="stream-label">THIS MOMENT IS YOURS</span>
      {messages.map((m,i)=><div className={"stream-row "+(m.by==="user"?"stream-user":"stream-guide")} key={i}><p className={"stream-bubble "+(m.urgent?"stream-urgent":"")}>{m.body}</p></div>)}
      {messages.length===1 && <div className="prompt-options">{topics.map(t=><button onClick={()=>send(t.title)} key={t.title}><span><strong>{t.title}</strong><small>{t.detail}</small></span><Arrow/></button>)}</div>}
     </div>
     <form className="composer" onSubmit={submit}><label className="sr-only" htmlFor="message">Your message</label><input id="message" placeholder="Write what's on your mind…" maxLength={400} autoComplete="off" value={input} onChange={e=>setInput(e.target.value)}/><button aria-label="Send message" type="submit" disabled={!input.trim()}>↑</button></form><p className="conversation-disclaimer">Demonstration only — no diagnosis, crisis monitoring or real-time therapist response.</p>
    </div>
   </section>}
   {view==="care" && <CarePath/>}
   {view==="mission" && <section className="layout editorial-page"><SectionLabel>THE REASON WE EXIST</SectionLabel><h1>Support should feel <em>human</em> from the very first step.</h1><p className="editorial-lead">Zim Safe Minds started with a simple observation: when you're struggling, the first step can be the hardest. We want to help young Zimbabweans express what they're feeling, understand available support, and reach professionals without shame or unnecessary barriers.</p><div className="editorial-grid">
     <article><span>01 — OUR APPROACH</span><h3>AI with clear boundaries.</h3><p>AI-guided reflection is central to the product vision, but clinical decisions belong to qualified humans. The current demo uses scripted replies while clinical, privacy and security work is planned.</p></article>
     <article><span>02 — WHO WE START WITH</span><h3>Zimbabwean young adults.</h3><p>Our proposed first pilot focuses on adults aged 18–35, with careful consideration for language, accessibility, low-data mobile phones, affordability and safeguarding.</p></article>
     <article><span>03 — WHAT WE MEASURE</span><h3>Connections, not chat counts.</h3><p>We want to learn whether people can find appropriate support. Verified provider partnerships and consent-based introductions come only after professional checks and approvals.</p></article>
    </div><div className="editorial-callout"><div><span className="section-label">OUR NORTH STAR</span><h2>A safe space to talk.<br/>A path to real support.</h2></div><button className="button button-light" onClick={()=>navigate("care")}>Explore the care pathway <Arrow/></button></div></section>}
   {view==="support" && <section className="layout editorial-page"><SectionLabel>HUMAN SUPPORT</SectionLabel><h1>There's strength in reaching <em>a real person.</em></h1><p className="editorial-lead">Zim Safe Minds is not a clinic or emergency service. You can go directly to an existing independent mental-health service without using our guided chat. We haven't verified or partnered with private therapists yet.</p><div className="support-callout"><span>EXTERNAL SERVICE · NOT AFFILIATED WITH ZIM SAFE MINDS</span><h2>Friendship Bench Zimbabwe</h2><p>Visit the provider's official website to learn about its published online support, conditions and current availability. We do not send them your conversation or preferences.</p><a href="https://www.friendshipbenchzimbabwe.org/online" target="_blank" rel="noopener noreferrer" className="button button-dark">Go to official support site <Arrow/></a></div><button className="button button-outline" onClick={()=>navigate("care")}>Try the care navigator <Arrow/></button></section>}
  </main>
  <footer className="site-footer"><div className="layout footer-content"><div><button className="footer-brand" onClick={()=>navigate("home")}><Mark compact/><span>Zim Safe Minds</span></button><p>A safe space to talk.<br/>A path to real support.</p></div><div><strong>Explore</strong><button onClick={startTalking}>Guided preview</button><button onClick={()=>navigate("care")}>Find care</button><button onClick={()=>navigate("mission")}>Our mission</button></div><div><strong>Important</strong><button onClick={()=>navigate("support")}>Existing services</button><button onClick={()=>setUrgent(true)}>Immediate help</button><span>For adults 18+ · Research demo</span></div></div><div className="layout footer-bottom"><span>© 2026 Zim Safe Minds · Built with care in Zimbabwe.</span><span>This prototype is not a therapy service, medical diagnosis or emergency response.</span></div></footer>
  <button className="urgent-float" onClick={()=>setUrgent(true)}>Help right now <Arrow/></button>
  {consent && <div className="modal-backdrop" role="presentation"><div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="consent-title"><SectionLabel>BEFORE WE BEGIN</SectionLabel><h2 id="consent-title">Your comfort comes first.</h2><p>You're about to try a <strong>scripted demonstration</strong> of our future AI-guided reflection experience. This is not a live AI model, therapist, diagnosis, crisis-monitoring system or emergency service.</p><p>Messages stay in this browser tab while it remains open. Please don't include identifying health information. If you need immediate help, contact local emergency services or visit an emergency department.</p><div className="modal-buttons"><button className="button button-outline" onClick={()=>setConsent(false)}>Not now</button><button className="button button-dark" onClick={()=>{setHasConsent(true);setConsent(false);navigate("talk");}}>I understand — continue <Arrow/></button></div></div></div>}
  {urgent && <div className="modal-backdrop" role="presentation"><div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="help-title"><SectionLabel>IMMEDIATE SUPPORT</SectionLabel><h2 id="help-title">Please don't wait for this website.</h2><p>{CRISIS_COPY}</p><p>This prototype is not monitored by a crisis worker and cannot dispatch help. We have not verified local crisis hotline details for this demo, so we won't display unverified numbers.</p><button className="button button-dark" onClick={()=>setUrgent(false)}>Close</button></div></div>}
  {exercise!==null && <div className="modal-backdrop" role="presentation"><div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="exercise-title"><SectionLabel>{"A GENTLE PAUSE · "+(exercise+1)+" OF 3"}</SectionLabel><h2 id="exercise-title">{exercises[exercise].title}</h2><p>{exercises[exercise].text}</p><p className="smallprint">This exercise is optional and not a clinical treatment. Stop if it feels uncomfortable.</p><div className="modal-buttons"><button className="button button-outline" onClick={()=>setExercise(null)}>Finish</button><button className="button button-dark" onClick={()=>setExercise(exercise===2?null:exercise+1)}>{exercise===2?"Done":"Next"} <Arrow/></button></div></div></div>}
 </div>;
}

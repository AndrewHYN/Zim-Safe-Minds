import { useState } from "react";
import type { FormEvent } from "react";
import { CRISIS_COPY, guideReply } from "./lib/demoGuide.mjs";

type Screen = "home" | "chat" | "support" | "about";
type ChatMessage = { role: "guide" | "you"; text: string; urgent?: boolean };
const initial: ChatMessage = { role: "guide", text: "Hey, you're welcome here. This is a scripted demonstration, not a therapist or live AI. You don't have to share personal details. What's on your mind today?" };
const topics = ["I'm feeling stressed", "I feel alone", "I'm worried about something", "I want to speak to a professional"];
const grounding = [
  { label: "1 / 3 · Notice", title: "Look around", body: "If it feels comfortable, notice five things you can see. There is no need to rush." },
  { label: "2 / 3 · Settle", title: "Feel the ground", body: "Notice where your feet or hands make contact with a surface. Let your attention rest there." },
  { label: "3 / 3 · Return", title: "Choose one next step", body: "Notice one small thing that might help right now: some water, fresh air, rest or talking to someone." }
];
function Logo(){ return <span className="mark" aria-hidden="true">✳</span>; }
export default function App(){
 const [screen,setScreen]=useState<Screen>("home");
 const [consented,setConsented]=useState(false);
 const [consentOpen,setConsentOpen]=useState(false);
 const [helpOpen,setHelpOpen]=useState(false);
 const [step,setStep]=useState<number|null>(null);
 const [messages,setMessages]=useState<ChatMessage[]>([initial]);
 const [draft,setDraft]=useState("");
 const [mobileMenu,setMobileMenu]=useState(false);
 function go(next:Screen){setScreen(next);setMobileMenu(false);window.scrollTo({top:0,behavior:"smooth"});}
 function start(){if(!consented){setConsentOpen(true);return;}go("chat");}
 function send(text:string){
  if(!text.trim())return;
  const reply=guideReply(text,messages.length);
  const you:ChatMessage={role:"you",text:text.trim()};
  const guide:ChatMessage={role:"guide",text:reply.text,urgent:reply.kind==="urgent"};
  setMessages(old=>[...old,you,guide]);setDraft("");
 }
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();send(draft);}
 function reset(){setMessages([initial]);setDraft("");setStep(null);}
 return <>
  <div className="topnote"><span className="pulse" /> EARLY PROTOTYPE · FOR AGES 18+ · NOT A CRISIS SERVICE</div>
  <header className="site-header"><div className="container nav-row">
   <button className="brand" onClick={()=>go("home")} aria-label="Zim Safe Minds home"><Logo/><span>Zim<span className="brand-thin">Safe</span>Minds</span></button>
   <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={mobileMenu} onClick={()=>setMobileMenu(!mobileMenu)}>☰</button>
   <nav className={mobileMenu?"nav-links open":"nav-links"} aria-label="Main navigation">
    <button className={screen==="home"?"active":""} onClick={()=>go("home")}>Home</button>
    <button className={screen==="about"?"active":""} onClick={()=>go("about")}>Our mission</button>
    <button className={screen==="support"?"active":""} onClick={()=>go("support")}>Find support</button>
    <button className="nav-cta" onClick={start}>Start talking <span aria-hidden="true">↗</span></button>
   </nav>
  </div></header>
  <main>
   {screen==="home" && <>
    <section className="hero"><div className="container hero-grid">
     <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/> MADE FOR REAL LIFE IN ZIMBABWE</div>
      <h1>A safe space<br/>to <em>talk.</em><br/>A path to <span className="underlined">real support.</span></h1>
      <p>Sometimes the hardest part is finding a place to begin. Zim Safe Minds is exploring a gentler first step toward mental wellbeing and qualified human care.</p>
      <div className="hero-actions"><button className="btn primary" onClick={start}>Try the guided demo <span>↗</span></button><button className="btn subtle" onClick={()=>go("support")}>How support works <span>→</span></button></div>
      <div className="hero-note"><span className="shield-icon">✓</span> Private within this browser tab · No account needed for the demo</div>
     </div>
     <div className="hero-visual" aria-label="Preview of the scripted support chat">
       <div className="float-label">A little support, one step at a time <span>✴</span></div>
       <div className="phone">
        <div className="phone-top"><span className="avatar">✳</span><div><strong>Your space</strong><small>Scripted demo · Not live AI</small></div><span className="dots">•••</span></div>
        <div className="chat-preview"><span className="date">TODAY, AT YOUR PACE</span><div className="bubble demo">Hey. You don't have to have the perfect words. How are you feeling?</div><div className="bubble self">Honestly, a bit overwhelmed lately.</div><div className="bubble demo">That sounds heavy. Want to tell me what's been weighing on you?</div></div>
        <div className="phone-bottom"><span>Write what's on your mind…</span><b>↗</b></div>
       </div>
       <div className="floating-badge">✳ <span>Feeling heard begins somewhere.</span></div>
     </div>
    </div></section>
    <section className="strip"><div className="container strip-row"><span>NO PUBLIC FEED</span><span className="sep">✳</span><span>YOUR CHOICE TO REACH OUT</span><span className="sep">✳</span><span>ZIMBABWE-FIRST</span></div></section>
    <section className="section container"><div className="section-top"><div><div className="eyebrow">A SIMPLE START</div><h2>Support that meets<br/>you where you are.</h2></div><p>We're building the bridge between quietly struggling and knowing where to turn — without pretending technology can replace a person.</p></div>
     <div className="feature-grid">
      <article className="feature"><span className="feature-index">01 / EXPRESS</span><div className="feature-symbol">〰</div><h3>Put it into words</h3><p>Try a gentle, private chat-style demonstration with supportive prompts. No judgment, no public profile.</p></article>
      <article className="feature"><span className="feature-index">02 / REGROUP</span><div className="feature-symbol">◌</div><h3>Take a small pause</h3><p>Use optional grounding and self-expression prompts when you need a moment for yourself.</p></article>
      <article className="feature"><span className="feature-index">03 / CONNECT</span><div className="feature-symbol">↗</div><h3>Find the right human</h3><p>Our future pathway will help you locate independently verified mental health professionals and request introductions by choice.</p></article>
     </div>
    </section>
    <section className="callout container"><div><span className="eyebrow">THERE'S NO RIGHT WAY TO START</span><h2>You don't need to have it all figured out.</h2><p>One small conversation can be a beginning. Explore our safe demonstration — and know you can always seek qualified human support.</p></div><button className="btn light" onClick={start}>Open your space ↗</button></section>
   </>}
   {screen==="chat" && <section className="container chat-layout">
    <aside className="chat-side"><span className="eyebrow">YOUR SPACE</span><h2>One thought<br/>at a time.</h2><p>This is a scripted, local demonstration. It doesn't understand every situation or monitor your safety.</p><div className="side-line"/>
     <button onClick={()=>setStep(0)} className="side-link">◌ <span>Take a grounding pause</span> ↗</button>
     <button onClick={()=>go("support")} className="side-link">↗ <span>Explore human support</span> ↗</button>
     <button onClick={reset} className="side-link">↺ <span>Clear this conversation</span></button>
     <div className="side-reminder">Please don't share identifying health information. Messages aren't saved or sent to a server by this demo.</div>
    </aside>
    <div className="chat-panel"><div className="chat-bar"><span className="avatar">✳</span><div><b>Your space</b><small>Guided practice · Not a person or AI</small></div><button className="mini-help" onClick={()=>setHelpOpen(true)}>Urgent help ↗</button></div>
     <div className="chat-messages" role="log" aria-live="polite" aria-label="Demo conversation">
      <p className="chat-day">A MOMENT JUST FOR YOU</p>
      {messages.map((message,i)=><div className={"message-row "+(message.role==="you"?"from-you":"from-guide")} key={i}><div className={"message "+(message.urgent?"urgent":"")}>{message.text}</div></div>)}
      {messages.length===1 && <div className="topic-list">{topics.map(t=><button key={t} onClick={()=>send(t)}>{t}<span>↗</span></button>)}</div>}
     </div>
     <form className="composer" onSubmit={submit}><label className="sr-only" htmlFor="thought">Write a short message</label><input id="thought" value={draft} onChange={e=>setDraft(e.target.value)} maxLength={400} placeholder="Write a little, if you'd like..." autoComplete="off"/><button type="submit" aria-label="Send message" disabled={!draft.trim()}>↑</button></form>
     <div className="chat-footnote">Scripted demo only · Not therapy, diagnosis or emergency response</div>
    </div>
   </section>}
   {screen==="support" && <section className="container content-page"><span className="eyebrow">A PATH TO REAL SUPPORT</span><h1>Because sometimes,<br/><em>you need a person.</em></h1><p className="lead">Our goal is to help people in Zimbabwe reach qualified mental health professionals without fear, confusion or unnecessary barriers. Professional introductions and bookings are <strong>not live yet.</strong></p>
    <div className="journey"><article><span>01</span><h3>Choose what matters</h3><p>In a future pilot, browse by location, availability, modality, affordability and language.</p></article><article><span>02</span><h3>Know who you're meeting</h3><p>Only properly checked, consenting providers would appear in the directory.</p></article><article><span>03</span><h3>Connect with control</h3><p>Request an introduction only when ready. No chat transcript is shared by default.</p></article></div>
    <div className="info-panel"><b>Why no therapist list today?</b><p>We haven't completed independent provider verification or established clinical partnerships. Showing unverified contacts would break the trust we're trying to build.</p><button className="btn primary" onClick={start}>Try the chat demonstration ↗</button></div>
   </section>}
   {screen==="about" && <section className="container content-page"><span className="eyebrow">OUR REASON FOR EXISTING</span><h1>Mental wellbeing help<br/>should feel <em>reachable.</em></h1><p className="lead">Zim Safe Minds began with one question: what if a young person who finds it difficult to open up could start quietly, and still have a credible path to qualified care?</p>
    <div className="mission-grid"><article><span>OUR MISSION</span><h3>Human care comes first.</h3><p>We propose AI-assisted emotional expression as a bridge, never a diagnosis engine or a replacement for clinical treatment.</p></article><article><span>OUR FIRST PILOT</span><h3>Zimbabwean youth aged 18–35.</h3><p>We intend to co-design with local mental health professionals, validate barriers and measure actual access to care.</p></article><article><span>OUR LONG-TERM VISION</span><h3>Accessible for everyone.</h3><p>We're designing toward affordable, multilingual, mobile-friendly support, while keeping the initial demonstration adults-only.</p></article></div>
    <button className="btn primary" onClick={()=>go("support")}>Explore the human-support vision ↗</button>
   </section>}
  </main>
  <footer className="footer"><div className="container footer-grid"><div><div className="footer-brand"><Logo/> Zim Safe Minds</div><p>A safe space to talk. A path to real support.</p></div><div className="footer-links"><button onClick={()=>go("about")}>Our mission</button><button onClick={()=>go("support")}>Human support</button><button onClick={()=>setHelpOpen(true)}>Urgent help</button></div></div><div className="container footer-end"><span>Early research prototype · Made for Zimbabwe</span><span>Not a clinical service or real AI chat</span></div></footer>
  <button className="help-floating" onClick={()=>setHelpOpen(true)}>Need urgent help? ↗</button>
  {consentOpen && <div className="overlay" role="presentation"><div className="modal" role="dialog" aria-modal="true" aria-labelledby="consent-title"><span className="eyebrow">BEFORE YOU BEGIN</span><h2 id="consent-title">This is a demonstration.</h2><p>Responses are scripted, not AI or a human counselor. The demo isn't medical advice, therapy, diagnosis, or emergency response. Don't enter identifying health information. Messages remain only in this tab and vanish on refresh.</p><p>For adults 18+ only. If you need immediate assistance, use your local emergency services or visit a hospital.</p><div className="modal-actions"><button className="btn subtle" onClick={()=>setConsentOpen(false)}>Not now</button><button className="btn primary" onClick={()=>{setConsented(true);setConsentOpen(false);go("chat");}}>I understand · Continue ↗</button></div></div></div>}
  {helpOpen && <div className="overlay" role="presentation"><div className="modal" role="dialog" aria-modal="true" aria-labelledby="help-title"><span className="eyebrow urgent-eyebrow">URGENT SUPPORT</span><h2 id="help-title">You don't have to wait here.</h2><p>{CRISIS_COPY}</p><p>There is no live person monitoring this application. We have not verified any local crisis hotline for this demo, so we won't display unverified numbers.</p><button className="btn primary" onClick={()=>setHelpOpen(false)}>Close this message</button></div></div>}
  {step!==null && <div className="overlay" role="presentation"><div className="modal" role="dialog" aria-modal="true" aria-labelledby="ground-title"><span className="eyebrow">{grounding[step].label}</span><h2 id="ground-title">{grounding[step].title}</h2><p>{grounding[step].body}</p><p className="fineprint">Optional self-expression exercise; not medical treatment. Stop if it feels uncomfortable.</p><div className="modal-actions"><button className="btn subtle" onClick={()=>setStep(null)}>Finish</button><button className="btn primary" onClick={()=>setStep(step===2?null:step+1)}>{step===2?"Done":"Next step"} →</button></div></div></div>}
 </>;
}

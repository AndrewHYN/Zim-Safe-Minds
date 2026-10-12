import { useState } from "react";
import { careSummary, careCopy } from "./lib/careOptions.mjs";

type Mode = "online" | "in-person" | "either";
type Budget = "free" | "low-cost" | "either";
type Language = "English" | "Shona" | "Ndebele";
type Stage = 0 | 1 | 2;

const modes: {value:Mode; title:string; subtitle:string}[]=[
  {value:"online",title:"Online / phone",subtitle:"I'd rather start from where I am."},
  {value:"in-person",title:"Face to face",subtitle:"I'd prefer to meet in a safe setting."},
  {value:"either",title:"Either is okay",subtitle:"Show me the options I can explore."}
];
const budgets:{value:Budget;title:string;subtitle:string}[]=[
  {value:"free",title:"Free support",subtitle:"I cannot pay for support right now."},
  {value:"low-cost",title:"Affordable options",subtitle:"I may be able to contribute a little."},
  {value:"either",title:"Show available choices",subtitle:"I want to understand my options first."}
];
const languages:Language[]=["English","Shona","Ndebele"];
export default function CarePath(){
  const [stage,setStage]=useState<Stage>(0);
  const [mode,setMode]=useState<Mode>("either");
  const [budget,setBudget]=useState<Budget>("free");
  const [language,setLanguage]=useState<Language>("English");
  const [copied,setCopied]=useState(false);
  const summary=careSummary({mode,budget,language});
  async function copy(){
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {setCopied(false);}
  }
  return <section className="container navigator-page">
    <div className="navigator-header">
      <div className="eyebrow">THE CARE PATHWAY · DEMO</div>
      <h1>Find a next step that <em>feels possible.</em></h1>
      <p>Support should fit your needs, not the other way around. Explore a pathway in three simple steps. This is <strong>not a clinical assessment</strong>, and no information is sent or saved.</p>
    </div>
    <div className="navigator-grid">
      <section className="navigator-card" aria-label="Choose your care preferences">
        <div className="navigator-progress" aria-label={"Step "+(stage+1)+" of 3"}><span className={stage>=0?"on":""}/><span className={stage>=1?"on":""}/><span className={stage>=2?"on":""}/></div>
        {stage===0 && <><span className="eyebrow">STEP 01 / 03</span><h2>How would you like to connect?</h2><p>There is no wrong choice. You're in control.</p><div className="option-grid">{modes.map(m=><button key={m.value} type="button" className={"option-card "+(mode===m.value?"selected":"")} aria-pressed={mode===m.value} onClick={()=>setMode(m.value)}><b>{m.title}</b><small>{m.subtitle}</small><span aria-hidden="true">{mode===m.value?"●":"○"}</span></button>)}</div></>}
        {stage===1 && <><span className="eyebrow">STEP 02 / 03</span><h2>What about affordability?</h2><p>We won't assume that everyone can pay for private therapy.</p><div className="option-grid">{budgets.map(b=><button key={b.value} type="button" className={"option-card "+(budget===b.value?"selected":"")} aria-pressed={budget===b.value} onClick={()=>setBudget(b.value)}><b>{b.title}</b><small>{b.subtitle}</small><span aria-hidden="true">{budget===b.value?"●":"○"}</span></button>)}</div></>}
        {stage===2 && <><span className="eyebrow">STEP 03 / 03</span><h2>Which language works for you?</h2><p>This is a preference, not a guarantee of availability.</p><div className="option-grid">{languages.map(l=><button key={l} type="button" className={"option-card "+(language===l?"selected":"")} aria-pressed={language===l} onClick={()=>setLanguage(l)}><b>{l}</b><small>Preferred language</small><span aria-hidden="true">{language===l?"●":"○"}</span></button>)}</div></>}
        <div className="navigator-actions">
          <button type="button" className="btn subtle" onClick={()=>setStage(s=>Math.max(0,s-1) as Stage)} disabled={stage===0}>← Back</button>
          {stage<2?<button type="button" className="btn primary" onClick={()=>setStage(s=>(s+1) as Stage)}>Continue →</button>:<button type="button" className="btn primary" onClick={()=>document.getElementById("care-outcome")?.scrollIntoView({behavior:"smooth"})}>View options ↓</button>}
        </div>
      </section>
      <aside id="care-outcome" className="navigator-outcome" aria-label="Your next steps">
        <div className="eyebrow">WHAT YOU CAN DO NEXT</div>
        <h2>Real support. On your terms.</h2>
        <p className="outcome-note">This example summary contains preferences only, never your chat transcript or health details. Nothing is transmitted by Zim Safe Minds.</p>
        <div className="preference-summary">
          {careCopy({mode,budget,language}).map(x=><div key={x.label}><span>{x.label}</span><b>{x.value}</b></div>)}
        </div>
        <div className="public-service">
          <span className="service-label">INDEPENDENT PUBLIC SERVICE · NOT OUR PARTNER</span>
          <h3>Friendship Bench Zimbabwe</h3>
          <p>Friendship Bench publishes free online mental-health support through trained supporters, with services in English, Shona and Ndebele. Check its official site for current details, availability and eligibility before contacting them.</p>
          <a className="btn primary" href="https://www.friendshipbenchzimbabwe.org/online" target="_blank" rel="noopener noreferrer">Visit the official service ↗</a>
        </div>
        <div className="future-service"><h3>Verified therapists — planned</h3><p>A future pilot could offer opt-in introductions to licensed professionals after independent credential checks, clinical partnerships and privacy approval. No booking or referral is live.</p></div>
        <button className="copy-preferences" type="button" onClick={copy}>{copied?"✓ Copied preferences":"Copy my preferences (not chat text)"} ↗</button>
        <p className="navigator-disclaimer">This is navigation information, not treatment, diagnosis, triage, crisis monitoring or endorsement of a provider. If you are in immediate danger, seek emergency medical care instead.</p>
      </aside>
    </div>
  </section>;
}

import { useEffect, useState } from "react";
import { tr, type Language as SiteLanguage } from "./i18n";
import type { Locale } from "./copy";
import { careSummary, careCopy, firstContactNote } from "./lib/careOptions.mjs";

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
export default function CarePath({locale}:{locale:Locale}){
  const [stage,setStage]=useState<Stage>(0);
  const [mode,setMode]=useState<Mode>("either");
  const [budget,setBudget]=useState<Budget>("free");
  const [language,setLanguage]=useState<Language>(locale==="sn"?"Shona":locale==="nd"?"Ndebele":"English");
  const [copied,setCopied]=useState(false);
  const [contactCopied,setContactCopied]=useState(false);
  const [copyError,setCopyError]=useState(false);
  const summary=careSummary({mode,budget,language});
  const introduction=firstContactNote({mode,budget,language});
  async function copy(){
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);setCopyError(false);
    } catch {setCopied(false);setCopyError(true);}
  }
  async function copyContact(){
    try { await navigator.clipboard.writeText(introduction);setContactCopied(true);setCopyError(false); }
    catch { setContactCopied(false);setCopyError(true); }
  }
  return <section className="container navigator-page">
    <div className="navigator-header">
      <div className="eyebrow">{t("THE CARE PATHWAY · DEMO")}</div>
      <h1>{t("Find a next step that ")}<em>{t("feels possible.")}</em></h1>
      <p>Support should fit your needs, not the other way around. Explore a pathway in three simple steps. This is <strong>not a clinical assessment</strong>, and no information is sent or saved.</p>
    </div>
    <div className="navigator-grid">
      <section className="navigator-card" aria-label="Choose your care preferences">
        <div className="navigator-progress" aria-label={t("Step ")+(stage+1)+t(" of 3")}><span className={stage>=0?"on":""}/><span className={stage>=1?"on":""}/><span className={stage>=2?"on":""}/></div>
        {stage===0 && <><span className="eyebrow">{t("STEP 01 / 03")}</span><h2>{t("How would you like to connect?")}</h2><p>{t("There is no wrong choice. You're in control.")}</p><div className="option-grid">{modes.map(m=><button key={m.value} type="button" className={"option-card "+(mode===m.value?"selected":"")} aria-pressed={mode===m.value} onClick={()=>setMode(m.value)}><b>{t(m.title)}</b><small>{t(m.subtitle)}</small><span aria-hidden="true">{mode===m.value?"●":"○"}</span></button>)}</div></>}
        {stage===1 && <><span className="eyebrow">{t("STEP 02 / 03")}</span><h2>{t("What about affordability?")}</h2><p>{t("We won't assume that everyone can pay for private therapy.")}</p><div className="option-grid">{budgets.map(b=><button key={b.value} type="button" className={"option-card "+(budget===b.value?"selected":"")} aria-pressed={budget===b.value} onClick={()=>setBudget(b.value)}><b>{t(b.title)}</b><small>{t(b.subtitle)}</small><span aria-hidden="true">{budget===b.value?"●":"○"}</span></button>)}</div></>}
        {stage===2 && <><span className="eyebrow">{t("STEP 03 / 03")}</span><h2>{t("Which language works for you?")}</h2><p>{t("This is a preference, not a guarantee of availability.")}</p><div className="option-grid">{languages.map(l=><button key={l} type="button" className={"option-card "+(language===l?"selected":"")} aria-pressed={language===l} onClick={()=>setLanguage(l)}><b>{l}</b><small>{t("Preferred language")}</small><span aria-hidden="true">{language===l?"●":"○"}</span></button>)}</div></>}
        <div className="navigator-actions">
          <button type="button" className="button button-outline" onClick={()=>setStage(s=>Math.max(0,s-1) as Stage)} disabled={stage===0}>{t("← Back")}</button>
          {stage<2?<button type="button" className="button button-dark" onClick={()=>setStage(s=>(s+1) as Stage)}>{t("Continue →")}</button>:<button type="button" className="button button-dark" onClick={()=>document.getElementById("care-outcome")?.scrollIntoView({behavior:"smooth"})}>{t("View options ↓")}</button>}
        </div>
      </section>
      <aside id="care-outcome" className="navigator-outcome" aria-label="Your next steps">
        <div className="eyebrow">{t("WHAT YOU CAN DO NEXT")}</div>
        <h2>{t("Real support. On your terms.")}</h2>
        <p className="outcome-note">This example summary contains preferences only, never your chat transcript or health details. Nothing is transmitted by Zim Safe Minds.</p>
        <div className="preference-summary">
          {careCopy({mode,budget,language}).map(x=><div key={x.label}><span>{x.label}</span><b>{x.value}</b></div>)}
        </div>
        <div className="public-service">
          <span className="service-label">{t("INDEPENDENT PUBLIC SERVICE · NOT OUR PARTNER")}</span>
          <h3>Friendship Bench Zimbabwe</h3>
          <p>Friendship Bench publishes free online mental-health support through trained supporters, with services in English, Shona and Ndebele. Check its official site for current details, availability and eligibility before contacting them.</p>
          <a className="button button-dark" href="https://www.friendshipbenchzimbabwe.org/online" target="_blank" rel="noopener noreferrer">{t("Visit the official service ↗")}</a>
        </div>

        <div className="referral-preview">
          <div className="service-label">{t("PREPARE A FIRST MESSAGE · OPTIONAL")}</div>
          <h3>{t("Know what to say before reaching out")}</h3>
          <p>This is only a suggested message. Nothing is sent from this app. Review it, then choose whether and where to send it yourself.</p>
          <pre aria-label="Suggested first contact message">{introduction}</pre>
          <button className="copy-preferences" type="button" onClick={copyContact}>{contactCopied?"✓ "+t("Copied — review before sending"):t("Copy this message for me")+" ↗"}</button>
        </div>
        <div className="handoff-steps" aria-label="How the care pathway works"><strong>{t("The bridge to care")}</strong><ol><li>Explore your preferences without creating an account.</li><li>Review an independent service's published information.</li><li>Choose whether to contact them yourself.</li><li>In a future partner pilot, an introduction can happen only with explicit consent.</li></ol></div>
        <div className="future-service"><h3>{t("Verified therapists — planned")}</h3><p>A future pilot could offer opt-in introductions to licensed professionals after independent credential checks, clinical partnerships and privacy approval. No booking or referral is live.</p></div>
        <button className="copy-preferences" type="button" onClick={copy}>{copied?"✓ "+t("Saved"):t("Copy my preferences (not chat text)")} ↗</button>
        {copyError && <p role="status" className="navigator-disclaimer">Copying is unavailable in this browser. You can review your preferences above without sharing any chat text.</p>}
        <p className="navigator-disclaimer">This is navigation information, not treatment, diagnosis, triage, crisis monitoring or endorsement of a provider. If you are in immediate danger, seek emergency medical care instead.</p>
      </aside>
    </div>
  </section>;
}

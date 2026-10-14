import { useState } from "react";
import { tr } from "./i18n";
import { type Locale } from "./copy";
import CarePath from "./CarePath";
import {appointmentChoices,appointmentMessage} from "./lib/appointmentPreview.mjs";
export default function Connect({locale}:{locale:Locale}){
 const t=(english:string)=>tr(locale,english);
 const t=(value:string)=>tr(locale as Language,value);
 const choices=appointmentChoices();
 const [service,setService]=useState("intro");
 const [format,setFormat]=useState("either");
 const [timing,setTiming]=useState("flexible");
 const [copied,setCopied]=useState(false);
 const [error,setError]=useState(false);
 const text=appointmentMessage({service,format,timing});
 async function copy(){
  try{await navigator.clipboard.writeText(text);setCopied(true);setError(false);}
  catch{setCopied(false);setError(true);}
 }
 return <div className="connect-page">
   <div className="layout connect-header"><div><span className="section-label"><span className="section-dot"/> CONNECT / HUMAN SUPPORT</span><h1>{locale==="sn"?"Vanhu chaivo.":locale==="nd"?"Abantu boqobo.":"Real people."} <em>{locale==="sn"?"Rubatsiro rwechokwadi.":locale==="nd"?"Usizo lweqiniso.":"Real support."}</em><br/>{locale==="sn"?"Sarudzo yako.":locale==="nd"?"Ukukhetha kwakho.":"Your choice."}</h1><p>{locale==="sn"?"Ongorora nzira dzako, uye gadzirira kutaura nemunhu. Hapana chikonzero chekugovera hurukuro yako.":locale==="nd"?"Hlola izindlela ezikhona, ulungiselele ukukhuluma lomuntu. Akudingeki ukuthi wabelane ngengxoxo yakho.":"Explore your options and prepare to make that first contact. You never have to share a chat transcript to look for help."}</p>
    <div className="connect-trust"><span>✓ {t("User-led choice")}</span><span>✓ {t("No hidden transcript sharing")}</span><span>✓ {t("Independent sources")}</span></div>
   </div><div className="connect-header-visual" aria-hidden="true"><div className="connect-orbit"><div className="connect-pulse">♡</div></div><span>{t("FROM A FIRST THOUGHT")}</span><strong>{t("to a real conversation.")}</strong></div></div>
   <div className="layout">
    <div className="connect-heading"><span className="section-label">{t("A SIMPLE PATH FORWARD")}</span><h2>{t("How getting support can work.")}</h2></div>
    <div className="connect-three">
      <div><span className="connect-number">01</span><h3>{t("Explore")}</h3><p>{t("Understand what care formats and services may be available.")}</p></div>
      <div><span className="connect-number">02</span><h3>{t("Plan")}</h3><p>{t("Prepare a short request using only the preferences you choose.")}</p></div>
      <div><span className="connect-number">03</span><h3>{t("Reach out")}</h3><p>{t("Contact a service yourself. Partner appointments are future work.")}</p></div>
    </div>
    <section className="booking-preview" aria-labelledby="booking-title">
      <div className="booking-heading"><div><span className="section-label">{t("APPOINTMENT PLANNER · DEMO")}</span><h2 id="booking-title">{t("Make the first message easier.")}</h2><p>Try an appointment-planning preview. This is <strong>not a booking request</strong>: no provider is contacted, no date is reserved and no personal information is collected.</p></div><div className="booking-icon" aria-hidden="true">▦</div></div>
      <div className="booking-columns">
       <div className="booking-controls">
         <label htmlFor="session-type">{t("What kind of information would you like?")}</label>
         <select id="session-type" value={service} onChange={e=>{setService(e.target.value);setCopied(false);}}>{choices.service.map(v=><option key={v.value} value={v.value}>{t(v.label)}</option>)}</select>
         <label htmlFor="meeting-type">{t("How would you prefer to connect?")}</label>
         <select id="meeting-type" value={format} onChange={e=>{setFormat(e.target.value);setCopied(false);}}>{choices.format.map(v=><option key={v.value} value={v.value}>{t(v.label)}</option>)}</select>
         <label htmlFor="time-type">{t("When would you generally be free?")}</label>
         <select id="time-type" value={timing} onChange={e=>{setTiming(e.target.value);setCopied(false);}}>{choices.timing.map(v=><option key={v.value} value={v.value}>{t(v.label)}</option>)}</select>
       </div>
       <div className="booking-result"><span>{t("YOUR DRAFT MESSAGE")}</span><pre>{text}</pre><button type="button" className="button button-dark" onClick={copy}>{copied?"✓ "+t("Copied — review before sending"):t("Copy request text")+" ↗"}</button>{error&&<p role="status">Copying is unavailable in this browser. You can manually select the text above.</p>}<small>Nothing is transmitted by Zim Safe Minds. You choose if, when and whom to contact.</small></div>
      </div>
    </section>
   </div>
   <CarePath locale={locale}/>
 </div>;
}

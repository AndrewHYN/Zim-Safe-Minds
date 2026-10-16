import { useCallback, useMemo, useState } from "react";
import type { Locale } from "./copy";
import { tr } from "./i18n";
import LearnPostModal from "./components/LearnPostModal";
import { GalleryIcon } from "./components/GalleryIcon";
import { categoryMeta, learnPosts, trustedResources } from "./data/learnData";
import type { LearnCategory, LearnKind, LearnPost } from "./data/learnData";
import "./learn-gallery.css";

type Props = { onTalk:()=>void; onConnect:()=>void; locale:Locale };
type KindFilter = "all" | LearnKind;
type TopicFilter = "all" | LearnCategory;
const src=(path:string)=>import.meta.env.BASE_URL + path.replace(/^\//, "");
const topics:TopicFilter[]=["all","mental","substance","women","men","relationships","support"];

// Healthcare text stays in reviewed-source English until native speakers review translations.
const headings:Record<Locale,{eyebrow:string;title:string;emphasis:string;description:string;library:string;stories:string;posters:string;all:string;help:string}>={
 en:{eyebrow:"THE YOUTH WELLBEING EDITION",title:"Good information.",emphasis:"A softer place to land.",description:"Posters, short stories and independent Zimbabwean resources—on mental wellbeing, body confidence, substance awareness and finding real help.",library:"Explore the library",stories:"Stories",posters:"Posters",all:"Everything",help:"Find support"},
 sn:{eyebrow:"RUSUNUNGUKO RWEVECHIDIKI",title:"Ruzivo runobatsira.",emphasis:"Nzvimbo yakasununguka.",description:"Maposta, nyaya pfupi uye ruzivo rwerubatsiro rwevechidiki muZimbabwe. Zvimwe zvinyorwa zvichiri muChirungu.",library:"Ongorora ruzivo",stories:"Nyaya",posters:"Maposta",all:"Zvese",help:"Wana rubatsiro"},
 nd:{eyebrow:"IMPILAKAHLE YABATSHA",title:"Ulwazi oluncedayo.",emphasis:"Indawo yokuphumula.",description:"Amaphosta, izindaba ezifitshane kanye lemininingwane yenhlanganiso zeZimbabwe. Ezinye izihloko ziseseNgisi.",library:"Hlola ulwazi",stories:"Izindaba",posters:"Amaphosta",all:"Konke",help:"Thola usizo"},
};

export default function Learn({onTalk,onConnect,locale}:Props){
 const h=headings[locale];
 const t=(v:string)=>tr(locale,v);
 const [selectedTopic,setSelectedTopic]=useState<TopicFilter>("all");
 const [selectedKind,setSelectedKind]=useState<KindFilter>("all");
 const [query,setQuery]=useState("");
 const [active,setActive]=useState<LearnPost|null>(null);
 const [saved,setSaved]=useState<string[]>([]);
 const close=useCallback(()=>setActive(null),[]);
 const toggleSaved=useCallback((id:string)=>setSaved(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]),[]);
 const results=useMemo(()=>{
  const words=query.trim().toLocaleLowerCase();
  return learnPosts.filter(p=>(selectedTopic==="all"||p.category===selectedTopic)
    &&(selectedKind==="all"||p.kind===selectedKind)
    &&(!words||[p.title,p.excerpt,categoryMeta[p.category].name,p.takeaway].join(" ").toLocaleLowerCase().includes(words)));
 },[selectedTopic,selectedKind,query]);
 const featured=learnPosts.filter(p=>p.featured);
 const reset=()=>{setQuery("");setSelectedKind("all");setSelectedTopic("all");};
 function navigateToConnect(){close();onConnect();}
 const filterButton="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border px-4 text-xs font-bold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300";
 return <section className="zlearn relative min-h-screen overflow-hidden bg-[#081b27] text-[#effefb]" aria-labelledby="zlg-page-title">
  <div className="pointer-events-none absolute left-[-20%] top-[-350px] size-[700px] rounded-full bg-[#235d6b]/25 blur-[130px]" aria-hidden="true"/>
  <div className="pointer-events-none absolute right-[-20%] top-[180px] size-[650px] rounded-full bg-[#346353]/15 blur-[130px]" aria-hidden="true"/>
  <div className="relative mx-auto max-w-[1250px] px-4 pb-24 pt-12 sm:px-8 sm:pt-16 lg:px-12">
   <header className="grid items-center gap-7 md:grid-cols-[1fr_auto]">
    <div className="max-w-[830px]">
     <div className="inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[.24em] text-teal-200"><span className="size-2 rounded-full bg-teal-300 shadow-[0_0_0_5px_rgba(94,234,212,.12)]"/>{h.eyebrow}</div>
     <h1 id="zlg-page-title" className="mt-5 text-[clamp(42px,5.8vw,78px)] font-black leading-[1.04] tracking-[-.07em]">{h.title}<br/><span className="zlg-iridescent font-serif italic font-normal tracking-[-.06em]">{h.emphasis}</span></h1>
     <p className="mt-5 max-w-[720px] text-[15px] leading-[1.9] text-[#b3ccd0] sm:text-[16px]">{h.description}</p>
    </div>
    <div className="hidden min-w-[175px] rounded-[25px] border border-teal-200/15 bg-gradient-to-br from-[#22495a]/70 to-[#142c38] p-6 text-right shadow-[0_15px_50px_rgba(0,0,0,.23)] md:block">
      <GalleryIcon name="sparkles" size={32} className="ml-auto mb-6 text-teal-200"/>
      <span className="block text-[10px] font-black tracking-[.25em] text-teal-200/80">EXPLORE · LEARN · GROW</span>
      <strong className="mt-2 block text-xl tracking-tight">Your pace.<br/>Your space.</strong>
    </div>
   </header>

   <section className="mt-13" aria-labelledby="zlg-featured-title">
    <div className="mb-4 flex items-end justify-between gap-3"><div><span className="text-[11px] font-black uppercase tracking-[.2em] text-teal-200">Curated for you</span><h2 id="zlg-featured-title" className="mt-1 text-2xl font-black tracking-tight sm:text-[30px]">Featured awareness</h2></div><span className="text-xs text-[#94b6bc]">Swipe to explore <span aria-hidden="true">→</span></span></div>
    <div className="zlg-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
     {featured.map(p=><button type="button" key={p.id} onClick={()=>setActive(p)} className="zlg-feature-card group relative min-h-[230px] w-[285px] shrink-0 snap-start overflow-hidden rounded-[22px] border border-white/14 text-left shadow-[0_14px_30px_rgba(1,13,21,.33)] transition duration-300 hover:-translate-y-1 hover:border-white/35 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal-200 sm:h-[260px] sm:w-[365px]">
       <img src={src(p.image)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.045]"/>
       <div className="absolute inset-0 bg-gradient-to-t from-[#071521]/95 via-[#071521]/35 to-transparent"/>
       <div className="absolute inset-x-5 bottom-5"><span className="inline-flex rounded-full border border-white/25 bg-black/20 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[.13em] text-white backdrop-blur">{categoryMeta[p.category].name}</span><h3 className="mt-2 text-xl font-black leading-snug tracking-tight text-white sm:text-[23px]">{p.title}</h3><span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-teal-100">Open story <GalleryIcon name="arrow" size={15}/></span></div>
       <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/35 bg-black/25 backdrop-blur"><GalleryIcon name="arrow" size={17}/></span>
      </button>)}
    </div>
   </section>

   <section className="mt-15" aria-labelledby="zlg-library-title">
    <div className="flex flex-wrap items-end justify-between gap-5">
     <div><span className="text-[11px] font-black uppercase tracking-[.2em] text-teal-200">Knowledge, without judgment</span><h2 id="zlg-library-title" className="mt-1 text-3xl font-black tracking-[-.05em] sm:text-[38px]">{h.library}<span className="ml-2 text-teal-200">.</span></h2></div>
     <label className="flex min-h-12 w-full max-w-[385px] items-center gap-3 rounded-[15px] border border-white/17 bg-white/7 px-4 transition focus-within:border-teal-300/80 focus-within:ring-2 focus-within:ring-teal-300/25 sm:w-[360px]">
      <GalleryIcon name="search" size={19} className="shrink-0 text-teal-200"/>
      <span className="sr-only">Search awareness posts</span>
      <input type="search" autoComplete="off" value={query} onChange={e=>setQuery(e.target.value)} placeholder={t("Search topics or stories…")} className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm text-white outline-none placeholder:text-[#8eacb4]" />
     </label>
    </div>
    <div className="mt-5 flex flex-wrap items-center gap-2.5 border-b border-white/12 pb-5" aria-label="Content type">
      <span className="mr-1 flex items-center gap-2 text-xs font-bold text-[#a9c5c8]"><GalleryIcon name="filter" size={17}/> View</span>
      {(["all","poster","story"] as const).map(kind=><button type="button" key={kind} onClick={()=>setSelectedKind(kind)} aria-pressed={selectedKind===kind} className={`${filterButton} ${selectedKind===kind?"border-teal-300/60 bg-teal-300 text-[#092e34]":"border-white/17 bg-white/5 text-[#bed3d6] hover:border-white/40 hover:bg-white/10"}`}>{kind==="all"?h.all:kind==="poster"?h.posters:h.stories}</button>)}
      <span className="ml-auto text-xs font-semibold text-[#a8bcc4]">{results.length} {results.length===1?"post":"posts"}</span>
    </div>
    <div className="zlg-scroll mt-4 flex gap-2.5 overflow-x-auto pb-2" aria-label="Filter by topic">
      {topics.map(topic=>{
        const meta=topic!=="all"?categoryMeta[topic]:null;
        return <button key={topic} type="button" aria-pressed={selectedTopic===topic} onClick={()=>setSelectedTopic(topic)} className={`${filterButton} ${selectedTopic===topic?"border-white/55 bg-[#dffdf2] text-[#072b35] shadow-[0_6px_28px_rgba(81,228,184,.15)]":"border-white/13 bg-[#16313f] text-[#b9d6d5] hover:border-white/35 hover:bg-[#214354]"}`}>
          <span className="text-base" aria-hidden="true">{meta?.icon??"✦"}</span>{meta?.name??h.all}
        </button>;
      })}
    </div>

    {results.length ? <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
       {results.map((p,i)=><article key={p.id} className="zlg-card group relative flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-white/12 bg-[#112f3c]/90 shadow-[0_15px_45px_rgba(0,0,0,.14)] transition duration-300 hover:-translate-y-1 hover:border-teal-200/35 hover:shadow-[0_22px_55px_rgba(0,0,0,.28)]" style={{animationDelay:`${Math.min(i,8)*40}ms`}}>
        <button type="button" onClick={()=>setActive(p)} className="relative block aspect-[4/3] w-full overflow-hidden bg-[#193745] text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-200" aria-label={`Open ${p.title}`}>
         <img src={src(p.image)} alt={p.imageAlt} loading="lazy" className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.065]" />
         <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#0d2230]/75 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.12em] text-white backdrop-blur">{p.kind==="poster"?"POSTER":"STORY"}</span>
         <span className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full border border-white/30 bg-[#061c28]/80 text-teal-100 backdrop-blur"><GalleryIcon name="arrow" size={17}/></span>
        </button>
        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
         <div className="flex items-center justify-between gap-2"><span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black ring-1 ${categoryMeta[p.category].badge}`}>{categoryMeta[p.category].name}</span><span className="text-[11px] font-semibold text-[#97b5ba]">{p.readMinutes} min read</span></div>
         <h3 className="mt-4 text-[20px] font-extrabold leading-snug tracking-[-.035em] text-white">{p.title}</h3>
         <p className="mt-2 line-clamp-3 text-[13px] leading-[1.8] text-[#aac5c8]">{p.excerpt}</p>
         <div className="mt-auto flex items-center justify-between gap-3 pt-5"><button type="button" onClick={()=>setActive(p)} className="inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-[#aaf4da] transition hover:text-white focus-visible:outline-2 focus-visible:outline-teal-200">Read more <GalleryIcon name="arrow" size={17}/></button><button type="button" aria-label={saved.includes(p.id)?`Remove ${p.title} from saved`:`Save ${p.title} for this visit`} aria-pressed={saved.includes(p.id)} onClick={()=>toggleSaved(p.id)} className={`grid size-11 place-items-center rounded-xl border transition focus-visible:outline-2 focus-visible:outline-teal-200 ${saved.includes(p.id)?"border-teal-300/65 bg-teal-200/15 text-teal-200":"border-white/15 bg-white/5 text-[#bdd7d9] hover:border-teal-300/60"}`}><GalleryIcon name={saved.includes(p.id)?"check":"bookmark"} size={18}/></button></div>
        </div>
       </article>)}
     </div> : <div className="mt-8 rounded-[22px] border border-white/15 bg-[#133441] px-6 py-14 text-center"><GalleryIcon name="search" size={34} className="mx-auto text-teal-200"/><h3 className="mt-3 text-xl font-black">Nothing matches just yet.</h3><p className="mt-2 text-sm text-[#b7cfd0]">Try a broader search or another topic.</p><button onClick={reset} className="mt-5 min-h-11 rounded-xl bg-teal-200 px-5 text-sm font-extrabold text-[#062e36]">Show all posts</button></div>}
   </section>

   <section className="mt-20" aria-labelledby="zlg-resources-title">
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><span className="text-[11px] font-black uppercase tracking-[.2em] text-teal-200">Zimbabwe · Independent information</span><h2 id="zlg-resources-title" className="mt-2 text-[29px] font-black tracking-[-.05em] sm:text-[37px]">Real places. Real people<span className="text-emerald-300">.</span></h2><p className="mt-2 max-w-[740px] text-sm leading-7 text-[#aec8cc]">Public organizations you can research or contact yourself. Listed for awareness only—not Zim Safe Minds partners, emergency contacts or guaranteed appointments.</p></div></div>
    <div className="grid gap-4 lg:grid-cols-3">{trustedResources.map((r,i)=><article key={r.id} className="rounded-[21px] border border-white/13 bg-gradient-to-br from-[#183b49] to-[#112936] p-5 transition hover:border-teal-300/35">
       <div className="flex items-center gap-3"><span className={`grid size-12 shrink-0 place-items-center rounded-2xl border border-white/12 text-lg font-black ${i===0?"bg-teal-300/18 text-teal-200":i===1?"bg-rose-300/15 text-rose-200":"bg-blue-300/15 text-blue-200"}`}>{r.initials}</span><div><span className="block text-[10px] font-bold uppercase tracking-[.14em] text-[#8eb2b8]">{r.focus}</span><h3 className="mt-0.5 text-base font-extrabold leading-snug">{r.name}</h3></div></div>
       <p className="mt-4 min-h-[63px] text-[12px] leading-[1.75] text-[#b7ced0]">{r.description}</p>
       <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-[12px] leading-5 text-[#d2e4e5]"><p className="flex items-start gap-2"><GalleryIcon name="location" size={16} className="mt-0.5 shrink-0 text-teal-200"/>{r.address}</p>{r.phone&&<a className="flex items-start gap-2 hover:text-white hover:underline" href={`tel:${r.phone.replace(/[^+\d]/g,"")}`}><GalleryIcon name="phone" size={16} className="mt-0.5 shrink-0 text-teal-200"/>{r.phone}</a>}{r.email&&<a className="flex items-start gap-2 break-all hover:text-white hover:underline" href={`mailto:${r.email}`}><GalleryIcon name="mail" size={16} className="mt-0.5 shrink-0 text-teal-200"/>{r.email}</a>}</div>
       <a href={r.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-teal-200/20 bg-teal-200/12 text-sm font-extrabold text-teal-100 transition hover:bg-teal-200 hover:text-[#12343a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-200">Visit official website <GalleryIcon name="external" size={17}/></a>
       <p className="mt-3 text-[10px] leading-4 text-[#91abb2]">{r.note}</p>
      </article>)}</div>
   </section>

   <section className="mt-18 flex flex-col gap-5 rounded-[25px] border border-emerald-200/20 bg-[radial-gradient(ellipse_at_top_right,rgba(64,202,163,.20),transparent_60%),linear-gradient(120deg,#193e49,#14313a)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
    <div><span className="text-[10px] font-black uppercase tracking-[.22em] text-emerald-200">You don't have to work it out alone</span><h2 className="mt-2 text-[28px] font-black tracking-tight sm:text-[34px]">A little knowledge. A real next step.</h2><p className="mt-2 max-w-[640px] text-sm leading-7 text-[#c0d7d8]">Talk is a scripted reflection demo; Connect helps you prepare to approach support on your terms.</p></div>
    <div className="flex shrink-0 flex-wrap gap-2.5"><button type="button" onClick={onTalk} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 text-sm font-bold transition hover:bg-white/20">Try Talk <GalleryIcon name="heart" size={17}/></button><button type="button" onClick={onConnect} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#b4ffe2] px-5 text-sm font-extrabold text-[#0c3440] transition hover:bg-white">{h.help} <GalleryIcon name="arrow" size={17}/></button></div>
   </section>
   <p className="mt-6 text-center text-xs leading-6 text-[#93b4b9]">Original demo artwork · Informational content requires expert review before clinical use · {locale!=="en"?"Detailed health articles are currently in English pending Shona/Ndebele professional translation. · ":""}In urgent danger, seek local emergency medical care.</p>
  </div>
  {active&&<LearnPostModal key={active.id} post={active} onClose={close} onConnect={navigateToConnect} isSaved={saved.includes(active.id)} onToggleSaved={toggleSaved} pictureSrc={src}/>}
 </section>;
}
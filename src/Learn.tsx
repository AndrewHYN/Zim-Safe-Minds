import { useState, useEffect } from "react";
import { t, type Locale } from "./copy";
import { posts, categories, filterPosts } from "./lib/learnContent.mjs";
type Post = (typeof posts)[number];
type LearnProps = { onTalk:()=>void; onConnect:()=>void; locale:Locale };
export default function Learn({onTalk,onConnect,locale}:LearnProps){
 const [category,setCategory]=useState("All");
 const [query,setQuery]=useState("");
 const [active,setActive]=useState<Post|null>(null);
 const [saved,setSaved]=useState<string[]>([]);
 useEffect(()=>{
   if(!active)return;
   const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setActive(null);};
   window.addEventListener("keydown",onKey);
   return ()=>window.removeEventListener("keydown",onKey);
 },[active]);
 const results=filterPosts(query,category);
 const featured=posts[0];
 function toggle(id:string){setSaved(current=>current.includes(id)?current.filter(x=>x!==id):[...current,id]);}
 return <section className="learn-page">
  <div className="layout learn-intro">
   <div><div className="section-label"><span className="section-dot"/> EXPLORE / MENTAL WELLBEING</div>
    <h1>{locale==="sn"?"Mashoko anopa":locale==="nd"?"Amazwi asinika":"Words that"} <em>{locale==="sn"?"tariro":locale==="nd"?"ithemba":"make room"}</em> {locale==="sn"?"kumangwana.":locale==="nd"?"lokusa.":"for better days."}</h1>
    <p>{locale==="sn"?"Ruzivo rwuri nyore nezveutano hwepfungwa, rwunobva kune dzimwe nzvimbo dzakavimbika. Zvimwe zvinyorwa zvichiri muChirungu.":locale==="nd"?"Ulwazi olulula mayelana lempilakahle yengqondo, oluvela emithonjeni ethembekileyo. Ezinye izihloko ziseseNgisi.":"No doomscrolling. No diagnoses. Just approachable mental-health awareness, original reflections, and trustworthy places to learn more."}</p>
   </div>
   <div className="learn-stamp"><span className="stamp-mark">✳</span><strong>YOUR SPACE TO GROW</strong><small>Carefully written awareness content · Preview</small></div>
  </div>
  <div className="layout">
   <div className="learn-feature">
    <div className="learn-feature-art"><span>WELLBEING / 001</span><div className="feature-petal">✳</div><strong>A little kindness goes a long way.</strong><small>ONE STEP AT A TIME</small></div>
    <div className="learn-feature-copy"><span className="section-label">FEATURED STORY · 3 MIN READ</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><button className="button button-dark" onClick={()=>setActive(featured)}>Read the story <span aria-hidden="true">↗</span></button></div>
   </div>
   <div className="learn-toolbar"><div><span className="section-label">THE LIBRARY</span><h2>{t(locale,"learnTitle")}</h2></div><label className="learn-search"><span aria-hidden="true">⌕</span><span className="sr-only">Search awareness articles</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the library…"/></label></div>
   <div className="learn-filters" aria-label="Filter topics">{categories.map(c=><button key={c} aria-pressed={category===c} className={category===c?"filter-active":""} onClick={()=>setCategory(c)}>{c}</button>)}</div>
   <div className="learn-grid">
    {results.map(post=><article className="learn-card" key={post.id}>
      <button className={"learn-poster poster-"+post.theme} onClick={()=>setActive(post)} aria-label={"Read "+post.title}>
       <span className="poster-top"><span>SAFE MINDS / EDITION 01</span><span>↗</span></span>
       <span className="poster-symbol" aria-hidden="true">{post.symbol}</span>
       <strong>{post.poster}</strong><small>MENTAL WELLBEING MATTERS</small>
      </button>
      <div className="learn-card-body"><span className="learn-meta">{post.category.toUpperCase()} <span>·</span> {post.read.toUpperCase()}</span>
       <h3>{post.title}</h3><p>{post.excerpt}</p>
       <div className="learn-card-actions"><button className="text-link" onClick={()=>setActive(post)}>Read more ↗</button><button className={"save-post "+(saved.includes(post.id)?"is-saved":"")} onClick={()=>toggle(post.id)} aria-pressed={saved.includes(post.id)} aria-label={saved.includes(post.id)?"Remove saved article":"Save article for this visit"}>{saved.includes(post.id)?"♥ Saved":"♡ Save"}</button></div>
      </div>
     </article>)}
   </div>
   {results.length===0&&<div className="learn-empty"><h3>No matches just yet.</h3><p>Try a different topic or clear your search.</p><button className="button button-outline" onClick={()=>{setCategory("All");setQuery("");}}>Show everything</button></div>}
   <div className="learn-more-panel"><div><span className="section-label">WHEN READING ISN'T ENOUGH</span><h2>You can take the next step.</h2><p>Reach out for a conversation or explore available care information when you're ready.</p></div><div><button className="button button-dark" onClick={onTalk}>Try guided reflection ↗</button><button className="button button-outline" onClick={onConnect}>Find real support ↗</button></div></div>
   <p className="learn-editorial-note">Editorial awareness content, not personal medical advice or a live news feed. Articles link to independent sources; no clinician review or partnership is claimed. Saved items last only while this page is open.</p>
  </div>
  {active&&<div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setActive(null);}}>
    <article className="modal-dialog learn-article-modal" role="dialog" aria-modal="true" aria-labelledby="article-title">
      <button className="article-close" autoFocus onClick={()=>setActive(null)} aria-label="Close article">×</button>
      <span className="section-label">{active.eyebrow} · {active.read}</span><h2 id="article-title">{active.title}</h2>
      <p className="article-deck">{active.excerpt}</p>{active.paragraphs.map((p,i)=><p key={i}>{p}</p>)}
      <a className="article-source" href={active.sourceUrl} target="_blank" rel="noopener noreferrer">Explore the source: {active.sourceLabel} ↗</a>
      <div className="article-footer"><button className="button button-outline" onClick={()=>setActive(null)}>Back to Learn</button><button className="button button-dark" onClick={()=>{setActive(null);onConnect();}}>Explore support ↗</button></div>
    </article>
   </div>}
 </section>;
}

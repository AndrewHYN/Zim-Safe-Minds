import { useEffect, useRef } from "react";
import type { LearnPost } from "../data/learnData";
import { categoryMeta } from "../data/learnData";
import { GalleryIcon } from "./GalleryIcon";

type Props = {
  post: LearnPost;
  onClose: () => void;
  onConnect: () => void;
  isSaved: boolean;
  onToggleSaved: (id: string) => void;
  pictureSrc: (path: string) => string;
};

/** Accessible dialog: Escape, focus containment, scroll lock and focus restoration. */
export default function LearnPostModal({post,onClose,onConnect,isSaved,onToggleSaved,pictureSrc}:Props){
 const panel = useRef<HTMLDivElement>(null);
 const closeRef = useRef<HTMLButtonElement>(null);
 useEffect(()=>{
  const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  closeRef.current?.focus();
  const onKey = (event:KeyboardEvent)=>{
    if(event.key==="Escape"){event.preventDefault();onClose();return;}
    if(event.key!=="Tab" || !panel.current)return;
    const items = [...panel.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')];
    if(!items.length)return;
    const first=items[0],last=items[items.length-1];
    if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
  };
  document.addEventListener("keydown",onKey);
  return ()=>{document.body.style.overflow=previousOverflow;document.removeEventListener("keydown",onKey);previous?.focus();};
 },[onClose]);
 const category=categoryMeta[post.category];
 return <div className="zlg-modal-screen fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#020e16]/85 px-3 py-5 backdrop-blur-lg sm:px-5" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
  <article ref={panel} role="dialog" aria-modal="true" aria-labelledby="zlg-post-title" aria-describedby="zlg-post-deck" className="zlg-dialog relative my-auto grid max-h-[min(92vh,950px)] w-full max-w-[1040px] overflow-hidden rounded-[25px] border border-white/15 bg-[#102b38] text-[#eefcf9] shadow-[0_32px_130px_rgba(0,0,0,.65)] md:grid-cols-[minmax(0,0.83fr)_minmax(0,1.17fr)]">
   <button type="button" ref={closeRef} onClick={onClose} className="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full border border-white/20 bg-[#061a27]/85 text-white transition hover:bg-[#254654] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-200" aria-label="Close article"><GalleryIcon name="close" size={20}/></button>
   <div className="relative hidden min-h-[580px] overflow-hidden bg-[#132c3b] md:block">
    <img src={pictureSrc(post.image)} alt={post.imageAlt} className="h-full w-full object-cover" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071722]/85 to-transparent p-7 pt-24"><div className="text-[11px] font-extrabold uppercase tracking-[.24em] text-teal-100/80">ZIM SAFE MINDS / THE LEARN EDITION</div></div>
   </div>
   <div className="zlg-modal-content overflow-y-auto overscroll-contain px-5 pb-7 pt-19 sm:px-9 sm:pb-10 sm:pt-12 md:max-h-[min(92vh,950px)]">
    <div className="flex flex-wrap items-center gap-2.5">
      <span className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold ring-1 ${category.badge}`}>{category.name}</span>
      <span className="text-xs font-semibold text-[#a8c4c8]">{post.kind==="story"?"Fictional short story":"Awareness poster"} · {post.readMinutes} min read</span>
    </div>
    <img src={pictureSrc(post.image)} alt={post.imageAlt} className="mt-4 max-h-[340px] w-full rounded-2xl object-cover object-center md:hidden" />
    <h2 id="zlg-post-title" className="mt-6 text-[clamp(28px,3.5vw,46px)] font-black leading-[1.1] tracking-[-.05em]">{post.title}</h2>
    <p id="zlg-post-deck" className="mt-3 text-base leading-7 text-[#c2dadd]">{post.excerpt}</p>
    <div className="mt-6 h-px bg-white/12" />
    <div className="mt-5 space-y-4 text-[14px] leading-[1.85] text-[#e0eded]">{post.paragraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}</div>
    <div className="mt-7 rounded-2xl border border-emerald-300/20 bg-emerald-300/8 p-5">
      <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[.14em] text-emerald-200"><GalleryIcon name="sparkles" size={15}/> Takeaway</span>
      <p className="mt-2 text-[14px] leading-7 text-[#e1f6ee]">{post.takeaway}</p>
    </div>
    <div className="mt-6 space-y-2 border-t border-white/12 pt-5 text-[12px] leading-5 text-[#b9cdd0]">
      <p>Educational preview only · Not medical advice, a diagnosis or a crisis service.</p>
      <a href={post.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-teal-200 underline decoration-teal-300/40 underline-offset-4 transition hover:text-white">Further reading: {post.source.label} <GalleryIcon name="external" size={14}/></a>
    </div>
    <div className="mt-6 flex flex-wrap gap-2.5">
      <button type="button" onClick={()=>onToggleSaved(post.id)} aria-pressed={isSaved} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/6 px-4 text-sm font-bold text-white transition hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-teal-200"><GalleryIcon name={isSaved?"check":"bookmark"} size={17}/>{isSaved?"Saved for this visit":"Save for this visit"}</button>
      <button type="button" onClick={onConnect} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#a2f4d9] px-5 text-sm font-extrabold text-[#0b2e34] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-teal-200">Find support <GalleryIcon name="arrow" size={17}/></button>
    </div>
   </div>
  </article>
 </div>;
}
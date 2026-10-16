import type {SVGProps,ReactNode} from "react";
export type GalleryIconName="search"|"arrow"|"close"|"bookmark"|"check"|"location"|"phone"|"mail"|"book"|"heart"|"shield"|"filter"|"sparkles"|"external"|"chevron";
const icons:Record<GalleryIconName,ReactNode>={
search:<><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></>,arrow:<path d="M5 12h14m-6-6 6 6-6 6"/>,close:<path d="M18 6 6 18M6 6l12 12"/>,
bookmark:<path d="M6 4h12v17l-6-4-6 4V4Z"/>,check:<path d="m5 12 4 4L19 6"/>,
location:<><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></>,
phone:<path d="M22 16.5v3a2 2 0 0 1-2.2 2 19 19 0 0 1-17.3-17.3A2 2 0 0 1 4.5 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L7.9 10a16 16 0 0 0 6.1 6.1l1.5-1.5a2 2 0 0 0 1.8-.6l3 .5a2 2 0 0 1 1.7 2Z"/>,
mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
book:<><path d="M3 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16l-2-1H5a2 2 0 0 0-2 1V5Zm18 0a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v16l2-1h6a2 2 0 0 1 2 1V5Z"/></>,
heart:<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
shield:<><path d="m12 2 8 4v5c0 6-3.5 9.5-8 11-4.5-1.5-8-5-8-11V6l8-4Z"/><path d="m9 12 2 2 4-4"/></>,filter:<path d="M4 7h16M7 12h10m-7 5h4"/>,
sparkles:<><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/></>,
external:<><path d="M14 4h6v6m0-6-9 9"/><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/></>,
chevron:<path d="m9 18 6-6-6-6"/>
};export function GalleryIcon({name,size=18,...props}:{name:GalleryIconName;size?:number}&SVGProps<SVGSVGElement>){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{icons[name]}</svg>}

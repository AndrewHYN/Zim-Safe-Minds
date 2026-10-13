/**
 * Reproducible Zim Safe Minds HackLab 2026 pitch deck.
 * Run: npm install --no-save pptxgenjs && node tools/generate-hacklab-pitch.mjs
 * Contains no invented team identities, clinician endorsements or patient outcomes.
 */
import pptxgen from 'pptxgenjs';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dest = path.join(projectRoot, 'docs/presentation');
fs.mkdirSync(dest, {recursive:true});
const icon = path.join(projectRoot, 'public/brand/zim-safe-minds-mark.webp');
const word = path.join(projectRoot, 'public/brand/zim-safe-minds-wordmark.webp');
if (!fs.existsSync(icon) || !fs.existsSync(word)) throw new Error('Brand assets missing; see public/brand');

const pptx = new pptxgen();
pptx.layout='LAYOUT_WIDE';
pptx.author='Zim Safe Minds project team';
pptx.subject='Zimbabwe Youth Innovation HackLab 2026 pitch: Category 1';
pptx.title='Zim Safe Minds — A safe space to talk. A path to real support.';
pptx.company='Zim Safe Minds';
pptx.lang='en-ZW';
pptx.theme={headFontFace:'Inter Display',bodyFontFace:'Inter',lang:'en-US'};

const C={navy:'091A24', deep:'102A35', blue:'153B47', raised:'183744', border:'305363', mint:'9DEDD5', jade:'58DABB', teal:'30AFA9', white:'F3FCF9', pale:'D9F4EB', gray:'A2BEBE', muted:'7B9CA3', warm:'F0D8AE', coral:'FFBDA8', light:'E9F7F1', ink:'153E49'};
const S=pptx.ShapeType;
const SW=13.333,SH=7.5;
function txt(sl,text,x,y,w,h,opts={}){sl.addText(text,{x,y,w,h,fontFace:'Inter',fontSize:16,color:C.white,margin:0,breakLine:false,fit:'shrink',...opts});}
function rect(sl,x,y,w,h,fill,line=fill,radius=0){sl.addShape(radius?S.roundRect:S.rect,{x,y,w,h,rectRadius:radius,fill:{color:fill},line:{color:line,transparency:line===fill?100:0,width:1},radius});}
function line(sl,x1,y1,x2,y2,color=C.border,width=1,trans=0){sl.addShape(S.line,{x:x1,y:y1,w:x2-x1,h:y2-y1,line:{color,width,transparency:trans}});}
function oval(sl,x,y,w,h,lineColor=C.jade,trans=45,width=1){sl.addShape(S.ellipse,{x,y,w,h,line:{color:lineColor,width,transparency:trans},fill:{color:C.deep,transparency:100}});}
function base(section,num){const sl=pptx.addSlide();sl.background={color:C.navy};
  sl.addShape(S.rect,{x:0,y:0,w:SW,h:.06,line:{color:C.jade,transparency:100},fill:{color:C.jade}});
  txt(sl,'ZIM SAFE MINDS',.65,.34,3,.28,{fontSize:10.4,bold:true,charSpacing:3,color:C.mint});
  txt(sl,section.toUpperCase(),10,.34,2.65,.28,{fontSize:9.6,charSpacing:1.8,color:C.gray,align:'right'});
  line(sl,.65,7.06,12.68,7.06,C.border,.8);
  txt(sl,'HACKLAB 2026  /  CATEGORY 01',.65,7.17,6,.18,{fontSize:8.8,charSpacing:1.2,color:C.muted});
  txt(sl,String(num).padStart(2,'0')+'  /  11',11.5,7.17,1.18,.18,{fontSize:8.8,color:C.gray,align:'right'});
  return sl;
}
function pill(sl,s,x,y,w,color=C.jade){rect(sl,x,y,w,.36,C.blue,C.border,.1);txt(sl,s,x+.13,y+.095,w-.26,.13,{fontSize:9.1,bold:true,color});}
function dot(sl,x,y,r,color=C.jade){sl.addShape(S.ellipse,{x,y,w:r,h:r,line:{transparency:100},fill:{color}});}
function headed(sl,kicker,title,desc){txt(sl,kicker.toUpperCase(),.76,.91,11,.26,{fontSize:11.5,color:C.jade,charSpacing:2,bold:true});txt(sl,title,.74,1.33,11.8,1.25,{fontSize:41,bold:true,breakLine:false,lineSpacingMultiple:1.08});if(desc)txt(sl,desc,.76,2.77,11.7,.62,{fontSize:15.2,color:C.gray,breakLine:false});}
function card(sl,x,y,w,h,head,body,n,accent=C.jade){rect(sl,x,y,w,h,C.deep,C.border,.12);txt(sl,n,x+.24,y+.2,.45,.3,{fontSize:12.4,color:accent,bold:true});txt(sl,head,x+.25,y+.83,w-.5,.48,{fontSize:21.5,bold:true});txt(sl,body,x+.25,y+1.42,w-.5,h-1.6,{fontSize:13.8,color:C.gray});}
function notes(sl,...paragraphs){sl.addNotes(paragraphs.map(p=>'• '+p));}
function logo(sl,x,y,w=1.4){sl.addImage({path:icon,x,y,w,h:w});}
function miniWindow(sl,x,y,w,h,kind){
 rect(sl,x,y,w,h,'ECF8F5','A4D9D0',.11);
 rect(sl,x,y,w,.37,'D0E9E3','D0E9E3',.08);
 dot(sl,x+.17,y+.12,.075,'65B6B0');dot(sl,x+.29,y+.12,.075,'65B6B0');
 txt(sl,kind,x+.13,y+.52,w-.26,.25,{fontSize:12,bold:true,color:C.ink});
 if(kind==='TALK'){
  rect(sl,x+.13,y+.97,w*.70,.65,'FFFFFF','D5E8E3',.1);txt(sl,'What is on your mind?',x+.25,y+1.15,w*.56,.24,{fontSize:9.5,color:C.ink});
  rect(sl,x+w*.31,y+1.73,w*.56,.50,'147281','147281',.08);txt(sl,'A little stressed.',x+w*.38,y+1.89,w*.43,.14,{fontSize:9,color:'FFFFFF'});
  rect(sl,x+.13,y+h-.66,w-.26,.40,'FFFFFF','B4D7CE',.05);txt(sl,'Start a conversation...',x+.25,y+h-.55,w-.55,.13,{fontSize:9.3,color:'62838A'});
 }else if(kind==='LEARN'){
  rect(sl,x+.15,y+.99,w*.38,1.12,'B9DECC','B9DECC',.08);txt(sl,'YOU ARE\nNOT ALONE',x+.24,y+1.25,w*.22,.5,{fontSize:14,color:C.blue,bold:true,breakLine:false});
  rect(sl,x+w*.56,y+.99,w*.30,1.12,'D1E7EF','D1E7EF',.08);txt(sl,'PAUSE\n& RESET',x+w*.62,y+1.3,w*.18,.5,{fontSize:13,color:C.ink,bold:true});
  txt(sl,'Read  ·  Learn  ·  Reflect',x+.15,y+h-.67,w-.30,.22,{fontSize:10,color:C.blue,bold:true});
 }else{
  ['Format: Online / in person','Cost: Free / affordable','Language: English / Shona'].forEach((s,i)=>{rect(sl,x+.15,y+1+i*.56,w-.3,.44,'FFFFFF','B4D7CE',.06);txt(sl,s,x+.26,y+1.14+i*.56,w-.5,.18,{fontSize:9.2,color:C.ink});});
  txt(sl,'You choose who to contact',x+.16,y+h-.46,w-.3,.20,{fontSize:9.1,bold:true,color:'21656D'});
 }
}
// 1 — title
{
 const sl=pptx.addSlide();sl.background={color:C.navy};
 for(let i=0;i<4;i++)oval(sl,7.1-i*.2,1.0-i*.3,5.7+i*.6,5.7+i*.6,i%2?C.mint:C.teal,78,1);
 sl.addShape(S.ellipse,{x:9.35,y:2.35,w:2.85,h:2.85,line:{transparency:100},fill:{color:C.teal,transparency:84}});
 logo(sl,8.78,1.25,3.9);
 pill(sl,'ZIMBABWE YOUTH INNOVATION HACKLAB 2026',.72,.67,4.0);
 txt(sl,'A safe space\nto talk.',.72,1.70,8.0,1.90,{fontSize:48,bold:true,color:C.white,breakLine:false});
 txt(sl,'A path to real support.',.76,3.78,8.1,.67,{fontSize:32,bold:true,color:C.mint});
 txt(sl,'TALK   •   LEARN   •   CONNECT',.78,5.20,5.4,.3,{fontSize:15,color:C.pale,bold:true,charSpacing:2.1});
 txt(sl,'Category 1  ·  Holistic Youth Health & Well-being',.78,6.76,8.6,.3,{fontSize:11.8,color:C.gray});
 notes(sl,'Open with a first-person question: What if asking for help felt like a first small step rather than a public confession?','Zim Safe Minds is an early prototype focused on helping Zimbabwean young adults move from uncertainty to verified human care.','This is a proposal seeking US$5,000 seed funding, not an existing medical service.');
}
// 2 — the problem
{
 const sl=base('the challenge',2);
 headed(sl,'01  /  The challenge','The hardest part can be asking for help.','We are testing three barriers that can stop a young person before they reach support.');
 card(sl,.78,3.62,3.78,2.54,'Stigma','Fear of being judged can make opening up feel unsafe.','01');
 card(sl,4.78,3.62,3.78,2.54,'Uncertainty','People may not know which service is credible, affordable or approachable.','02',C.teal);
 card(sl,8.78,3.62,3.78,2.54,'The first contact','Even finding the words to ask for a conversation can feel difficult.','03',C.warm);
 txt(sl,'Problem hypothesis — primary research and clinical consultation still to be completed.',.8,6.52,11.7,.28,{fontSize:10.1,color:C.gray,italic:true});
 notes(sl,'The root cause we target for Category 1 is stigma and other social, cultural and behavioural barriers to help-seeking.','We are not claiming to have completed a Zimbabwean prevalence study or interviews yet. These barriers are hypotheses we will research.');
}
// 3 — solution
{
 const sl=base('our approach',3);
 headed(sl,'02  /  One connected first step','Three simple spaces. One clear next step.','Users are never forced to chat with AI before exploring people and services.');
 const coords=[.78,4.80,8.82];
 const data=[['01  TALK','A softer place to start','Optional guided reflection and grounding. Scripted demo today.'],['02  LEARN','Knowledge without noise','Original awareness content and links to independent sources.'],['03  CONNECT','A path to real people','Choose care preferences, prepare a first message and explore services.']];
 data.forEach((d,i)=>{let x=coords[i];rect(sl,x,3.49,3.74,2.64,C.deep,C.border,.13);dot(sl,x+.3,3.81,.20,[C.mint,C.jade,C.warm][i]);txt(sl,d[0],x+.66,3.82,2.85,.26,{fontSize:11,color:C.mint,bold:true,charSpacing:.7});txt(sl,d[1],x+.30,4.40,3.10,.55,{fontSize:21,bold:true});txt(sl,d[2],x+.30,5.20,3.03,.72,{fontSize:12.4,color:C.gray});});
 txt(sl,'Choice and consent connect these spaces; no private chat is automatically shared.',.8,6.54,11.5,.28,{fontSize:11,color:C.mint});
 notes(sl,'Say Talk, Learn, Connect. Do not describe the current scripted conversation as GPT-powered AI.','A user can skip Talk and move immediately to Connect. The proposed innovation is reducing friction in the human care-seeking pathway.');
}
// 4 — product
{
 const sl=base('working prototype',4);
 txt(sl,'03  /  WHAT WE HAVE ACTUALLY BUILT',.77,.97,11,.26,{fontSize:11.5,color:C.jade,bold:true,charSpacing:1.6});
 txt(sl,'Working prototype, not just a concept.',.76,1.39,11.7,.69,{fontSize:34,bold:true});
 txt(sl,'These are simplified illustrations of features available in the live demo; not clinical functionality.',.78,2.31,11.7,.32,{fontSize:12.4,color:C.gray});
 [['TALK',.80],['LEARN',4.74],['CONNECT',8.69]].forEach(([k,x])=>{miniWindow(sl,x,2.94,3.85,3.20,k);});
 txt(sl,'OPEN THE LIVE DEMO  ↗',.82,6.49,5,.32,{fontSize:14.4,color:C.mint,bold:true,hyperlink:{url:'https://zim-safe-minds.vercel.app/'}});
 txt(sl,'zim-safe-minds.vercel.app',7.25,6.53,5.3,.25,{fontSize:11.5,color:C.pale,align:'right',hyperlink:{url:'https://zim-safe-minds.vercel.app/'}});
 notes(sl,'Live demo: https://zim-safe-minds.vercel.app/ — test connection before speaking.','Show the three tabs, consent gate, a generic scripted chat prompt, awareness article, then preference-based connect planner.','Actual screenshots can be added by the team after a fresh capture. These visuals are accurate simplified reconstructions, not proof of clinical integrations.');
}
// 5 — uniqueness
{
 const sl=base('why this is different',5);
 headed(sl,'04  /  Our distinction','Not an “AI therapist.” A bridge to human care.','Existing providers deliver meaningful services. We want to make approaching care less intimidating.');
 const items=[['Choice','A user can skip the conversation entirely and go straight to care information.'],['Privacy-first','No automatic transcript forwarding. A first-contact message is controlled by the user.'],['Human accountability','Verified provider introductions and live appointments require qualified partners and approval.']];
 items.forEach((it,i)=>{let y=3.45+i*.91;dot(sl,.89,y+.08,.19,C.jade);txt(sl,it[0],1.28,y,2.55,.32,{fontSize:17,bold:true});txt(sl,it[1],3.94,y,8.36,.52,{fontSize:13.8,color:C.gray});if(i<2)line(sl,1.22,y+.69,12.25,y+.69,C.border,.9);});
 rect(sl,.8,6.34,11.7,.43,C.blue,C.blue,.08);txt(sl,'Friendship Bench is an existing independent service, not a signed project partner.',.98,6.47,11.3,.18,{fontSize:10.5,color:C.pale});
 notes(sl,'Do not pretend Zimbabwe lacks counseling services. Friendship Bench is an important example of an existing independent service.','Our differentiator is a testable first-contact bridge with user choice and verified handoffs, not replacing professionals.');
}
// 6 — access and evidence
{
 const sl=base('who benefits',6);
 headed(sl,'05  /  Designed for access','Built for young people, on their terms.','Initial research focus: consenting adults aged 18–35 in Zimbabwe.');
 const access=[['LOW-DATA','Accessible on entry-level Android phones; low-bandwidth design is a pilot goal.'],['LANGUAGE','English, Shona and Ndebele preferences in the current navigator; clinical localization later.'],['INCLUSION','Gender-aware, disability-aware and affordability-aware research and testing.']];
 access.forEach((a,i)=>{let x=.83+i*4.01;rect(sl,x,3.51,3.75,1.67,C.deep,C.border,.08);txt(sl,a[0],x+.23,3.75,3.22,.25,{fontSize:13.3,bold:true,color:C.mint,charSpacing:.9});txt(sl,a[1],x+.23,4.21,3.22,.78,{fontSize:12.3,color:C.gray});});
 rect(sl,.82,5.57,11.71,.91,C.blue,C.border,.11);
 txt(sl,'PILOT GOALS, NOT CURRENT RESULTS',1.06,5.78,4.5,.24,{fontSize:11.2,color:C.pale,bold:true});
 txt(sl,'Up to 50 consenting adults   ·   Goal: 2 verified providers',5.36,5.76,6.85,.30,{fontSize:13.3,color:C.mint,bold:true,align:'right'});
 notes(sl,'These numbers are target outcomes for a future approved pilot, not current traction.','The research will also record unmet needs, failed navigation and accessibility concerns. No personal health histories should be collected during public demo testing.');
}
// 7 — road map
{
 const sl=base('delivery plan',7);
 headed(sl,'06  /  Feasibility','A careful 12-month pilot, not a rushed clinic.','Clinical oversight, privacy review and independent provider verification gate any real referral features.');
 const stages=[['MONTHS 1–2','Listen & learn','Youth interviews and professional consultations'],['MONTHS 3–4','Design safely','Clinical safeguarding, privacy and accessibility review'],['MONTHS 5–8','Build & pilot','Verify partners; controlled adult pilot only after approval'],['MONTHS 9–12','Evaluate & refine','Report outcomes, costs, harms, and scale/pivot decision']];
 stages.forEach((s,i)=>{let y=3.42+i*.79;dot(sl,.95,y+.11,.18,i===0?C.mint:C.teal);if(i<3)line(sl,1.04,y+.31,1.04,y+.95,C.border,2);txt(sl,s[0],1.40,y,2.16,.25,{fontSize:11.2,bold:true,color:C.mint});txt(sl,s[1],3.73,y,2.85,.3,{fontSize:17.1,bold:true});txt(sl,s[2],6.81,y,5.6,.49,{fontSize:12.5,color:C.gray});});
 txt(sl,'No live AI triage, diagnoses, or professional bookings are claimed today.',.90,6.82,11,.18,{fontSize:10.2,color:C.gray});
 notes(sl,'The $5,000 grant supports a small validation-and-safety-focused pilot, not production-grade medical AI.','Professional partnerships and referral operations are planned work; none are represented as signed today.');
}
// 8 — budget
{
 const sl=base('funding request',8);
 headed(sl,'07  /  The ask','US$5,000. Applied carefully.','Illustrative spending allocation across research, safeguarding, accessible engineering and evaluation.');
 const costs=[['Clinical co-design & safeguarding',1000],['Participant research & access',1000],['Accessible engineering',900],['Privacy & compliance',800],['Partner checks & outreach',750],['Monitoring & evaluation',500],['Contingency',50]];
 let y=3.31;const max=1000;
 costs.forEach(([name,amount],i)=>{const barx=5.96,barw=5.15;txt(sl,name,.90,y,4.84,.29,{fontSize:12.1,color:C.pale});rect(sl,barx,y+.04,barw,.16,C.blue,C.blue,.01);rect(sl,barx,y+.04,barw*amount/max,.16,i%2?C.teal:C.mint,i%2?C.teal:C.mint,.01);txt(sl,'$'+amount.toLocaleString('en-US'),11.28,y,1.12,.28,{fontSize:11.5,bold:true,align:'right'});y+=.45;});
 line(sl,.90,6.68,12.46,6.68,C.border,1);txt(sl,'TOTAL REQUEST',.91,6.80,5,.23,{fontSize:11,bold:true,color:C.mint});txt(sl,'$5,000',10.74,6.76,1.67,.31,{fontSize:17.4,bold:true,color:C.white,align:'right'});
 notes(sl,'Budget is a proposal; grant disbursements and expenses depend on approved milestones and eligible costs.','Note contingency $50; clinical co-design $1,000; privacy & legal $800; engineering $900; partner checks $750; participant research $1,000; monitoring $500. Total $5,000.');
}
// 9 — team
{
 const sl=base('team and close',9);
 txt(sl,'08  /  TEAM-LED INNOVATION',.79,.91,9,.25,{fontSize:11.3,bold:true,color:C.mint,charSpacing:1.6});
 txt(sl,'A working prototype.\nA team ready to shape what’s next.',.75,1.46,12,1.42,{fontSize:36.5,bold:true,breakLine:false});
 const cells=[['TEAM LEAD','To be confirmed by the team'],['TECHNICAL LEAD','Andrew Hama Mutamiri'],['RESEARCH & WELLBEING','Member to choose role'],['INCLUSION / OPERATIONS','Member to choose role']];
 cells.forEach((x,i)=>{const px=.81+(i%2)*6.05,py=3.43+Math.floor(i/2)*.99;rect(sl,px,py,5.67,.80,C.deep,C.border,.08);txt(sl,x[0],px+.22,py+.15,2.2,.18,{fontSize:10.2,color:C.mint,bold:true});txt(sl,x[1],px+.22,py+.43,5.15,.24,{fontSize:14,color:C.white,bold:true});});
 txt(sl,'Talk. Learn. Connect.  →  Real care.',.83,6.28,11.5,.40,{fontSize:23.5,bold:true,color:C.mint});
 notes(sl,'Do not fill names or roles until confirmed by your teammates. The existing four-person group is two women and two men, but exact names and responsibilities remain open.','Close with an ask: fund an ethical youth-led 12-month pilot to test whether an approachable digital path improves first contact with qualified providers.');
}
// 10 — backup demo
{
 const sl=base('backup: demo',10);
 headed(sl,'APPENDIX  /  Demo sequence','Three minutes. One believable story.','The host should have the live URL loaded, plus this deck available offline.');
 const phases=[['00:00–00:35','TALK','Show original Afterglow visuals; open consent-gated scripted chat.'],['00:35–01:15','LEARN','Search a topic, open an awareness card, show the source.'],['01:15–02:30','CONNECT','Select preferences and copy a sample first-contact inquiry.'],['02:30–03:00','CLOSE','Show independent service information; recap ethics and grant use.']];
 phases.forEach((p,i)=>{const y=3.30+i*.77;rect(sl,.80,y,11.77,.61,i%2?C.deep:C.blue,C.border,.06);txt(sl,p[0],1.03,y+.16,1.51,.26,{fontSize:11.4,bold:true,color:C.mint});txt(sl,p[1],2.74,y+.16,1.44,.26,{fontSize:13,bold:true});txt(sl,p[2],4.22,y+.16,8.04,.27,{fontSize:12.2,color:C.gray});});
 notes(sl,'If the site is unavailable, explain each feature using the reconstructed interfaces on slide 4.','Never enter real mental-health histories during a competition demonstration.');
}
// 11 — backup hard questions
{
 const sl=base('backup: judge Q&A',11);
 txt(sl,'APPENDIX  /  DIFFICULT QUESTIONS',.77,.93,11,.25,{fontSize:11.5,color:C.mint,bold:true,charSpacing:1.5});
 txt(sl,'Questions we should welcome.',.75,1.39,11.7,.71,{fontSize:36,bold:true});
 const qa=[['Is this ChatGPT for therapy?','No: the current conversation is scripted; any future AI requires clinical oversight and safety validation.'],['Why not just use Friendship Bench?','It is an independent existing service. We will test the first-contact navigation gap without duplicating care.'],['Do you have signed provider partners?','Not yet. Credential checks, agreements and approvals are explicit pilot milestones.'],['What does success look like?','Real opt-in contact with appropriate care; include drop-offs and safety incidents, not chatbot minutes.']];
 qa.forEach((q,i)=>{const y=2.69+i*.97;txt(sl,q[0],.91,y,5.05,.38,{fontSize:16.2,bold:true,color:C.white});txt(sl,q[1],5.69,y,6.65,.58,{fontSize:12.5,color:C.gray});if(i<3)line(sl,.9,y+.75,12.40,y+.75,C.border,.8);});
 notes(sl,'Keep answers plain and defensible. State unverified partnerships and AI integrations are planned, not delivered.','Avoid clinical outcomes without a legitimate study and avoid fabricated interview data.');
}
const out=path.join(dest,'Zim_Safe_Minds_HackLab_2026_Pitch.pptx');
await pptx.writeFile({fileName:out,compression:true});
console.log(`Wrote ${pptx._slides.length} slides -> ${out}`);
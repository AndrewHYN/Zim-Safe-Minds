(() => {
"use strict";
const $=id=>document.getElementById(id);
const modal=$("consentModal"), consent=$("consentCheck"), begin=$("beginBtn");
const input=$("message"), send=$("send"), form=$("chatForm"), log=$("chatstream"), prompts=$("prompts"), crisis=$("crisis");
const status=$("statusText"), model=$("modelState"), providerArea=$("providers");
let accepted=false,busy=false,history=[];
const introductory="Hey, I'm glad you're here. You don't need to have the right words. What's been on your mind lately?";
const contactCopy="Hello. I am looking for someone to talk to about my wellbeing. Could you please tell me what support is available and how I can get started? Thank you.";
function enable(){const good=accepted&&!busy;input.disabled=!good;send.disabled=!good;}
function append(role,text){
 const el=document.createElement("div");el.className="msg "+(role==="user"?"you":"bot");
 if(role!=="user"){const av=document.createElement("img");av.className="tinyavatar";av.src="/brand/zim-safe-minds-mark.webp";av.width=28;av.height=28;av.alt="";el.append(av);}
 const bubble=document.createElement("div");bubble.className="bubble";bubble.textContent=text;el.append(bubble);log.append(el);log.scrollTop=log.scrollHeight;
}
function showConnectionIssue(message,code){
 const panel=document.createElement("div");panel.className="service-error";panel.setAttribute("role","alert");
 const title=document.createElement("strong");title.textContent="AI connection issue — not a reply";
 const body=document.createElement("p");body.textContent=message;
 const technical=document.createElement("span");technical.className="error-code";technical.textContent="Diagnostic: "+(code||"UNKNOWN");
 const notice=document.createElement("small");notice.textContent="No AI response or doctor contact occurred. Your message is back in the text box so you can retry.";
 panel.append(title,body,technical,notice);log.append(panel);log.scrollTop=log.scrollHeight;
}
function reset(){
 history=[];crisis.classList.add("hidden");log.replaceChildren();
 const t=document.createElement("div");t.className="timestamp";t.textContent="TODAY · PRIVATE DEMONSTRATION";log.append(t);append("assistant",introductory);
 prompts.classList.remove("hidden");input.value="";
 status.textContent=accepted?"Conversation reset. Nothing was saved by this interface.":"Please read and accept the safety information first.";
 model.textContent="AI preview · No account or intentional transcript storage";enable();
}
async function sendMessage(message){
 const text=message.trim();if(!accepted||busy||!text)return;
 if(text.length>1200){status.textContent="Please limit your message to 1,200 characters.";return;}
 busy=true;enable();input.value="";prompts.classList.add("hidden");append("user",text);
 history.push({role:"user",content:text});status.textContent="Connecting to the AI…";
 const aborter=new AbortController();const timeout=setTimeout(()=>aborter.abort(),29000);
 try{
  const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({consented:true,messages:history.slice(-7)}),signal:aborter.signal});
  const data=await res.json().catch(()=>({error:"The server returned an invalid response.",code:"INVALID_SERVER_RESPONSE"}));
  if(!res.ok){
   if(history.at(-1)?.role==="user")history.pop();
   input.value=text;
   model.textContent="AI unavailable · No response generated";
   status.textContent="AI unavailable · "+(data.code||"UNKNOWN");
   showConnectionIssue(data.error||"The AI is temporarily unavailable.",data.code);
   return;
  }
  if(typeof data.reply!=="string"||!data.reply.trim())throw new Error("The server did not return a conversational reply.");
  append("assistant",data.reply);
  history.push({role:"assistant",content:data.reply.slice(0,1200)});
  if(data.risk==="urgent"||data.risk==="concern"){
   crisis.classList.remove("hidden");
   crisis.querySelector("strong").textContent=data.risk==="urgent"?"Let's focus on immediate safety":"You deserve real support, too";
  }
  model.textContent=data.mode==="live-ai"?"Live AI response · Not therapy":"Safety guidance · Not emergency monitoring";
  status.textContent="AI response received · No doctor was contacted.";
 }catch(_){
  if(history.at(-1)?.role==="user")history.pop();input.value=text;
  model.textContent="AI unavailable · No response generated";status.textContent="Network issue · No AI response";
  showConnectionIssue("The AI request couldn't be completed. Check your connection or ask the developer to inspect the deployment.","NETWORK_ERROR");
 }finally{clearTimeout(timeout);busy=false;enable();input.focus({preventScroll:true});}
}
consent.addEventListener("change",()=>{begin.disabled=!consent.checked;});
begin.addEventListener("click",()=>{
 if(!consent.checked)return;accepted=true;modal.classList.add("hidden");modal.setAttribute("aria-hidden","true");
 status.textContent="Ready when you are. Please avoid identifying details.";input.focus();enable();
});
form.addEventListener("submit",e=>{e.preventDefault();sendMessage(input.value);});
input.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();form.requestSubmit();}});
$("resetBtn").addEventListener("click",reset);
prompts.querySelectorAll("button[data-prompt]").forEach(b=>b.addEventListener("click",()=>{if(accepted&&!busy){input.value=b.dataset.prompt||"";input.focus();}}));
$("crisisSupport").addEventListener("click",()=>{$("support").scrollIntoView({behavior:"smooth",block:"start"});});
$("region").addEventListener("change",()=>{
 const area=$("region").selectedOptions[0].textContent;const line=$("regionNotice");
 if(line)line.textContent="Public online support shown for "+area+". Exact-distance matching is not available.";
});
$("copyBtn").addEventListener("click",async()=>{
 try{await navigator.clipboard.writeText(contactCopy);$("copyStatus").textContent="Message copied. You decide whether to send it.";}
 catch(_){$("copyStatus").textContent="Clipboard unavailable. Copy this yourself: "+contactCopy;}
});
function addProvider(p){
 const card=document.createElement("article");card.className="service";
 const label=document.createElement("div");label.className="servicetag";
 const tag=document.createElement("span");tag.textContent="PUBLIC · INDEPENDENT";
 const review=document.createElement("span");review.textContent="INFO REVIEWED "+String(p.reviewed||"—");
 label.append(tag,review);card.append(label);
 const title=document.createElement("strong");title.textContent=p.name;card.append(title);
 const details=document.createElement("p");details.textContent=p.service;card.append(details);
 const cost=document.createElement("p");cost.textContent=p.price;card.append(cost);
 const hours=document.createElement("p");hours.className="availability";hours.textContent=p.hours;card.append(hours);
 (p.channels||[]).forEach(c=>{
  try{const url=new URL(c.url);if(url.protocol!=="https:")return;
   const a=document.createElement("a");a.href=url.href;a.target="_blank";a.rel="noopener noreferrer";
   const txt=document.createElement("span");txt.textContent=c.label;
   const arrow=document.createElement("span");arrow.textContent="↗";a.append(txt,arrow);card.append(a);
  }catch(_){}
 });
 providerArea.append(card);
}
async function providers(){
 try{
  const res=await fetch("/api/providers",{method:"GET"});if(!res.ok)throw new Error("Unavailable");
  const data=await res.json();providerArea.replaceChildren();
  for(const p of data.providers||[])addProvider(p);
  if(!data.providers?.length)throw new Error("No providers");
 }catch(_){
  providerArea.replaceChildren();addProvider({
   name:"Friendship Bench Zimbabwe",service:"Independent psychosocial support in Zimbabwe. Confirm current details on their website.",
   price:"Provider-published free online sessions",hours:"Check official website for current opening times",
   reviewed:"PROVIDER WEBSITE",channels:[{label:"Official online-support page",url:"https://www.friendshipbenchzimbabwe.org/online"}]
  });
 }
 const note=document.createElement("p");note.id="regionNotice";note.className="availability";
 note.textContent="Public online support for Zimbabwe. Exact-distance matching is not available.";
 providerArea.append(note);
}
reset();providers();
})();

(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const modal=$("consentModal"), consent=$("consentCheck"), begin=$("beginBtn");
  const input=$("message"), send=$("send"), form=$("chatForm");
  const log=$("chatstream"), prompts=$("prompts"), crisis=$("crisis");
  const status=$("statusText"), model=$("modelState"), providerArea=$("providers");
  let accepted=false, busy=false, history=[];
  const introductory="Hey, I'm glad you're here. You don't need to have the right words. What's been on your mind lately?";
  const contactCopy="Hello. I am looking for someone to talk to about my wellbeing. Could you please tell me what support is available and how I can get started? Thank you.";
  function enable() {const good=accepted&&!busy;input.disabled=!good;send.disabled=!good;}
  function append(role,text) {
    const wrapper=document.createElement("div");
    wrapper.className="msg "+(role==="user"?"you":"bot");
    if (role!=="user") {
      const avatar=document.createElement("img");avatar.className="tinyavatar";avatar.src="/brand/zim-safe-minds-mark.webp";
      avatar.width=28;avatar.height=28;avatar.alt="";wrapper.append(avatar);
    }
    const bubble=document.createElement("div");bubble.className="bubble";
    bubble.textContent=text;wrapper.append(bubble);log.append(wrapper);
    log.scrollTop=log.scrollHeight;
  }
  function reset() {
    history=[];crisis.classList.add("hidden");
    log.replaceChildren();
    const t=document.createElement("div");t.className="timestamp";t.textContent="TODAY · PRIVATE DEMONSTRATION";
    log.append(t);append("assistant",introductory);
    prompts.classList.remove("hidden");
    input.value="";
    status.textContent=accepted?"Conversation reset. Messages were not saved by this interface.":"Please read and accept the safety information first.";
    model.textContent="AI preview · No account or intentional transcript storage";
    enable();
  }
  async function sendMessage(message) {
    const text=message.trim();
    if(!accepted||busy||!text)return;
    if(text.length>1200){status.textContent="Please limit your message to 1,200 characters.";return;}
    busy=true;enable();input.value="";prompts.classList.add("hidden");
    append("user",text);
    history.push({role:"user",content:text});
    status.textContent="Checking and preparing a response…";
    const aborter=new AbortController();const timeout=setTimeout(()=>aborter.abort(),29000);
    try {
      const res=await fetch("/api/chat",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({consented:true,messages:history.slice(-7)}),signal:aborter.signal
      });
      const data=await res.json().catch(()=>({error:"The server didn't return a valid response."}));
      if(!res.ok) {
        status.textContent=data.error||"AI service unavailable.";
        model.textContent="AI unavailable · Nobody has been contacted";
        if(data.help){append("assistant",data.help);}
        else append("assistant","The live AI isn't available right now. Please don't rely on this demo for urgent support. You can use the independent services shown beside the chat.");
        return;
      }
      if(typeof data.reply!=="string" || !data.reply.trim())throw new Error("Empty response");
      append("assistant",data.reply);
      history.push({role:"assistant",content:data.reply.slice(0,1200)});
      if(data.risk==="urgent"||data.risk==="concern") {
        crisis.classList.remove("hidden");
        if(data.risk==="concern") {
          crisis.querySelector("strong").textContent="You deserve real support, too";
        } else {
          crisis.querySelector("strong").textContent="Let's focus on immediate safety";
        }
      }
      model.textContent=data.mode==="live-ai"?"Live AI response · Not therapy":"Safety guidance · Not emergency monitoring";
      status.textContent="No human was contacted. Your next step is your choice.";
    } catch(err) {
      status.textContent="Connection unavailable. No safety review or human contact was completed.";
      append("assistant","Sorry, I couldn't complete the request. If you're in danger, please contact local emergency services or go to the nearest emergency department. You can also choose independent help from the resources here.");
    } finally {
      clearTimeout(timeout);busy=false;enable();input.focus({preventScroll:true});
    }
  }
  consent.addEventListener("change",()=>{begin.disabled=!consent.checked;});
  begin.addEventListener("click",()=>{
    if(!consent.checked)return;
    accepted=true;modal.classList.add("hidden");modal.setAttribute("aria-hidden","true");
    status.textContent="Ready when you are. Please avoid identifying details.";
    input.focus();enable();
  });
  form.addEventListener("submit",event=>{event.preventDefault();sendMessage(input.value);});
  input.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();form.requestSubmit();}});
  $("resetBtn").addEventListener("click",reset);
  prompts.querySelectorAll("button[data-prompt]").forEach(button=>{
    button.addEventListener("click",()=>{if(accepted&&!busy){input.value=button.dataset.prompt||"";input.focus();}});
  });
  $("crisisSupport").addEventListener("click",()=>{$("support").scrollIntoView({behavior:"smooth",block:"start"});});
  $("region").addEventListener("change",()=>{
    // Local-only selection; there is currently no postcode/GPS matching or local provider ranking.
    const name=$("region").selectedOptions[0].textContent;
    const line=$("regionNotice");
    if(line)line.textContent="Public online support shown for "+name+". Exact-distance matching is not yet available.";
  });
  $("copyBtn").addEventListener("click",async()=>{
    try {
      await navigator.clipboard.writeText(contactCopy);
      $("copyStatus").textContent="Message copied. You decide whether to send it.";
    }catch(_){
      $("copyStatus").textContent="Clipboard unavailable. Copy this yourself: "+contactCopy;
    }
  });
  function addProvider(p) {
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
      try {
        const url=new URL(c.url);
        if(!["https:"].includes(url.protocol))return;
        const a=document.createElement("a");a.href=url.href;a.target="_blank";a.rel="noopener noreferrer";
        const tx=document.createElement("span");tx.textContent=c.label;
        const arrow=document.createElement("span");arrow.textContent="↗";a.append(tx,arrow);card.append(a);
      }catch(_){}
    });
    providerArea.append(card);
  }
  async function providers(){
    try{
      const res=await fetch("/api/providers",{method:"GET"});
      if(!res.ok)throw new Error("Unavailable");
      const data=await res.json();
      providerArea.replaceChildren();
      for(const p of data.providers||[])addProvider(p);
      if(!data.providers?.length)throw new Error("No public records");
    }catch(_){
      providerArea.replaceChildren();
      addProvider({
        name:"Friendship Bench Zimbabwe",service:"Independent psychosocial support in Zimbabwe. Details should be confirmed on their official website.",
        price:"Provider-published free online sessions",hours:"Check official website for current opening times",
        reviewed:"PROVIDER WEBSITE",channels:[{label:"See official online support page",url:"https://www.friendshipbenchzimbabwe.org/online"}]
      });
    }
    const notice=document.createElement("p");notice.id="regionNotice";notice.className="availability";
    notice.textContent="Public online support for Zimbabwe. Exact-distance matching is not available.";
    providerArea.append(notice);
  }
  reset();providers();
})();

/**
 * Non-sensitive, local-only care preference summary.
 * Never include chat messages, inferred mental health status, or contact information.
 */
export function careCopy({ mode, budget, language }){
 const modes={"online":"Online / phone","in-person":"Face to face","either":"Either"};
 const budgets={"free":"Free support","low-cost":"Affordable options","either":"Any"};
 const langs=["English","Shona","Ndebele"];
 return [
  {label:"Preferred connection", value:modes[mode] || "Either"},
  {label:"Affordability", value:budgets[budget] || "Any"},
  {label:"Language preference",value:langs.includes(language)?language:"English"}
 ];
}
export function careSummary(choices){
 return "My support preferences (shared by my choice):\n"+careCopy(choices).map(x=>x.label+": "+x.value).join("\n")+"\nNo clinical information or chat transcript is included.";
}

/**
 * Optional first-contact note for the user to review and send independently.
 * Only allowlisted preference labels are used; no transcript or diagnosis.
 */
export function firstContactNote(choices){
 const values=careCopy(choices);
 return [
  "Hello, I would like to ask about mental wellbeing support services.",
  "If possible, I would prefer "+values[0].value.toLowerCase()+" support.",
  "My language preference is "+values[2].value+".",
  "Regarding fees, my preference is: "+values[1].value.toLowerCase()+".",
  "Could you tell me how to get started, what services are available, and any costs?",
  "Thank you."
 ].join("\n");
}

// Public service facts confirmed from providers' OWN websites; never claim partnership, appointments or real-time availability.
// Reviewed 13 October 2026. In production, human reviewers must recheck records on a schedule.
export const DIRECTORY = Object.freeze([
  {
    id:"friendship-bench-zimbabwe",
    name:"Friendship Bench Zimbabwe",
    scope:"Zimbabwe-wide online support; service's physical office is in Harare",
    type:"Independent nonprofit psychosocial support (not an emergency hotline)",
    service:"WhatsApp-based talk support, with English, Shona and Ndebele listed by the provider",
    price:"Free sessions (data charges may apply)",
    hours:"Monday–Friday 9:00–16:00; Saturday 9:00–12:00 (provider-published, not live status)",
    channels:[{label:"Visit provider's official online-support page",url:"https://www.friendshipbenchzimbabwe.org/online"},{label:"Open WhatsApp — you choose whether to send",url:"https://wa.me/263784845294"}],
    source:"https://www.friendshipbenchzimbabwe.org/online",
    reviewed:"2026-10-13",
    independent:true
  }
]);
export default function handler(req,res) {
  res.setHeader("Content-Type","application/json; charset=utf-8");
  res.setHeader("Cache-Control","public, max-age=1200");
  if(req.method!=="GET") return res.status(405).json({error:"Method not allowed"});
  return res.status(200).json({
    providers:DIRECTORY,
    notice:"Independently listed public information; not a partnership, medical endorsement, live booking service, or emergency directory. Choose whether to contact a service yourself.",
    urgency:"If you may be in immediate danger, contact local emergency services or your nearest emergency department now. This demo does not call anyone.",
    verifiedStatus:"Public provider details checked against its official website, NOT credentialing or clinical vetting."
  });
}

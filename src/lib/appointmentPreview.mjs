/**
 * Nonclinical booking-planning preview. No requests, patient info, or appointments.
 * Returns only allowlisted selections to avoid spreading sensitive user data.
 */
const service = {
  intro:"an initial mental-health support consultation",
  counseling:"information about counseling support",
  specialist:"information about available mental-health specialists"
};
const format = {online:"an online or phone conversation",inperson:"an in-person conversation",either:"either online or in-person contact"};
const timing = {morning:"weekday mornings",afternoon:"weekday afternoons",flexible:"any available appointment"};
export function appointmentChoices(){
 return {
  service:[{value:"intro",label:"A first support conversation"},{value:"counseling",label:"Counseling information"},{value:"specialist",label:"Specialist services information"}],
  format:[{value:"online",label:"Online / phone"},{value:"inperson",label:"In person"},{value:"either",label:"Either works"}],
  timing:[{value:"morning",label:"Weekday morning"},{value:"afternoon",label:"Weekday afternoon"},{value:"flexible",label:"I'm flexible"}]
 };
}
export function appointmentMessage({service:serviceKey,format:formatKey,timing:timingKey}){
 return [
  "Hello, I am looking for "+(service[serviceKey]||service.intro)+".",
  "If available, my preference is "+(format[formatKey]||format.either)+", ideally "+(timing[timingKey]||timing.flexible)+".",
  "Could you please tell me about your available services, qualifications, fees and booking process?",
  "Thank you."
 ].join("\n");
}

/**
 * Non-clinical, local scripted demo. Not AI, therapy, triage or crisis monitoring.
 * Urgent phrase matching is necessarily incomplete; urgent-help access is ALWAYS visible.
 */
export const CRISIS_COPY = "If you or someone else may be in immediate danger, contact local emergency services or visit the nearest emergency department now. If possible, stay near someone you trust. This demo cannot send help or monitor your safety.";
const dangerExpressions = [/\b(kill myself|suicide|suicidal|end my life|take my life|self[- ]harm|hurt myself|want to die|don't want to live|do not want to live|overdose|harm someone|kill someone)\b/i];
export function hasExplicitDangerPhrase(input) { return dangerExpressions.some((pattern) => pattern.test(input)); }
export function guideReply(input, turnNumber = 0) {
  if (hasExplicitDangerPhrase(input)) return { kind:"urgent", text:CRISIS_COPY };
  const message = input.trim().toLowerCase();
  if (!message) return {kind:"empty",text:"You can write a little, or choose a topic to begin."};
  if (/\b(therapist|psychologist|counsel(l)?or|doctor|professional|appointment|referral)\b/.test(message))
    return {kind:"referral",text:"You can explore our professional-support pathway whenever you're ready. Verified therapist bookings aren't live in this demo."};
  if (/\b(stress|stressed|overwhelmed|pressure|exam|school|work|money)\b/.test(message))
    return {kind:"support",text:"That sounds like a lot to carry. Would it help to name what feels heaviest, or would you prefer a short grounding exercise?"};
  if (/\b(lonely|alone|friend|relationship|breakup|family|isolated)\b/.test(message))
    return {kind:"support",text:"Feeling disconnected can be hard. Is there someone you trust who might be willing to listen, even for a few minutes?"};
  if (/\b(anxious|anxiety|worried|worry|afraid|scared|panic)\b/.test(message))
    return {kind:"support",text:"Thanks for sharing that. Would you like to put into words what's been worrying you, or focus on a small step for today?"};
  if (turnNumber>1) return {kind:"support",text:"You can take your time. If you'd prefer qualified human support, you can explore that pathway at any point."};
  return {kind:"support",text:"Thank you for saying that. What would feel most helpful right now: talking more, taking a pause, or exploring human support?"};
}

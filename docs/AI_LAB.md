# Zim Safe Minds — consent-first AI Lab (DEVELOPMENT BRANCH)

> **Prototype experiment, not a clinical or emergency service.** Development is isolated on branch \`feat/consent-first-ai-lab\` and is **not merged to main**. The original HackLab pitch site and its scripted Talk / Learn / Connect experience remain unchanged.

## What is implemented

- Polished independent Afterglow experimental page at **\`/ai-lab/index.html\`**, using the existing brand artwork; does not change the main App.
- Explicit opt-in before the text leaves the browser; no account, localStorage, analytics or application-owned chat database.
- Server-only **\`POST /api/chat\`** Vercel Node function calling the OpenAI Responses API with **\`gpt-5.4-mini\`** and **\`store:false\`**.
- **\`omni-moderation-latest\`** and conservative immediate-risk phrase screening; moderation failure stops model generation. These heuristics **cannot reliably detect crisis or measure risk**. No clinical claim is made.
- On suspected immediate danger: encourage emergency services, an emergency department, and nearby trusted human support. Optional map link and independent provider contact are **user-directed**.
- **\`GET /api/providers\`** public-directory endpoint with a single listed independent provider from its official website: Friendship Bench Zimbabwe. Reviewed 2026-10-13. Not a partnership, credentialed directory, clinical approval, booking system or live availability feed.
- English, Shona, Ndebele *experimental* dialogue instruction, not certified translation quality; user can choose how to describe their needs.
- Size, output-token and best-effort per-instance request limits; no API key in browser.

## Manual activation needed (only after code/tests reviewed)

1. In your existing Vercel project **zim-safe-minds**, open Settings > Environment Variables.
2. Add **\`OPENAI_API_KEY\`** (a newly created restricted OpenAI API key) to **Preview only**; ideally limit it to \`feat/consent-first-ai-lab\`. Do NOT add it to Production yet and do not paste it in chat or GitHub.
3. Optional **\`OPENAI_MODEL\`** = \`gpt-5.4-mini\`, Preview only. Default already uses that model.
4. In the OpenAI API billing dashboard, configure a **low project budget / usage alert** and any available rate controls. API costs are separate from ChatGPT subscriptions.
5. Redeploy the branch preview from Vercel to pick up the variable, open its \`/ai-lab/index.html\`, and perform a **synthetic-only** test. Preview may require Vercel login due to deployment protection.

Before the key exists, the server returns **503 \`KEY_MISSING\`**. The frontend says the AI isn't available and never simulates a "live" answer. **No real AI call can be end-to-end tested until an API key is supplied.**

## API contract

\`POST /api/chat\`
\`\`\`json
{"consented":true,"messages":[{"role":"user","content":"I've been feeling stressed."}]}
\`\`\`
Success: \`{"reply":"...","risk":"none|concern|urgent","mode":"live-ai|safety","contacted":false}\`.
No key: HTTP 503. Invalid consent/messages: 400. Rate cap: 429. Always returns \`Cache-Control: no-store\`.

\`GET /api/providers\` returns independently sourced public listings with official source and review date. **The city selector is display-only**: no GPS, distance computation or locally verified doctor matching.

## Hard safety and privacy boundaries

- **No calls, SMS, WhatsApp messages, emergency dispatch, appointment booking or doctor alerts are sent by the app.** None should be implied.
- **No automated trusted-person alert** without a reviewed consent, safeguarding, legal and human-operated incident response plan.
- Prompts, model output, and moderation can miss danger or overreact. In an emergency, users should bypass the demo entirely.
- API submissions are transmitted to **OpenAI**; hosting provider and AI platform processing/retention rules still apply even though this app deliberately writes no chat logs. Privacy, data protection and clinician reviews are required **before real users, especially minors**, are invited.
- The page is deliberately **noindex**. Browser preview deployment protection should remain on.
- In-memory throttling applies to a single function instance only: not adequate cost or abuse protection for an unprotected launch. Use shared rate limiting, abuse protection, monitoring (without sensitive prompt logging), cost ceilings, controlled access and clinical/ethical review before launch.
- Do not trust listed external service data without re-verifying regularly. There is **no partnership** with Friendship Bench.
- No actual provider triage, medical safeguarding system, or privacy/regulatory approval is present.

## Testing

\`\`\`sh
npm test
npm run build
\`\`\`
Includes safety phrase, moderation fail-closed, input validation and directory provenance checks. Additional production gates: clinician-reviewed crisis scenarios; Shona/Ndebele safety phrasing assessment; red-team prompt injection and self-harm tests; mobile accessibility; timeouts; privacy review; sustained rate-limit protection; partner protocol; signed-off incident handling.

Main presentation stays on **\`main\`** until the team expressly agrees to move beyond the scripted prototype.


## AI connection incident, 13 Oct 2026

An initial preview returned the static `SUPPORT_TEXT` on ordinary messages (`hey`, `i dont like people`). The string originated in the API catch-handler rather than OpenAI; technical upstream failures were incorrectly presented as counseling. The updated code never substitutes AI replies for technical errors and now returns safe diagnostic codes such as `OPENAI_CREDITS`, `OPENAI_AUTH_FAILED`, `OPENAI_MODEL_NOT_FOUND`, `OPENAI_REQUEST_INVALID`, `MODERATION_UNAVAILABLE`, `EMPTY_AI_OUTPUT`, or `AI_CONNECTION_FAILED`. The browser shows a distinct error card, preserves the attempted message in the input, and never claims a clinician was contacted. No API key is committed. A real end-to-end request still requires an authenticated Vercel Preview browser session; our connector's runtime-log tool currently responds 403. If the code is `OPENAI_CREDITS`, the project owner must review separate API billing; ChatGPT plans do not fund API usage.


## Product-specific topic boundaries (13 October 2026)

**Allowed:** wellbeing discussion, feelings, loneliness, stress, managing emotions, nonclinical awareness, and voluntary contact with independent mental-health support. A person who is worried *about* software development can discuss their feelings. **Not allowed:** coding, app development, debugging, homework solutions, recipes, general knowledge, writing unrelated essays, prompt-injection role changes, and other general assistant tasks.

The application enforces these constraints on the **server** in layers:
1. Immediate-danger language gets urgent human-help guidance before any task routing. This is only heuristic: not a dependable assessment of crisis.
2. Cheap deterministic intent screening rejects clear app-development and unrelated requests **without making a billable model call**.
3. For ambiguous requests, a small separate OpenAI model (\`gpt-4o-mini\`) classifies whether the **primary** intent is wellbeing or unrelated using a strict JSON schema. It receives at most five short conversational turns. If invalid or unavailable, the app does not generate a reply.
4. The conversational model receives a tighter wellbeing-only system instruction and must output strict JSON with \`decision: support|redirect\`. The server—not the model—constructs the standard off-topic redirect.
5. Output is screened for obvious code snippets, commands, and fenced code. The server refuses detected code rather than displaying it.
6. Prompts and outputs are checked in automated adversarial regression tests. No unrelated tools (code execution, internet search, arbitrary plugins) are available to users.

**Limitations:** These are defense-in-depth boundaries, not a 100% guarantee. Prompt injection, classifier error, missed crisis wording (especially in Shona/Ndebele), or incorrect model output remain possible. The API project must use tight usage budgets/alerts and distributed rate limiting before public release. The subject filter is NOT a clinician, triage algorithm or emergency-monitoring system. User testing involving vulnerable participants requires oversight. Structured response calls cost API tokens; tests using mocked responses do not establish real-world model behavior. Do NOT remove preview deployment protection.

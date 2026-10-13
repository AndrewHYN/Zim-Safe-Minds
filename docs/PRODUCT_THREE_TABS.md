# v0.2 — Product scope, acceptance checklist and future integration plan

**Shipping concept:** `Talk · Learn · Connect` (three tabs only). Medical Afterglow aesthetic with Daylight and dark Afterglow toggle. **A working grant demonstration, not a live clinical application.**

## What each tab really does

### Talk
- Landing explains who the product is for, the first-contact stigma barrier and the human-care goal.
- Consent gate makes the **scripted, non-clinical** nature of the chat unmistakable.
- Starter prompts and typed text return local scripted responses. Reset clears messages in browser state.
- Grounding steps optional; urgent-help guidance available without chatting.
- Future scoped AI prompts are **not production functionality**. Model, service backend, clinical review, logs, data retention and policy enforcement are milestones requiring partners and review.

### Learn
- Six original educational posters/articles with citations to WHO or the independent Friendship Bench website.
- Filter by topic, keyword search, articles in readable dialog and save-for-this-visit.
- No clinical guidance, live news aggregation, social scraping, copyright reprints or user account required.
- Source-linked references should be periodically reviewed before launch and must not imply provider endorsement.

### Connect
- Appointment **planner preview** with service type, contact format and general time preference. Generates a copy-only draft. It does **not** check availability, accept patient information or book a doctor.
- Care navigator includes preferred contact modality, affordability and language. Makes a copy-only first-contact message without transcript forwarding.
- Independent Friendship Bench support link; no verified directory, doctor accounts, provider commitments or actual booking API.
- Future validated appointment service: credential verification, signed agreements, provider-managed slots, user consent, accessibility, privacy/legal clinical review, security and human incident response.

## Demo acceptance checks
- [ ] Navigation exposes exactly three primary sections on desktop/mobile
- [ ] Every tab usable without an account
- [ ] Talk opt-in; no medical or identifying health data requested
- [ ] Learn filters and article dialog work
- [ ] Connect planner produces local messages without persisting or sending them
- [ ] A user can bypass AI and go straight to Connect
- [ ] Help guidance visible regardless of selected tab
- [ ] Both Medical Afterglow palettes readable
- [ ] `npm test` and `npm run build` pass
- [ ] GitHub Pages deploy matches reviewed commit
- [ ] Application pitch correctly distinguishes prototype from real services

## Explicitly not shipped yet
- AI API, data collection / auth, real clinician profiles, scheduling or payments, automatic clinical decision making, crisis prediction, clinical diagnoses, counselling services, production referrals, verified provider partnerships, privacy compliance signoff.

## Development after grant
1. Interview young adults and licensed professionals to validate the *first contact* gap.
2. Conduct independent clinical, safeguarding and privacy review.
3. Integrate a controlled model only with safeguards, data handling, local language tests and clinical oversight.
4. Introduce verified provider booking only after contracts and approved secure data flow.
5. Measure real access outcomes, not engagement as clinical efficacy.

**Budget and 12-month plan remain in the grant documents and are not treated as feature scope for the prototype.**

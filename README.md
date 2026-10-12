# Zim Safe Minds 🌿

**A safe space to talk. A path to real support.**

**Status:** `v0.1.0` — early interactive *demonstration*, not a clinical service or live AI product. Built in Zimbabwe, with Zimbabwean youth at the centre of the first pilot.

> **Important:** This software is not therapy, diagnosis, clinical triage, suicide-risk detection, a medical device, or an emergency service. Do not submit identifiable health information. For immediate danger, seek local emergency care or emergency services; do not wait for a response from the app.

## 1. The idea

Zim Safe Minds is a **mental wellbeing navigation platform**. It begins with a private, supportive, low-pressure experience to help people articulate how they feel, and aims to bridge them into **qualified human mental health care** when they choose or may need it. The project grew from a discussion about young Zimbabweans who may be reluctant to open up to adults, worried about stigma, unsure whom to contact, or intimidated by a clinical first step.

Our long-term vision serves **everyone**, but the **initial pilot focuses on consenting young adults (18–35) in Zimbabwe**, consistent with the Zimbabwe Youth Innovation HackLab 2026 opportunity and simpler, safer initial safeguarding requirements. Access for minors and a wider public launch are **not** in the present scope.

### The promise

- **Speak without pressure:** begin with a familiar private chat-style experience rather than a complicated form or public community.
- **Understand your options:** supportive reflection, simple self-expression and optional grounding / wellbeing education.
- **Reach actual care:** transparent access to independently verified therapists, psychologists, qualified counselors and/or appropriate clinics, with choice, price / accessibility information, and **consent-based** introductions once partnerships exist.
- **Zimbabwe-first design:** accessible on inexpensive Android phones and slower connections; plan for English, Shona and Ndebele, culturally appropriate copy and affordability-aware care pathways.
- **Human-first design:** technology can help someone start a conversation but cannot replace qualified professional judgement.

## 2. What we are tackling

**Working hypothesis — to validate, not present as proven research:** Some Zimbabwean youth struggle to access mental health care because of stigma, uncertainty about available qualified professionals, expense and a difficult first step from personal distress to seeking care. The digital gap is not simply that people lack information: **finding help, trusting it, choosing it and following through can be hard.**

We should interview young adults and licensed professionals before claiming the severity, prevalence, or causes of these barriers. We should also map existing Zimbabwean mental health programmes rather than duplicating them.

## 3. What makes Zim Safe Minds distinct

An ordinary AI chatbot stops after a conversation. A static directory gives phone numbers. Zim Safe Minds proposes a **safe, opt-in journey from expression to qualified human support**, with specific accountability for referral completion, provider verification, privacy, safeguarding and access barriers.

The AI concept is **assistive, not diagnostic**: prospective features include empathetic conversation support, optional organization of what a user wishes to say to a provider, trusted local service navigation, accessible languages and suggesting that human help is available. **No automatic clinical triage, risk scores, diagnoses, prescribing, treatment recommendations or fully autonomous referrals.** Any automated escalation would require review by local clinical partners and extensive evaluation. The user should always be able to request human support directly.

## 4. Product journey

1. **Arrive safely.** Understand what the tool is, what it cannot do, and its privacy boundaries. No forced public profile.
2. **Start talking.** Choose a prompt or type a short message in a personal, chat-style interface. Users should be free not to disclose identifying details.
3. **Take an optional pause.** Access simple grounding / self-expression prompts. They are not treatment.
4. **Choose human support.** Browse real, independently verified partners by location, telehealth / face-to-face modality, affordability and other access needs, once available.
5. **Consent-based introduction.** A user explicitly agrees before any information is sent. By default **a chat transcript is never forwarded**. Professional review and appropriate consent are required for any referral workflow.
6. **Evaluate access.** With a privacy-respecting approach, measure whether people successfully reach qualified care and feel respected, not simply how many minutes they spent with AI.

### Emergency handling

Prominent urgent-help entry points must always be available. The product must never imply it detects every dangerous situation or offers 24/7 monitoring. The demo includes **limited phrase matching only as an extra safeguard, not a clinical risk detector**; a user can request urgent help independently. We intentionally don't show unverified Zimbabwe crisis hotline numbers.

## 5. What's implemented today

The repository contains an interactive, mobile-responsive React/Vite demo. The demo includes a care-preference navigator: no user messages are analyzed to make clinical judgments, and no information is sent to a provider. The Friendship Bench external link points to its independent publicly advertised service, not a signed partnership.

| Feature | Status | Notes |
|---|---|---|
| Beautiful landing page and mission page | **Built** | Responsive and accessible basics |
| Private, chat-style guided demo | **Built** | **Scripted**, not real AI; browser memory only |
| Starter prompts and free-text replies | **Built** | Lightweight scripted flows, no clinical assessment |
| Optional grounding prompts | **Built** | Three-step, non-clinical moment |
| Clear safety / consent disclosure | **Built** | Adults-only demonstration; no account / server |
| Prominent urgent-help guidance | **Built** | No unverified emergency numbers or live monitoring |
| Human-support pathway preview | **Built** | Clearly labeled **not live** |
| Preference-based care navigator | **Built** | Connection mode, affordability and language, with local-only preferences |
| Public service discovery | **Built** | External link to Friendship Bench official service; no partnership claimed |
| Clinician verification / partner onboarding | **Not started** | No providers listed without verification |
| Real AI integration | **Not started** | Gated on safeguards, privacy and oversight |
| Booking, referrals, therapist accounts | **Not started** | Require clinical and operational partnerships |
| Authentication, secure storage, back end | **Not started** | Intentionally no personal health-data backend |
| Public pilot, efficacy, clinical validation | **Not started** | No clinical benefit claimed |

> The prototype does not make network calls for conversation messages, persist conversations to local storage, or connect to clinics. The care navigator includes an outbound link to an independent service; leaving the demo opens that service's website. Deploying online produces normal hosting logs, so **do not claim absolute anonymity**. We removed the external web-font request to minimize third-party tracking. A real clinical pilot requires a formal privacy review and logging minimization.

## 6. Technology choice

- **Frontend:** React 19, TypeScript, Vite 7, handcrafted CSS (no component framework lock-in).
- **Conversation logic:** scripted JavaScript flows in `src/lib/demoGuide.mjs` with Node unit tests.
- **Hosting target:** Vercel preferred; manual GitHub Pages workflow is also available. **A public preview is not yet confirmed.**
- **Future AI:** server-side adapter with secret keys, vetted prompt/policy layer, independent safety evaluation, emergency UI and qualified human escalation. No secrets in client JS.
- **Future backend:** select only after documented privacy, consent, data-retention and Zimbabwe legal review. Encrypt sensitive data in transit and at rest; carefully scope clinician/admin access, audit changes, give users deletion options and minimize stored information.

### Run the demo locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

```bash
npm run test   # scripted guidance tests
npm run build  # TypeScript and production build
npm run preview
```

**No `.env` or API keys are needed.** Do not add medical or psychiatric records to this repo, test fixtures, tickets, analytics, or public pull requests.

## 7. Pilot roadmap (proposed 12 months)

| Period | Goal | Evidence / release gate |
|---|---|---|
| Months 1–2 | Interviews, partner discovery, root-cause validation; identify scope of practice and safeguarding needs | Youth and clinician feedback; no production data collection |
| Months 3–4 | Clinical safety co-design, privacy and security review, local legal review; translation / accessibility planning | Approved referral / safety process and content |
| Months 5–6 | Build private, secure pilot features and verified service information | Audited provider verification and informed consent flow |
| Months 7–8 | Small monitored pilot with consenting young adults (target **50–100**, contingent on approvals), 2–3 service partners | Safeguarding governance and incident reporting in place |
| Months 9–10 | Analyze whether participants can reach care; improve accessibility, triage boundaries and onboarding | Research findings, anonymized / aggregated measures |
| Months 11–12 | Sustainability plan, affordability model, responsible expansion plan | Independent go/no-go safety and impact assessment |

### What success could look like

- Share of consenting participants who can locate an appropriate verified care option.
- Share of referral requests that result in a confirmed contact or appointment **when partners are live**.
- User-reported trust, comfort and perceived usability (voluntary feedback).
- Time from referral request to first human contact, availability and affordability barriers.
- Safety incidents, incorrect information, privacy complaints and response / remediation times.
- Accessibility across device types, connection quality, language and ability to pay.

These are **proposed targets and metrics, not achieved outcomes**. Minimize personal data and do not use chatbot engagement as a proxy for mental health improvement.

## 8. Example US$5,000 seed grant allocation

This is a **planning illustration only**, subject to the official grant's eligible-expense rules, clinician input and procurement guidance.

| Workstream | USD |
|---|---:|
| Clinical co-design, safeguarding and research | $900 |
| Software prototype, accessibility and localization | $1,200 |
| Qualified provider verification and onboarding | $700 |
| Pilot recruitment, participation support and community outreach | $1,100 |
| Data protection, security and independent testing | $700 |
| Monitoring, evaluation and reporting | $400 |
| **Total** | **$5,000** |

Funding would **not** be used to deploy an unvalidated AI therapist. The development project must demonstrate responsibility and credible milestones, not just screens.

## 9. Opportunity context

**Zimbabwe Youth Innovation HackLab 2026** — Ministry of Youth Empowerment, Development and Vocational Training with the United Nations Youth Group chaired by UNFPA. Opportunity description supplied by the project founder: youth 18–35 ordinarily resident in Zimbabwe, idea/prototype/early pilot allowed, **one category per submission**, teams of 2–5 encouraged, at least 40% female membership prioritized, application deadline **20 October 2026 at 23:59 CAT**, support funding of **US$5,000 per winning category**.

**Proposed category:** Holistic Youth Health / Mental Wellbeing (confirm exact wording and root-cause choice in the current official form before submitting). The core innovation is a **safeguarded pathway to accessible mental health support for young people**, not an app for its own sake. A grant would support validated service design, partner onboarding, safe prototyping and small-pilot evaluation.

Sources provided in project discussions:
- [Official UNFPA Zimbabwe call](https://zimbabwe.unfpa.org/en/submission/zimbabwe-youth-innovation-hacklab-2entity26) *(official listing verified 12 October 2026)*
- [Application form](https://docs.google.com/forms/d/e/1FAIpQLSf6rTo4o-tTSB2fTAxEWb2SOrsDHJTRWw6ULvB8WLqy_loFJw/viewform)

**No application has been submitted by this repository.**

## 10. Name and positioning

Final working name chosen: **Zim Safe Minds** (`Zim-Safe-Minds` GitHub repository). Earlier working ideas: **MukaCare**, **MukaMind**, **SvikaCare**, **PedyoCare**, **Ziva Utano**, **HutanoLink**, **CareBridgeZW**, **Taura**, **Taura Care**. We converged on Zim Safe Minds when the concept evolved from clinic navigation to youth mental health support and an opt-in professional referral pathway.

Tagline: **“A safe space to talk. A path to real support.”**

Brand intent: warm, young, credible, distinctly Zimbabwean, private rather than public / social, no faux medical claims, and a memorable experience worthy of a grant demo. The product should eventually work for **everyone**, while starting with an adult-youth pilot.

## 11. Non-negotiable safety principles

1. Do **not** position AI as a therapist, doctor, crisis responder, diagnosis engine or substitute for human treatment.
2. Do not deploy an uncontrolled LLM that generates clinical advice or unsupported risk / referral conclusions.
3. Do not tell users that distress is being actively monitored or that help is on its way when it is not.
4. No public chatrooms or unrestricted peer-to-peer support without a professionally reviewed moderation / safeguarding model.
5. Independently verify licensed providers using appropriate current Zimbabwean regulatory and professional sources, then obtain consent before displaying a professional's profile.
6. Referrals should be user-controlled. Never disclose chat transcripts by default; never automatically escalate to external providers without a lawful, documented process and user knowledge (emergency exceptions require expert review).
7. Privacy / security, age restrictions, accessibility and low-data usability are release gates, not post-launch extras.
8. Clinicians, mental health professionals and users must help design and test the service before a real pilot.

Read [docs/SAFETY.md](docs/SAFETY.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/GRANT_CONCEPT.md](docs/GRANT_CONCEPT.md) before extending the prototype.

## 12. Immediate development backlog

**P0 — Before any real health service launch:** interview partner clinicians and youth, agree on safety governance / emergency pathways, verify applicable Zimbabwe privacy / health requirements, threat-model sensitive information, clinical review and safeguarding, obtain consent and governance documentation.

**P1 — Prototype improvement:** content review, accessible Shona/Ndebele copy with professional review, self-host fonts, improved keyboard UX, user testing on slow Android devices, service directory design, verification workflow and affordability filters — all with non-sensitive synthetic data.

**P2 — Controlled AI exploration:** server-only LLM gateway, clear product boundaries, opt-in / data-minimized logs, prompt injection and high-risk tests, harm review and human escalation rules. **Do not ship to real users without independent clinical evaluation.**

**P3 — Small pilot:** secure identity and explicit consent as needed, provider onboarding, monitored introductions and booking flows, data retention / deletion, incident protocol, pilot review and feedback metrics.

## Project structure

```text
src/
  App.tsx                 # React screens and scripted chat UX
  main.tsx                # app entry
  styles.css              # responsive visual design
  lib/demoGuide.mjs       # deterministic demo guidance, NOT AI / triage
scripts/guide.test.mjs    # automated checks on demo responses
docs/SAFETY.md            # safeguards and required real-world review
docs/ARCHITECTURE.md      # present design + responsible future options
docs/GRANT_CONCEPT.md     # draft application narrative and milestones
public/favicon.svg        # product icon
```

## Contributing / project ownership

This project is a **founder-led prototype**, intended for transparent development and potential collaboration with Zimbabwean mental health professionals and youth organizations. Do not commit credentials, medical data, real-user conversations or unverified therapist listings. Architecture is intentionally modest until the human-care operations are validated. License status: **all rights reserved pending a deliberate license choice**; no open-source license is granted by omission.
## HackLab 2026 milestone pack

- [Grant application copy — 200-word summary and 500-word innovation description](docs/APPLICATION_2026.md)
- [USD 5,000 costed 12-month pilot and metrics](docs/MILESTONES_BUDGET_2026.md)
- [Evidence register, competitor landscape and field research](docs/EVIDENCE_AND_RESEARCH_2026.md)
- [90-second pitch and judge Q&A](docs/PITCH_2026.md)
- [Founder submission checklist](docs/LAUNCH_CHECKLIST_2026.md)

**Deployment:** The `Deploy demo to GitHub Pages` workflow can be run manually after enabling Pages with GitHub Actions as the source in Repository Settings → Pages. It builds the Vite site with the correct subpath, and does not run on every push. Do not advertise a GitHub Pages URL until the workflow reports a successful deployment.

# Zim Safe Minds — HackLab 2026 Pitch Kit

**Category 1: Holistic Youth Health & Well-being** · **Talk · Learn · Connect**

> **Status:** Presentation drafted for a proposed team. Not yet rehearsed or submitted. Team Lead and other assignments intentionally remain unfilled. The current product is an early *scripted* prototype, not clinical AI or a booking service.

## Present this

| File | How to use it |
|---|---|
| **[Editable PowerPoint](Zim_Safe_Minds_HackLab_2026_Pitch.pptx)** | Use in PowerPoint or LibreOffice Impress; edit the Team slide after roles are agreed. Includes speaker notes on each slide. |
| **[Offline PDF pitch](Zim_Safe_Minds_HackLab_2026_Pitch.pdf)** | Reliable display backup if slide animations or office software are unavailable. |
| **[Presenter script & rehearsal guide](PRESENTER_GUIDE.md)** | 90-second opener, 3-minute walkthrough, team handoffs, time allocation, Q&A and ethical boundaries. |
| **[Source generator](../../tools/generate-hacklab-pitch.mjs)** | Rebuild both files from the project branding and source; see instructions below. |
| **[Live Vercel demo](https://zim-safe-minds.vercel.app/)** | Live three-tab app with calm Afterglow styling. |

## Slide order

1. **The promise** — A safe space to talk. A path to real support.
2. **The problem** — Stigma, uncertainty and the first-contact barrier.
3. **The solution** — Talk, Learn, Connect; the user can skip the chatbot.
4. **The working prototype** — Three illustrated UI views (not literal screenshots); click through to the live Vercel demo.
5. **Why it matters** — First-contact navigation rather than another AI therapist or duplicate clinic.
6. **For whom** — Youth 18–35, low-data, language, disability and affordability; proposed pilot targets marked as such.
7. **12-month roadmap** — Discover, review, verify, evaluate; all clinical steps safety-gated.
8. **US$5,000 use of funds** — Illustrative costed plan; not an awarded grant or actual spend.
9. **Team and closing ask** — Current Technical Lead named; Team Lead and other roles *intentionally unassigned*.
10. **Backup: demo steps** — Three-minute live walkthrough and offline fallback.
11. **Backup: tough questions** — Truthful answers to anticipated judge questions.

## Who needs to do what

**Andrew (Technical Lead):** verify the app, check the demo/branding, keep GitHub/Vercel running, supply an offline screenshot or screen recording if possible. **Does not have to be Team Lead or manage the budget.**

**Team Lead (unselected):** confirm all team members' eligibility, agree role names and personal details privately, customize slide 9 and the actual application, present the pitch, ensure official submission before **20 October 2026, 23:59 CAT**.

**Research/Wellbeing liaison:** obtain genuine consenting youth feedback about finding services (no personal health histories), consult qualified clinical advisers, bring real evidence to the pitch. No fake testimonials.

**Inclusion/Community/Operations owners:** review the access story, scope of the pilot and proposed budget, rehearse follow-up questions, and ensure clear ownership of grant deliverables.

## What to edit before a formal pitch

- Replace only the **Team Lead** and remaining role placeholders once the team has chosen; verify every member has consented and meets eligibility.
- Replace simplified interface illustrations on slide 4 with **real screenshots** of the latest site *if available*. The current slide accurately labels them as simplified illustrations, not screenshots.
- Insert genuine observations from user interviews only after they actually happen, with anonymized sourcing and permission. Don't invent statistics, partners or provider capacity.
- Decide whether the organizer requests a 90-second pitch, three-minute live demo or longer presentation; adjust timings accordingly.
- Confirm current event rules and the final grant application with the Team Lead. This deck is not evidence of a submitted form.

## Rebuild the PowerPoint

With Node 22+, LibreOffice (PDF generation), and the repository assets:

```sh
npm install --no-save pptxgenjs
node tools/generate-hacklab-pitch.mjs
libreoffice --headless --convert-to pdf --outdir docs/presentation docs/presentation/Zim_Safe_Minds_HackLab_2026_Pitch.pptx
```

For maintainers: the automated GitHub Action [`build-pitch.yml`](../../.github/workflows/build-pitch.yml) regenerates the two files on changes to the slide source/branding. Do **not** commit credentials, member contact details or confidential participant information in this public repository.

## Claim and safety boundary

- Real human provider booking **not yet operational**.
- The Talk demo uses **scripted replies**, not a connected LLM.
- Professional service affiliations are not claimed. Friendship Bench is independent.
- Proposed **50 adult pilot participants / two verified providers** are *targets*.
- Do not promise outcomes for mental illness, diagnosis, 24/7 coverage or autonomous crisis intervention.
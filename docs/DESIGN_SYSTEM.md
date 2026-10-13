# Medical Afterglow — Zim Safe Minds visual design system

## Core direction
A human-first wellbeing product. AI-guided reflection is **central to the planned product**, but do not imply the current scripted preview uses a live model. Visual inspiration: Afterglow's restrained glowing detail, low-glare night palette, precise typography, gentle luminous strokes and retro-tech cues, adapted into a credible medical wellbeing interface. Do not copy the Afterglow code, brand assets or terminal UI.

## Theme palettes (functional CSS variables)

| Role | Daylight / Clinic | Afterglow / Night |
| --- | --- | --- |
| App canvas | #f8fbfa | #0b222b |
| Surface | #ffffff | #12313b |
| Primary text | #153948 | #e8f7f1 |
| Muted text | #58747a | #b0cbc8 |
| Brand accent | #177e83 | #8ee3cf |
| Primary CTA | #145769 | #8ee3cf |
| Mint light | #dff6ef | #194f54 |
| Borders | #dceae8 | #31535b |
| Deep hero / footer | #102f3d | #071923 |

No purple AI gradients; no fake statistics, fictional doctors, stock medical promises, mascot bots or unverified call-to-action integrations. Primary routes: talk it through, explore care, learn about mission. User is never forced into the chat.

## User experience behaviors
- Header palette switch toggles between accessible-looking bright clinical surfaces and low-glare phosphor-inspired afterglow without storing a preference or tracking the user.
- Mobile drawer with readable labels, prominent primary CTA, labels in plain English.
- Home explains AI as a first-step self-expression tool and humans as the care providers.
- Conversation demo remains *scripted and non-clinical*; no account, database or transcript submission.
- The care navigator exposes budget, modality and language choices and links directly to an independent public service. It does not assess risk or share data.
- Urgent-help link always visible. No unverified hotline details.
- System fonts only; no remote fonts or external imagery requested by page render.
- Respect reduced motion, keyboard focus and color contrast.

## AI product roadmap
AI-assisted reflection is a **planned key feature**, not removed:
1. Co-design conversation scope with Zimbabwean mental health professionals and 18+ youth.
2. Commission privacy, security and clinical safety reviews before introducing real user mental health data.
3. Select a suitable provider/model behind a controlled server, not exposed browser credentials, with strict refusal to diagnose and user-visible limits.
4. Evaluate non-English and code-switched Zimbabwean language prompts, failure modes, prompt injection and crisis-handling messaging.
5. Human professional introductions require verified providers, signed agreements and affirmative consent; never automatically forward conversation content.

## Inspiration
Afterglow design system: https://ui.xiaowei.fun/libraries/afterglow (inspiration only, no upstream component/code/assets incorporated).

## Three-tab prototype (v0.2, 13 October 2026)

The root interface has exactly **three primary tabs**. The brand leads to Talk; there is no separate dashboard, inbox, social feed, login, public forum or extra main navigation.

1. **Talk:** landing hero + consent-first local scripted conversation, suggestion prompts, clear urgent-help entry and optional grounding. Future AI-guided reflection is core to the vision, but the current prototype is explicitly *not connected* to any LLM provider. The chat is never submitted or stored on a server.
2. **Learn:** curated poster-style original awareness content, six source-linked stories, category and keyword search, session-only saves, educational article dialog. Not live news, not unverified automated content, no social media scraping.
3. **Connect:** human support pathway, local-only appointment-planning draft and preference selector. Users can copy messages they review and choose where to send. External Friendship Bench link is a public independent resource, not a signed partnership. No providers are booked or contacted by this app.

**Future milestone gates:** verified mental-health providers, partner-approved scheduling, security/privacy/clinical review, then safe AI service. No deployed API keys, no medical model pretending to diagnose, no fabricated providers, no automated clinical referrals.

Theme design: the low-glare **Afterglow** and bright **Daylight** palette remain; typography and editorial cards are intentionally calm, not neon AI-themed.

# Zim Safe Minds — entry, language selection and accounts

## What currently works
- When a browser has no saved language choice, users see an Afterglow welcome/entry experience with **Shona / isiNdebele / English** choices.
- The choice is browser-only (`zsm.locale.v1`), can be changed on the welcome screen or from the main site header, and determines the principal UI wording.
- Welcome offers two routes: **Enter as a guest** (no account required), or optional sign-up/sign-in on the welcome screen.
- Talk/Learn/Connect remain accessible to guests. Localized short interface content covers the welcome, navigation, most Talk and Learn/Connect controls.
- Longer educational articles and some descriptive content remain in English until translations have been reviewed by fluent Shona/isiNdebele speakers and safeguarding experts. English fallback is intentional; do not advertise fully translated clinical care.
- The conversation is still a **scripted non-clinical demo**. It is neither an AI therapist nor a safety-monitoring service.

## Secure account activation (not yet live)
There is no linked dedicated Zim Safe Minds authentication backend at this point. The UI MUST visibly indicate that accounts aren't active. Never store passwords in localStorage or pretend an account was created.

1. Create a separate Supabase project for Zim Safe Minds (do **not** reuse the BidBlitz database).
2. In Supabase Auth configure Email provider, email confirmation, verified SMTP and allowed redirect addresses. Include `https://zim-safe-minds.vercel.app/` and `https://andrewhyn.github.io/Zim-Safe-Minds/` if hosting on Pages.
3. Add public frontend environment values to Vercel and, if desired, to GitHub Pages Actions builds:
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
   These are browser-accessible: **never** include service_role or secret keys.
4. Verify sign-up, email confirmation, persistent session, sign-in and sign-out on the final deployed domain before enabling real data collection.
5. Review a complete privacy notice, account removal process, abuse/rate limiting, safeguarding and retention before recruiting real wellbeing users.

Signup is 18+ and limited to a basic display name, email and password. Only account metadata is supplied to Supabase Auth; chat messages and clinical details are not sent. Do not claim production accounts are available until manually configured and verified.

## For your team
Recruit fluent Shona and isiNdebele reviewers, plus someone with mental-health safeguarding expertise, to review the translation dictionary `src/copy.ts`, supplemental UI phrases in `src/i18n.ts` and `src/i18nExtra.ts`, and all emergency-language text.

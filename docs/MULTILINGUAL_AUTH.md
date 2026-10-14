# Multilingual entry, account design and privacy

## Current behavior
- On first visit, choose **Shona, Ndebele or English** before entering the experience.
- Preference is stored in the browser under `zsm.language.v1`; it can be changed from the site header.
- An Afterglow-themed join/sign-in screen is shown before the three-tab application.
- **Continue as a guest** always allows access to Talk, Learn and Connect. The user's guest choice lasts only for the current browser tab.
- Login/signup uses **Supabase Auth** only when configured with a dedicated Zim Safe Minds Supabase project.
- Sign-up asks only for a display name, email, password (8+ chars), and an 18+ confirmation. Only name/email and auth credentials go to Supabase; no chat messages or health records are uploaded.
- New users may need email verification, depending on Auth settings; sign-in and password-reset email paths are wired.

## Configuration required for real accounts
1. Create a **separate** Supabase project for Zim Safe Minds (never share the BidBlitz project).
2. Under Supabase Auth, enable Email provider with email confirmation, choose a verified SMTP provider, and configure Site URL / Redirect URLs for:
   - `https://zim-safe-minds.vercel.app/`
   - `https://andrewhyn.github.io/Zim-Safe-Minds/` (if maintaining GitHub Pages)
   - local dev origin for testing.
3. Set in Vercel project environment for production/preview (and in GitHub Actions Pages build as build secrets if Pages needs login):
   `VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co`
   `VITE_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_KEY`
   **Never use the service_role/secret key in a VITE_ environment variable.**
4. Redeploy, sign up using a testing email, confirm it, log in and out, and run reset-password test. Do not call accounts live before all tests pass.

With no environment variables, account actions stay disabled and the screen clearly offers Guest mode; **no account information is submitted or stored**.

## Translation scope and safety
Core welcome, account, navigation, Talk hero and controls have draft Shona/isiNdebele translations. Some article text, informational disclosures and scripted guide responses remain in English until reviewed by fluent Zimbabwean native speakers and qualified safeguarding reviewers. Do not claim full clinical language support. All crisis/referral advice must receive specialist linguistic and clinical review before live use. The existing demo is non-clinical and not an emergency service.

## Recommended next steps
- Arrange user feedback with fluent Shona and isiNdebele speakers; revise word choices.
- Translate full Learn articles and care pathway informational text only after source-based review.
- Privacy policy, retention/deletion workflows, rate limiting, bot protection and safeguarding review are required before recruiting real wellbeing users.
- Account creation should remain **optional** to seek information or preview support.

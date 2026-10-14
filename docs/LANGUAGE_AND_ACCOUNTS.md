# Language welcome and optional accounts

## What ships in the prototype
- **First visit:** Afterglow entry screen with a native-language choice: Shona (default), Ndebele, or English. Selection is remembered using the browser's `zsm.locale.v1` preference only. Visitors can change it anytime in the site header.
- **Guest access:** All three product tabs remain usable without registration. Emergency guidance is reachable even on the entry screen.
- **Main experience:** Primary navigation, Talk hero, scripted starters, important consent disclosures, emergency guidance, and account-entry controls have draft translations. The original floating chat-card art is preserved.
- **Educational and care-path details:** Some Learn and Connect material and scripted chat replies remain English. These are explicitly labeled **partially translated**, not silently presented as fully localized. **Get fluent Shona/Ndebele plus clinician reviewers before relying on translated safety-critical content.**
- **Optional account form:** Email, display name, password (8+ chars), and an adult-only confirmation on sign-up; email and password on sign-in. No symptom, diagnosis, wellbeing history, chat text or clinical details are requested. No chat history is saved to accounts.

## Important distinction: account UI vs live authentication
The app has **no Zim Safe Minds backend connected yet**. Until a dedicated authentication project is configured, sign-up forms are replaced by a plain notice stating no account details are collected; guest access stays functional. This is intentional: an attractive form is not a substitute for secure account storage. **Do not connect the existing BidBlitz Supabase database.**

## Enable real accounts (manual admin setup)
1. Create a **dedicated** Supabase project named for Zim Safe Minds (do not reuse production data belonging to another app).
2. In Supabase Authentication, enable email/password sign-in, **require email confirmation**, and configure reliable SMTP delivery before public registration. Configure rate limits, bot defenses and sensible password policies.
3. Allowlisted Site URL and redirect origins should include **https://zim-safe-minds.vercel.app/** and (if you actively use the GitHub Pages mirror) **https://andrewhyn.github.io/Zim-Safe-Minds/**. Review redirect URL rules for the exact / callback behavior.
4. Set frontend environment variables in **Vercel Project Settings → Environment Variables**:
   - `VITE_SUPABASE_URL` = dedicated project API URL
   - `VITE_SUPABASE_ANON_KEY` = publishable/anon key (public frontend only)
   Never put a `service_role` key, JWT signing secret, SMTP password or private server key into `VITE_` variables.
5. Redeploy once with the values. Verify a real sign-up **and its confirmation email**, sign-in, sign-out, wrong-password handling, and session restoration. Accounts go live only when that flow succeeds.
6. A distinct Pages deployment will remain in guest mode until it receives its *own build-time* public values. Do not put real project secrets into GitHub workflow logs.
7. Before recruiting users, publish a reviewed privacy notice and retention policy explaining Supabase storage, purposes, deletion/erasure requests, cross-border data processing and applicable Zimbabwe data-protection requirements. Confirm consent and safeguards with qualified advisers; don't store sensitive mental-health content under this lightweight account design.

## QA checklist
- Clear localStorage (or use a private browser window): language entry appears; Shona initially highlighted.
- Choose Ndebele or English; continue as guest; heading and main navigation reflect choice. Reload: choice persists and landing gate doesn't repeat.
- Change language in header; reopen Account to review login UI; close as guest without losing tab content.
- Talk consent and urgent-help options can be opened in every language.
- Mobile: no header overflow at 360px; card and language selector remain usable.
- Reduced-motion operating system setting disables decorative animation.
- Without credentials: account registration is visibly unavailable and doesn't submit data.
- With dedicated Supabase credentials: sign-up, email confirmation, login, logout, failures and refresh correctly reflect verified backend state.
- Ask fluent speakers to review every Shona/Ndebele translation, especially health and emergency guidance, before safety sign-off.

This is a non-clinical prototype. No autonomous therapy, crisis monitoring, booking or verified referral service is deployed.

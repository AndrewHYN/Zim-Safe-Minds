# Architecture — v0.1 demonstration

React 19 + TypeScript + Vite 7 + handwritten responsive CSS.

The landing, chat, grounding, human-support preview and mission screens run in the browser. src/lib/demoGuide.mjs contains short scripted responses. No server, database, health-record storage, authentication, real providers or LLM API integration is implemented.

Future backend and AI integration are *proposals*, not commitments. Any AI component must be server-side, data-minimizing, evaluated for language and safety with local clinicians and subject to informed user consent; a secure backend and documented retention/deletion policy are prerequisites before any sensitive personal data.

Commands: npm install / npm run dev / npm test / npm run build.

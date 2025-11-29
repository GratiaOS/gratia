# 🌱 Gratia

<p>
  <img src="docs/assets/mark/gratia-mark.png" alt="Gratia Mark" width="90px" />
</p>

Gratia is a living garden – a quiet OS for presence, creation, and shared experiments.
It holds the seeds and protocols for things that grow around it: M3, Firegate, Firecircle, Codex :: Vienna, and beyond.

This repo contains the **web app** at [https://gratia.space](https://gratia.space), built as a gentle, token‑driven Next.js playground for Gratia.

---

## Identity

Gratia is in the process of becoming a non‑profit association.

**Public identity:**

- **Name:** Gratia (Asociación en formación)
- **Place:** Casbas de Huesca · España
- **Web:** https://gratia.space
- **Contact:** contact@gratia.space

No physical street address is published in this repo. Privacy is part of the garden.

---

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Edit any page inside `app/` — the site will auto‑update.

---

## Scripts

- `pnpm dev` → run locally at http://localhost:3000
- `pnpm build` → production build
- `pnpm start` → run built app
- `pnpm lint` → run linter
- `pnpm format` → format code with Prettier

---

## Stack & Styling

Gratia uses a small, opinionated stack:

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind v4 utilities + `@gratiaos/tokens` + `@gratiaos/ui`
- **Design tokens:** Garden‑core palette and typography wired through `globals.css`
- **Type:** custom Gratia typefaces (Gratia, Selari, Bilute) with system fallbacks

Pages like `/vortex` and `/codex/vienna` use the same token system for mood, motion, and depth.

---

## Deploy

This repo is set up for **Vercel**.

Push to `main` → deploys to [gratia.space](https://www.gratia.space).

No analytics, no trackers — this garden is private by default.

---

## Contributing

This is a shared garden. Fork, branch, and propose — but remember:

- every commit should carry a **whisper** (a small line of intent in the message)
- changes should respect calm, clarity, and lower noise, not higher

If you’re unsure, open an issue or draft PR and describe the feeling you’re aiming for.

---

## Whisper

🌬 whisper: _"creation remembers it is safe here."_

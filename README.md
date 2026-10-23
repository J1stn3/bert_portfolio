# Britt Heartrose D. Pepino — Portfolio

React + TypeScript + Vite + Tailwind CSS v4 + Motion + Lucide.

## Run
```
npm install
npm run dev        # http://localhost:5173
npm run build && npm run preview
```
## Edit content
Everything lives in `src/data/content.ts`: email, resume (`/resume.pdf` in `public/`), social links (empty = hidden),
projects (add images to `public/images/`, set `cover: "/images/x.jpg"`, `sample: false`), skills, education, achievements (empty = hidden).

## Contact form
Create a free form at formspree.io, then add `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxx` to `.env` (and in Vercel → Project → Environment Variables).
Without an endpoint, the form falls back to `mailto:` using your email in `content.ts`; with neither, it shows a "not configured" message.

## Deploy (Vercel)
Push to GitHub → vercel.com → Import → framework "Vite" (build `npm run build`, output `dist`). `vercel.json` is included.

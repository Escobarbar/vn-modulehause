# VN Modulhaus

Modern Next.js website for [vn-modulhaus.de](https://vn-modulhaus.de) – modular homes, premium dark UI, SEO/GEO optimized.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4, shadcn/ui, Motion
- Resend (contact form)

## Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `RESEND_API_KEY` for production email delivery. Without it, dev mode logs form submissions to the console.

## Asset migration

Before `npm run build`, media must exist under `public/`:

```bash
npm run migrate:assets   # downloads from vn-modulhaus.de → public/models, public/media
npm run verify:assets    # fails if manifest paths are missing (also runs as prebuild)
```

Commit `public/media/`, `public/models/`, `public/og-default.jpg`, and `public/logo-vn.png` (brand PNG with transparency, not from migrate) for deploy.

## Routes

- `/` – Homepage
- `/sauna` – Sauna models
- `/[slug]` – Model detail (e.g. `/bushome`)
- `/kontakt`, `/ueber-uns`, `/impressum`, `/datenschutz`
- `/llms.txt` – LLM discovery file

## Deploy (Netlify)

1. Import this repo in [Netlify](https://app.netlify.com).
2. Build settings are in `netlify.toml` (Next.js plugin is auto-installed).
3. Set environment variables from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL` — your Netlify URL or custom domain
   - `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO` — for the contact form

Media is already in the repo (`public/media`, `public/models`); no need to run `migrate:assets` on Netlify unless you refresh assets locally and push again.

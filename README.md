# Otherwise Engaged

A private sabbatical site. Built with Next.js.

**Going live? Do [`LAUNCH.md`](LAUNCH.md) first.**

- **Adding things to the site:** see [`content/README.md`](content/README.md). All the words live in `content/`, photos and videos in `public/`.
- **Design and behaviour:** `app/`. The page is `app/components/Archive.tsx`.
- **Book recommendations:** emailed by `app/components/recommendBook.ts` through Resend; needs `RESEND_API_KEY` (see `content/README.md`).
- **Passphrase gate:** `proxy.ts` checks every request, `app/unlock/` is the gate page, `lib/auth.ts` does the checking. The passphrase is the `SITE_PASSWORD` environment variable (in `.env.local` on your computer).

## Running it on your computer

1. Install Node.js (LTS) from https://nodejs.org
2. In this folder, run `npm install` once, then `npm run dev`
3. Open http://localhost:3000

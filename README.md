# William Nguyen · Portfolio

Minimalist portfolio site for embedded systems, firmware, and robotics internship applications.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4

## Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

## Editing Content

All text, project details, skills, and experience data live in `src/data/content.ts`. Edit that file to update the site; no component changes are needed for content updates.

## Adding Your Resume

Place your resume PDF at `public/William_Nguyen_Resume.pdf`. The hero button links to it.

## Put the site online (job application URL)

You need a **public HTTPS URL**. Two easy options:

### Option A: Vercel (simplest URL, recommended)

1. Push this folder to a GitHub repo (e.g. `Seaphant/portfolio`).
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, **Add New Project**, import that repo.
3. Leave defaults (Vite is auto-detected). Deploy.
4. You get a permanent link like `https://portfolio-xxx.vercel.app`. You can rename the project in Vercel for a cleaner subdomain.

No `VITE_BASE_URL` needed; the build uses `/` as the base path.

### Option B: GitHub Pages (free, stays on GitHub)

1. Push this repo to GitHub. **The public URL path is `https://<username>.github.io/<repo-name>/`** — so name the repo what you want in the path (e.g. `portfolio` → `https://seaphant.github.io/portfolio/`).
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The workflow `.github/workflows/deploy-github-pages.yml` builds with `VITE_BASE_URL=/<repo-name>/` so assets load correctly.

### Manual build check

```bash
npm run build
npm run preview
```

For a **GitHub Pages** path locally, use PowerShell:

```powershell
$env:VITE_BASE_URL='/your-repo-name/'; npm run build; npm run preview
```

## Structure

```
src/
  components/   # React components (Nav, Hero, About, etc.)
  data/         # Site copy (content.ts) + background image URLs (visual.ts)
  App.tsx       # Root layout
  main.tsx      # Entry point
  index.css     # Tailwind + GitHub-style dark theme
```

## Background images

Hero-style backgrounds use low-opacity photos from [Unsplash](https://unsplash.com) (circuit board + lab/hardware). URLs are in `src/data/visual.ts`. Swap them for your own photos anytime; keep opacity low so text stays readable.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website for Jason Chalky — portfolio, app store legal pages, blog, and contact. Built with Astro, Tailwind CSS v4, and MDX. Deployed to GitHub Pages.

## Commands

- `npm run dev` — Start dev server (http://localhost:4321)
- `npm run build` — Build static site to `dist/`
- `npm run preview` — Preview built site locally
- `npx astro add <integration>` — Add an Astro integration

## Architecture

- **Framework:** Astro 6 (static site generation)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin. Theme tokens defined in `src/styles/global.css` under `@theme`.
- **Content:** Three content collections defined in `src/content.config.ts`:
  - `projects` — MDX files in `src/content/projects/`. One per app/game.
  - `blog` — Markdown/MDX in `src/content/blog/`.
  - `legal` — Markdown in `src/content/legal/`. Per-app privacy policy, terms, support. Linked to projects via `project` frontmatter field.
- **Layouts:** `BaseLayout.astro` (all pages), `LegalLayout.astro` (legal pages)
- **Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages. Site base path is `/MyWebsite`.

## Content Conventions

- Project assets (icons, screenshots) go in `public/projects/<slug>/`
- Legal docs use `<slug>-privacy.md`, `<slug>-terms.md`, `<slug>-support.md` naming
- Blog posts use `YYYY-MM-DD-<title>.md` naming
- Internal links must be prefixed with `import.meta.env.BASE_URL` (resolves to `/MyWebsite/`)

## Visual Design

"Command Center" theme — dark background, green (#00ff88) primary accent, monospace section headers, military/terminal aesthetic. All theme tokens in `src/styles/global.css`.

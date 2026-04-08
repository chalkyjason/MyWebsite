# Jason Chalky — Personal Website Design Spec

## Overview

A multi-purpose personal brand website for Jason Chalky that serves as:
- **Portfolio** — showcase games, apps, and projects
- **App Store compliance hub** — host per-app privacy policies, terms of service, and support pages (required by both Apple App Store and Google Play)
- **Blog** — devlogs, tutorials, announcements
- **Contact** — about page with bio, contact form, and social links

## Tech Stack

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Framework | **Astro** | Content-first SSG, zero JS by default, content collections with schema validation |
| Styling | **Tailwind CSS** | Utility-first, fast dark theme development |
| Content | **MDX + Markdown** | MDX for project pages (embeddable components), Markdown for blog and legal docs |
| Hosting | **GitHub Pages** | Free, deploys from repo, custom domain support |
| CI/CD | **GitHub Actions** | Build Astro → deploy to GitHub Pages on push to main |

## Visual Design

**Style: "Command Center"**
- Dark background (`#0a0f1a` to `#0d1117` gradient)
- Primary accent: green (`#00ff88`)
- Secondary accent: amber/yellow (`#ffd93d`) for status indicators
- Typography: monospace for labels/nav/section headers, system sans-serif for body text
- Military/terminal aesthetic — section headers use themed labels (e.g., "MISSION BRIEFING" for games, "PROJECT OVERVIEW" as default). The project page template uses generic labels; per-project MDX can override them.
- Subtle green-tinted borders and glows
- Consistent `font-family: monospace` nav with `> JASON_CHALKY` branding

## Site Structure

### Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero section, featured projects grid, latest blog posts |
| `/projects` | All projects grid |
| `/projects/[slug]` | Individual project page |
| `/projects/[slug]/privacy-policy` | Per-app privacy policy |
| `/projects/[slug]/terms` | Per-app terms of service |
| `/projects/[slug]/support` | Per-app support + data deletion instructions |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual blog post |
| `/about` | Bio, photo, contact form, social links (GitHub, Twitter/X, LinkedIn) |

### Content Collections

```
src/content/
  projects/          # One MDX file per project
    guardian-protocol.mdx
  blog/              # Markdown/MDX blog posts
    2026-04-07-guardian-protocol-launch.mdx
  legal/             # Per-app legal docs (Markdown)
    guardian-protocol-privacy.md
    guardian-protocol-terms.md
    guardian-protocol-support.md
```

### Project Frontmatter Schema

```yaml
title: Guardian Protocol
slug: guardian-protocol
tagline: "Real-time air defense tower defense simulation"
status: testflight  # "live" | "testflight" | "coming-soon"
platform: iOS
techStack: [SpriteKit, Swift, GameKit]
appStoreUrl: ""           # populated when live
testFlightUrl: "https://..." 
screenshots: [screenshot1.png, screenshot2.png]
icon: guardian-protocol-icon.png
features:
  - title: "5 Defense Systems"
    description: "TALON, PRISM, GUARDIAN, EAGLE, SENTINEL"
  - title: "12+ Threat Types"
    description: "Rockets, drones, cruise missiles, ICBMs"
  - title: "15+ Missions"
    description: "5 theaters, escalating difficulty"
  - title: "Budget Management"
    description: "Strategic resource allocation"
relatedBlog: guardian-protocol  # tag to match blog posts
date: 2026-04-07
```

### Legal Doc Frontmatter Schema

```yaml
title: "Privacy Policy"
project: guardian-protocol  # links to parent project
type: privacy-policy  # "privacy-policy" | "terms" | "support"
lastUpdated: 2026-04-07
```

### Blog Post Frontmatter Schema

```yaml
title: "Building Guardian Protocol: A Devlog"
date: 2026-04-07
tags: [guardian-protocol, devlog, spritekit]
description: "How I built an Iron Dome-inspired tower defense game"
```

## Page Designs

### Homepage

1. **Nav** — `> JASON_CHALKY` logo left, `PROJECTS | BLOG | ABOUT` right, monospace
2. **Hero** — "SYSTEM ONLINE" label, name/title, brief tagline
3. **Featured Projects** — card grid with app icon, name, tagline, tech tags, status badge
4. **Latest Blog Posts** — "LATEST TRANSMISSIONS" section with recent post links
5. **Footer** — social links, copyright

### Project Page

1. **Breadcrumb** — `PROJECTS / GUARDIAN PROTOCOL`
2. **Header** — app icon, title, tagline, tech stack tags, status badge
3. **Download CTAs** — adaptive buttons based on `status` field (App Store badge, TestFlight link, or "Coming Soon")
4. **Screenshots** — horizontal scrolling gallery of device-framed screenshots
5. **Description** — "MISSION BRIEFING" — free-form MDX body content
6. **Features** — "SYSTEMS OVERVIEW" — 2-column grid from frontmatter `features` array
7. **Legal Links** — auto-generated links to privacy policy, terms, support if matching legal docs exist for this project
8. **Related Posts** — blog posts tagged with this project's slug

### Blog

- Listing page with post cards (title, date, description, tags)
- Individual post pages with MDX rendering, date, tags, reading time
- Tag-based filtering

### About

- Bio section with photo
- Contact form (Formspree — static form handler, no backend needed)
- Social links: GitHub, Twitter/X, LinkedIn

## /add-project Skill

A Claude Code skill that automates adding new projects to the site:

### Workflow

1. User runs `/add-project /path/to/repo`
2. Agent reads the repo: README, source files, Info.plist, config files, assets
3. Agent generates draft files:
   - `src/content/projects/<slug>.mdx` — project page with description, features, tech stack
   - `src/content/legal/<slug>-privacy.md` — privacy policy tailored to app's data usage (inspects code for analytics, ads, data collection)
   - `src/content/legal/<slug>-terms.md` — terms of service
   - `src/content/legal/<slug>-support.md` — support page with data deletion instructions
   - Copies app icon and screenshots to `public/projects/<slug>/`
4. Agent commits drafts to a new branch: `add-project/<slug>`
5. User reviews, tweaks, and merges

### What the Agent Inspects

- README / any markdown docs for description and feature lists
- Info.plist / project config for app name, bundle ID, version, platform
- Source code for: analytics SDKs, ad frameworks (AdMob, etc.), data collection, network calls, camera/location/contacts permissions
- Asset catalogs for app icon and screenshots
- Package dependencies (SPM, CocoaPods, Podfile) for third-party SDK identification

## Deployment

- GitHub Actions workflow triggers on push to `main`
- Runs `astro build` to produce static HTML
- Deploys output to `gh-pages` branch
- Custom domain configured via CNAME file in `public/`

## Launch Content

Guardian Protocol will be the first project on the site. The `/add-project` skill will generate the initial content, but the first run may need more manual polish since it's establishing the tone and quality bar.

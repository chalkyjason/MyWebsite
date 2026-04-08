# Jason Chalky Personal Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark, military-themed personal portfolio site with project showcases, per-app legal pages, blog, and contact — deployed to GitHub Pages via Astro.

**Architecture:** Astro static site with content collections (projects, blog, legal) using MDX/Markdown. Tailwind CSS v4 for the "Command Center" dark theme. GitHub Actions for CI/CD. A Claude Code `/add-project` skill automates adding new projects from repos.

**Tech Stack:** Astro 5, Tailwind CSS 4, MDX, GitHub Pages, GitHub Actions, Formspree

---

## File Map

```
astro.config.mjs              — Astro config: site URL, MDX integration, Tailwind vite plugin
src/content.config.ts          — Content collection schemas (projects, blog, legal)
src/styles/global.css          — Tailwind import + Command Center theme tokens
src/layouts/BaseLayout.astro   — HTML shell, head meta, nav, footer slot
src/layouts/LegalLayout.astro  — Layout for legal pages (extends BaseLayout)
src/components/Nav.astro       — Top nav: > JASON_CHALKY logo + links
src/components/Footer.astro    — Social links + copyright
src/components/ProjectCard.astro — Project card for grids (icon, title, tagline, tags, status)
src/components/StatusBadge.astro — Live/TestFlight/Coming Soon badge
src/components/FeatureGrid.astro — 2-col feature grid from frontmatter
src/components/ScreenshotGallery.astro — Horizontal scroll screenshot gallery
src/components/BlogPostCard.astro — Blog post card (title, date, description, tags)
src/components/ContactForm.astro — Formspree-powered contact form
src/pages/index.astro          — Homepage: hero, featured projects, latest posts
src/pages/projects/index.astro — All projects grid
src/pages/projects/[slug].astro — Individual project page
src/pages/projects/[slug]/privacy-policy.astro — Per-project privacy policy
src/pages/projects/[slug]/terms.astro — Per-project terms of service
src/pages/projects/[slug]/support.astro — Per-project support page
src/pages/blog/index.astro     — Blog listing
src/pages/blog/[slug].astro    — Individual blog post
src/pages/about.astro          — Bio, contact form, social links
src/plugins/reading-time.mjs   — Remark plugin to calculate reading time
src/content/projects/guardian-protocol.mdx — Guardian Protocol project page
src/content/blog/2026-04-07-welcome.md — Placeholder first blog post
src/content/legal/guardian-protocol-privacy.md
src/content/legal/guardian-protocol-terms.md
src/content/legal/guardian-protocol-support.md
public/projects/guardian-protocol/icon.png — App icon (copied from repo)
.github/workflows/deploy.yml  — GitHub Actions: build + deploy to GitHub Pages
.claude/skills/add-project.md — Claude Code skill for adding projects from repos
```

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`

- [ ] **Step 1: Initialize Astro project**

Run from the repo root (which is currently empty except for `.gitattributes`, `CLAUDE.md`, `docs/`):

```bash
cd /Users/jasonchalky/Documents/GitHub/MyWebsite
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict
```

This scaffolds into the current directory. The `--no-git` flag prevents re-initializing git.

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, `package-lock.json` generated.

- [ ] **Step 3: Add Tailwind CSS and MDX integrations**

```bash
npx astro add tailwind mdx --yes
```

This installs `@tailwindcss/vite`, `tailwindcss`, and `@astrojs/mdx`, and updates `astro.config.mjs` automatically.

- [ ] **Step 4: Configure astro.config.mjs for GitHub Pages**

Replace the contents of `astro.config.mjs` with:

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://chalkyjason.github.io',
  base: '/MyWebsite',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 5: Create global CSS with Command Center theme**

Create `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #0a0f1a;
  --color-bg-secondary: #0d1117;
  --color-bg-card: rgba(0, 255, 136, 0.03);
  --color-border: rgba(0, 255, 136, 0.12);
  --color-border-subtle: rgba(255, 255, 255, 0.06);
  --color-accent: #00ff88;
  --color-accent-dim: rgba(0, 255, 136, 0.1);
  --color-warning: #ffd93d;
  --color-text-primary: #e0e0e0;
  --color-text-secondary: #888888;
  --color-text-muted: #555555;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

body {
  background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 50%, #0a0a0f 100%);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  min-height: 100vh;
}

::selection {
  background: var(--color-accent);
  color: var(--color-bg-primary);
}
```

- [ ] **Step 6: Update the placeholder index page to import the global CSS**

Replace `src/pages/index.astro` with:

```astro
---
import '../styles/global.css';
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Jason Chalky</title>
  </head>
  <body>
    <p class="text-accent font-mono p-8">&gt; SYSTEM ONLINE</p>
  </body>
</html>
```

- [ ] **Step 7: Add .gitignore entries for Astro**

Append to `.gitignore`:

```
node_modules/
dist/
.astro/
```

- [ ] **Step 8: Verify build**

```bash
npm run build
```

Expected: Build succeeds, output in `dist/`.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/ .gitignore
git commit -m "feat: scaffold Astro project with Tailwind CSS and MDX"
```

---

### Task 2: Base Layout, Nav, and Footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/components/Nav.astro`, `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Nav component**

Create `src/components/Nav.astro`:

```astro
---
const navLinks = [
  { label: 'PROJECTS', href: `${import.meta.env.BASE_URL}projects` },
  { label: 'BLOG', href: `${import.meta.env.BASE_URL}blog` },
  { label: 'ABOUT', href: `${import.meta.env.BASE_URL}about` },
];
---

<nav class="flex justify-between items-center px-6 py-4 border-b border-border">
  <a href={import.meta.env.BASE_URL} class="text-accent font-mono font-bold text-sm hover:brightness-125 transition-all">
    &gt; JASON_CHALKY
  </a>
  <div class="flex gap-6">
    {navLinks.map(link => (
      <a href={link.href} class="text-text-muted font-mono text-xs hover:text-accent transition-colors">
        {link.label}
      </a>
    ))}
  </div>
</nav>
```

- [ ] **Step 2: Create Footer component**

Create `src/components/Footer.astro`:

```astro
---
const currentYear = new Date().getFullYear();
const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/chalkyjason' },
  { label: 'Twitter/X', href: '#' },
  { label: 'LinkedIn', href: '#' },
];
---

<footer class="border-t border-border-subtle mt-auto px-6 py-8">
  <div class="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
    <p class="text-text-muted font-mono text-xs">
      &copy; {currentYear} Jason Chalky. All systems operational.
    </p>
    <div class="flex gap-4">
      {socialLinks.map(link => (
        <a href={link.href} class="text-text-muted font-mono text-xs hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      ))}
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Create BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Jason Chalky — Game Developer & iOS Engineer' } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title} | Jason Chalky</title>
    <link rel="icon" type="image/svg+xml" href={`${import.meta.env.BASE_URL}favicon.svg`} />
  </head>
  <body class="min-h-screen flex flex-col">
    <Nav />
    <main class="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 4: Update index.astro to use BaseLayout**

Replace `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home">
  <p class="text-accent font-mono">&gt; SYSTEM ONLINE</p>
</BaseLayout>
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/components/Nav.astro src/components/Footer.astro src/layouts/BaseLayout.astro src/pages/index.astro
git commit -m "feat: add BaseLayout with Nav and Footer components"
```

---

### Task 3: Content Collection Schemas

**Files:**
- Create: `src/content.config.ts`

- [ ] **Step 1: Create content collection config**

Create `src/content.config.ts`:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    tagline: z.string(),
    status: z.enum(['live', 'testflight', 'coming-soon']),
    platform: z.string(),
    techStack: z.array(z.string()),
    appStoreUrl: z.string().optional(),
    testFlightUrl: z.string().optional(),
    screenshots: z.array(z.string()).default([]),
    icon: z.string(),
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).default([]),
    relatedBlog: z.string().optional(),
    date: z.coerce.date(),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    description: z.string(),
  }),
});

const legal = defineCollection({
  loader: glob({ base: './src/content/legal', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    project: z.string(),
    type: z.enum(['privacy-policy', 'terms', 'support']),
    lastUpdated: z.coerce.date(),
  }),
});

export const collections = { projects, blog, legal };
```

- [ ] **Step 2: Create empty content directories**

```bash
mkdir -p src/content/projects src/content/blog src/content/legal
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds with empty collections.

- [ ] **Step 4: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: define content collection schemas for projects, blog, and legal"
```

---

### Task 4: Homepage

**Files:**
- Create: `src/components/ProjectCard.astro`, `src/components/StatusBadge.astro`, `src/components/BlogPostCard.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create StatusBadge component**

Create `src/components/StatusBadge.astro`:

```astro
---
interface Props {
  status: 'live' | 'testflight' | 'coming-soon';
}

const { status } = Astro.props;

const config = {
  live: { label: 'LIVE', class: 'bg-accent/20 text-accent' },
  testflight: { label: 'TESTFLIGHT', class: 'bg-warning/20 text-warning' },
  'coming-soon': { label: 'COMING SOON', class: 'bg-text-muted/20 text-text-muted' },
};

const badge = config[status];
---

<span class:list={['px-2 py-0.5 rounded text-[10px] font-mono tracking-wider', badge.class]}>
  {badge.label}
</span>
```

- [ ] **Step 2: Create ProjectCard component**

Create `src/components/ProjectCard.astro`:

```astro
---
import StatusBadge from './StatusBadge.astro';

interface Props {
  title: string;
  slug: string;
  tagline: string;
  status: 'live' | 'testflight' | 'coming-soon';
  techStack: string[];
  icon: string;
}

const { title, slug, tagline, status, techStack, icon } = Astro.props;
---

<a href={`${import.meta.env.BASE_URL}projects/${slug}`} class="block bg-bg-card border border-border rounded-lg p-5 hover:border-accent/30 transition-all group">
  <div class="flex items-start gap-4">
    <img
      src={`${import.meta.env.BASE_URL}projects/${slug}/${icon}`}
      alt={`${title} icon`}
      class="w-14 h-14 rounded-xl border border-border flex-shrink-0"
      onerror="this.style.display='none'"
    />
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <h3 class="text-text-primary font-bold text-sm group-hover:text-accent transition-colors">{title}</h3>
        <StatusBadge status={status} />
      </div>
      <p class="text-text-secondary text-xs mb-3">{tagline}</p>
      <div class="flex gap-2 flex-wrap">
        {techStack.map(tech => (
          <span class="bg-accent-dim text-accent px-2 py-0.5 rounded text-[10px] font-mono">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
</a>
```

- [ ] **Step 3: Create BlogPostCard component**

Create `src/components/BlogPostCard.astro`:

```astro
---
interface Props {
  title: string;
  slug: string;
  date: Date;
  description: string;
}

const { title, slug, date, description } = Astro.props;
const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
---

<a href={`${import.meta.env.BASE_URL}blog/${slug}`} class="block py-3 border-b border-border-subtle hover:border-accent/20 transition-colors group">
  <div class="flex justify-between items-baseline gap-4">
    <h3 class="text-text-primary text-sm group-hover:text-accent transition-colors">{title}</h3>
    <span class="text-text-muted text-xs font-mono flex-shrink-0">{formattedDate}</span>
  </div>
  <p class="text-text-secondary text-xs mt-1">{description}</p>
</a>
```

- [ ] **Step 4: Build the homepage**

Replace `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '../components/ProjectCard.astro';
import BlogPostCard from '../components/BlogPostCard.astro';
import { getCollection } from 'astro:content';

const projects = (await getCollection('projects')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
const posts = (await getCollection('blog')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime()).slice(0, 5);
---

<BaseLayout title="Home">
  <!-- Hero -->
  <section class="py-12 text-center">
    <p class="text-accent font-mono text-xs tracking-[4px] mb-4">SYSTEM ONLINE</p>
    <h1 class="text-3xl font-bold text-text-primary mb-2">Building games & apps</h1>
    <p class="text-text-secondary text-sm">iOS Developer / Game Designer / Creator</p>
  </section>

  <!-- Featured Projects -->
  {projects.length > 0 && (
    <section class="mb-12">
      <h2 class="text-accent font-mono text-xs tracking-[2px] mb-4">FEATURED PROJECTS</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        {projects.map(project => (
          <ProjectCard
            title={project.data.title}
            slug={project.data.slug}
            tagline={project.data.tagline}
            status={project.data.status}
            techStack={project.data.techStack}
            icon={project.data.icon}
          />
        ))}
      </div>
    </section>
  )}

  <!-- Latest Blog Posts -->
  {posts.length > 0 && (
    <section>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-accent font-mono text-xs tracking-[2px]">LATEST TRANSMISSIONS</h2>
        <a href={`${import.meta.env.BASE_URL}blog`} class="text-accent text-xs font-mono hover:brightness-125">View all &rarr;</a>
      </div>
      <div>
        {posts.map(post => (
          <BlogPostCard
            title={post.data.title}
            slug={post.id}
            date={post.data.date}
            description={post.data.description}
          />
        ))}
      </div>
    </section>
  )}
</BaseLayout>
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Homepage renders with hero section (no projects/posts yet since collections are empty).

- [ ] **Step 6: Commit**

```bash
git add src/components/StatusBadge.astro src/components/ProjectCard.astro src/components/BlogPostCard.astro src/pages/index.astro
git commit -m "feat: build homepage with hero, project grid, and blog post sections"
```

---

### Task 5: Projects Listing and Detail Pages

**Files:**
- Create: `src/components/FeatureGrid.astro`, `src/components/ScreenshotGallery.astro`, `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`

- [ ] **Step 1: Create FeatureGrid component**

Create `src/components/FeatureGrid.astro`:

```astro
---
interface Props {
  features: { title: string; description: string }[];
  sectionLabel?: string;
}

const { features, sectionLabel = 'PROJECT FEATURES' } = Astro.props;
---

{features.length > 0 && (
  <section class="mb-8">
    <h2 class="text-accent font-mono text-xs tracking-[2px] mb-4">{sectionLabel}</h2>
    <div class="grid gap-3 sm:grid-cols-2">
      {features.map(feature => (
        <div class="bg-bg-card border border-border rounded-lg p-4">
          <h3 class="text-text-primary text-sm font-bold mb-1">{feature.title}</h3>
          <p class="text-text-secondary text-xs">{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
)}
```

- [ ] **Step 2: Create ScreenshotGallery component**

Create `src/components/ScreenshotGallery.astro`:

```astro
---
interface Props {
  screenshots: string[];
  projectSlug: string;
  projectTitle: string;
}

const { screenshots, projectSlug, projectTitle } = Astro.props;
---

{screenshots.length > 0 && (
  <section class="mb-8">
    <h2 class="text-accent font-mono text-xs tracking-[2px] mb-4">SCREENSHOTS</h2>
    <div class="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
      {screenshots.map((src, i) => (
        <img
          src={`${import.meta.env.BASE_URL}projects/${projectSlug}/${src}`}
          alt={`${projectTitle} screenshot ${i + 1}`}
          class="h-64 w-auto rounded-lg border border-border flex-shrink-0"
        />
      ))}
    </div>
  </section>
)}
```

- [ ] **Step 3: Create projects listing page**

Create `src/pages/projects/index.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ProjectCard from '../../components/ProjectCard.astro';
import { getCollection } from 'astro:content';

const projects = (await getCollection('projects')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<BaseLayout title="Projects" description="Games, apps, and tools built by Jason Chalky">
  <p class="text-accent font-mono text-xs tracking-[2px] mb-6">ALL PROJECTS</p>
  {projects.length > 0 ? (
    <div class="grid gap-4 sm:grid-cols-2">
      {projects.map(project => (
        <ProjectCard
          title={project.data.title}
          slug={project.data.slug}
          tagline={project.data.tagline}
          status={project.data.status}
          techStack={project.data.techStack}
          icon={project.data.icon}
        />
      ))}
    </div>
  ) : (
    <p class="text-text-muted font-mono text-sm">No projects deployed yet. Stand by.</p>
  )}
</BaseLayout>
```

- [ ] **Step 4: Create project detail page**

Create `src/pages/projects/[slug].astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import StatusBadge from '../../components/StatusBadge.astro';
import FeatureGrid from '../../components/FeatureGrid.astro';
import ScreenshotGallery from '../../components/ScreenshotGallery.astro';
import BlogPostCard from '../../components/BlogPostCard.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map(project => ({
    params: { slug: project.data.slug },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await render(project);

const legalDocs = await getCollection('legal', ({ data }) => data.project === project.data.slug);
const hasPrivacy = legalDocs.some(d => d.data.type === 'privacy-policy');
const hasTerms = legalDocs.some(d => d.data.type === 'terms');
const hasSupport = legalDocs.some(d => d.data.type === 'support');

const relatedPosts = project.data.relatedBlog
  ? (await getCollection('blog', ({ data }) => data.tags.includes(project.data.relatedBlog!))).sort((a, b) => b.data.date.getTime() - a.data.date.getTime()).slice(0, 3)
  : [];

const base = import.meta.env.BASE_URL;
---

<BaseLayout title={project.data.title} description={project.data.tagline}>
  <!-- Breadcrumb -->
  <p class="font-mono text-xs mb-6">
    <a href={`${base}projects`} class="text-text-muted hover:text-accent transition-colors">PROJECTS</a>
    <span class="text-text-muted"> / </span>
    <span class="text-accent">{project.data.title.toUpperCase()}</span>
  </p>

  <!-- Header -->
  <div class="flex items-start gap-5 mb-6">
    <img
      src={`${base}projects/${project.data.slug}/${project.data.icon}`}
      alt={`${project.data.title} icon`}
      class="w-20 h-20 rounded-2xl border border-border flex-shrink-0"
      onerror="this.style.display='none'"
    />
    <div>
      <div class="flex items-center gap-3 mb-1">
        <h1 class="text-2xl font-bold">{project.data.title}</h1>
        <StatusBadge status={project.data.status} />
      </div>
      <p class="text-text-secondary text-sm mb-3">{project.data.tagline}</p>
      <div class="flex gap-2 flex-wrap">
        {project.data.techStack.map(tech => (
          <span class="bg-accent-dim text-accent px-2 py-0.5 rounded text-[10px] font-mono">{tech}</span>
        ))}
      </div>
    </div>
  </div>

  <!-- Download CTAs -->
  <div class="flex gap-3 mb-8">
    {project.data.status === 'live' && project.data.appStoreUrl && (
      <a href={project.data.appStoreUrl} class="bg-accent text-bg-primary px-5 py-2 rounded-lg text-sm font-bold hover:brightness-110 transition-all" target="_blank" rel="noopener noreferrer">
        Download on App Store
      </a>
    )}
    {project.data.status === 'testflight' && project.data.testFlightUrl && (
      <a href={project.data.testFlightUrl} class="bg-accent-dim text-accent border border-accent/30 px-5 py-2 rounded-lg text-sm hover:bg-accent/20 transition-all" target="_blank" rel="noopener noreferrer">
        Join TestFlight
      </a>
    )}
    {project.data.status === 'coming-soon' && (
      <span class="bg-text-muted/10 text-text-muted border border-text-muted/20 px-5 py-2 rounded-lg text-sm">
        Coming Soon
      </span>
    )}
  </div>

  <!-- Screenshots -->
  <ScreenshotGallery
    screenshots={project.data.screenshots}
    projectSlug={project.data.slug}
    projectTitle={project.data.title}
  />

  <!-- Description (MDX body) -->
  <section class="mb-8">
    <h2 class="text-accent font-mono text-xs tracking-[2px] mb-4">PROJECT OVERVIEW</h2>
    <div class="prose prose-invert prose-sm max-w-none text-text-secondary [&_a]:text-accent [&_h3]:text-text-primary [&_strong]:text-text-primary">
      <Content />
    </div>
  </section>

  <!-- Features -->
  <FeatureGrid features={project.data.features} />

  <!-- Legal Links -->
  {(hasPrivacy || hasTerms || hasSupport) && (
    <section class="border-t border-border pt-6 mb-8">
      <div class="flex gap-6">
        {hasPrivacy && <a href={`${base}projects/${project.data.slug}/privacy-policy`} class="text-text-muted font-mono text-[10px] tracking-wider hover:text-accent transition-colors">PRIVACY POLICY</a>}
        {hasTerms && <a href={`${base}projects/${project.data.slug}/terms`} class="text-text-muted font-mono text-[10px] tracking-wider hover:text-accent transition-colors">TERMS OF SERVICE</a>}
        {hasSupport && <a href={`${base}projects/${project.data.slug}/support`} class="text-text-muted font-mono text-[10px] tracking-wider hover:text-accent transition-colors">SUPPORT</a>}
      </div>
    </section>
  )}

  <!-- Related Posts -->
  {relatedPosts.length > 0 && (
    <section>
      <h2 class="text-accent font-mono text-xs tracking-[2px] mb-4">RELATED TRANSMISSIONS</h2>
      {relatedPosts.map(post => (
        <BlogPostCard
          title={post.data.title}
          slug={post.id}
          date={post.data.date}
          description={post.data.description}
        />
      ))}
    </section>
  )}
</BaseLayout>
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Projects pages exist but are empty (no content yet).

- [ ] **Step 6: Commit**

```bash
git add src/components/FeatureGrid.astro src/components/ScreenshotGallery.astro src/pages/projects/
git commit -m "feat: add projects listing and detail pages with feature grid and screenshots"
```

---

### Task 6: Legal Pages

**Files:**
- Create: `src/layouts/LegalLayout.astro`, `src/pages/projects/[slug]/privacy-policy.astro`, `src/pages/projects/[slug]/terms.astro`, `src/pages/projects/[slug]/support.astro`

- [ ] **Step 1: Create LegalLayout**

Create `src/layouts/LegalLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  projectTitle: string;
  projectSlug: string;
  lastUpdated: Date;
}

const { title, projectTitle, projectSlug, lastUpdated } = Astro.props;
const formattedDate = lastUpdated.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const base = import.meta.env.BASE_URL;
---

<BaseLayout title={`${title} — ${projectTitle}`}>
  <p class="font-mono text-xs mb-6">
    <a href={`${base}projects`} class="text-text-muted hover:text-accent transition-colors">PROJECTS</a>
    <span class="text-text-muted"> / </span>
    <a href={`${base}projects/${projectSlug}`} class="text-text-muted hover:text-accent transition-colors">{projectTitle.toUpperCase()}</a>
    <span class="text-text-muted"> / </span>
    <span class="text-accent">{title.toUpperCase()}</span>
  </p>

  <h1 class="text-2xl font-bold mb-2">{title}</h1>
  <p class="text-text-muted text-xs font-mono mb-8">Last updated: {formattedDate}</p>

  <div class="prose prose-invert prose-sm max-w-none text-text-secondary [&_a]:text-accent [&_h2]:text-text-primary [&_h3]:text-text-primary [&_strong]:text-text-primary [&_h2]:font-mono [&_h2]:text-sm [&_h2]:tracking-wider [&_h2]:text-accent">
    <slot />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Create privacy-policy page**

Create `src/pages/projects/[slug]/privacy-policy.astro`:

```astro
---
import LegalLayout from '../../../layouts/LegalLayout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const legalDocs = await getCollection('legal', ({ data }) => data.type === 'privacy-policy');
  const projects = await getCollection('projects');
  return legalDocs.map(doc => {
    const project = projects.find(p => p.data.slug === doc.data.project);
    return {
      params: { slug: doc.data.project },
      props: { doc, projectTitle: project?.data.title ?? doc.data.project },
    };
  });
}

const { doc, projectTitle } = Astro.props;
const { Content } = await render(doc);
---

<LegalLayout title={doc.data.title} projectTitle={projectTitle} projectSlug={doc.data.project} lastUpdated={doc.data.lastUpdated}>
  <Content />
</LegalLayout>
```

- [ ] **Step 3: Create terms page**

Create `src/pages/projects/[slug]/terms.astro`:

```astro
---
import LegalLayout from '../../../layouts/LegalLayout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const legalDocs = await getCollection('legal', ({ data }) => data.type === 'terms');
  const projects = await getCollection('projects');
  return legalDocs.map(doc => {
    const project = projects.find(p => p.data.slug === doc.data.project);
    return {
      params: { slug: doc.data.project },
      props: { doc, projectTitle: project?.data.title ?? doc.data.project },
    };
  });
}

const { doc, projectTitle } = Astro.props;
const { Content } = await render(doc);
---

<LegalLayout title={doc.data.title} projectTitle={projectTitle} projectSlug={doc.data.project} lastUpdated={doc.data.lastUpdated}>
  <Content />
</LegalLayout>
```

- [ ] **Step 4: Create support page**

Create `src/pages/projects/[slug]/support.astro`:

```astro
---
import LegalLayout from '../../../layouts/LegalLayout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const legalDocs = await getCollection('legal', ({ data }) => data.type === 'support');
  const projects = await getCollection('projects');
  return legalDocs.map(doc => {
    const project = projects.find(p => p.data.slug === doc.data.project);
    return {
      params: { slug: doc.data.project },
      props: { doc, projectTitle: project?.data.title ?? doc.data.project },
    };
  });
}

const { doc, projectTitle } = Astro.props;
const { Content } = await render(doc);
---

<LegalLayout title={doc.data.title} projectTitle={projectTitle} projectSlug={doc.data.project} lastUpdated={doc.data.lastUpdated}>
  <Content />
</LegalLayout>
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds. No legal pages generated yet (no content).

- [ ] **Step 6: Commit**

```bash
git add src/layouts/LegalLayout.astro src/pages/projects/\[slug\]/
git commit -m "feat: add legal page routes (privacy policy, terms, support)"
```

---

### Task 7: Blog Pages with Reading Time

**Files:**
- Create: `src/plugins/reading-time.mjs`, `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Create reading time remark plugin**

Create `src/plugins/reading-time.mjs`:

```js
export function remarkReadingTime() {
  return function (tree, { data }) {
    const text = tree.children
      .filter(node => node.type === 'paragraph' || node.type === 'text')
      .map(node => {
        if (node.children) {
          return node.children.map(c => c.value || '').join('');
        }
        return node.value || '';
      })
      .join(' ');

    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    data.astro.frontmatter.minutesRead = `${minutes} min read`;
  };
}
```

- [ ] **Step 2: Add remark plugin to astro config**

Replace `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './src/plugins/reading-time.mjs';

export default defineConfig({
  site: 'https://chalkyjason.github.io',
  base: '/MyWebsite',
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Create blog listing page**

Create `src/pages/blog/index.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BlogPostCard from '../../components/BlogPostCard.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const allTags = [...new Set(posts.flatMap(p => p.data.tags))].sort();
---

<BaseLayout title="Blog" description="Devlogs, tutorials, and announcements from Jason Chalky">
  <p class="text-accent font-mono text-xs tracking-[2px] mb-6">ALL TRANSMISSIONS</p>

  {allTags.length > 0 && (
    <div class="flex gap-2 flex-wrap mb-6">
      {allTags.map(tag => (
        <span class="bg-accent-dim text-accent px-2 py-0.5 rounded text-[10px] font-mono">
          {tag}
        </span>
      ))}
    </div>
  )}

  {posts.length > 0 ? (
    <div>
      {posts.map(post => (
        <BlogPostCard
          title={post.data.title}
          slug={post.id}
          date={post.data.date}
          description={post.data.description}
        />
      ))}
    </div>
  ) : (
    <p class="text-text-muted font-mono text-sm">No transmissions yet. Stand by.</p>
  )}
</BaseLayout>
```

- [ ] **Step 4: Create blog post page**

Create `src/pages/blog/[slug].astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content, remarkPluginFrontmatter } = await render(post);
const formattedDate = post.data.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
---

<BaseLayout title={post.data.title} description={post.data.description}>
  <p class="font-mono text-xs mb-6">
    <a href={`${import.meta.env.BASE_URL}blog`} class="text-text-muted hover:text-accent transition-colors">BLOG</a>
    <span class="text-text-muted"> / </span>
    <span class="text-accent">{post.data.title.toUpperCase()}</span>
  </p>

  <h1 class="text-2xl font-bold mb-2">{post.data.title}</h1>
  <div class="flex items-center gap-4 mb-8">
    <span class="text-text-muted text-xs font-mono">{formattedDate}</span>
    {remarkPluginFrontmatter.minutesRead && (
      <span class="text-text-muted text-xs font-mono">{remarkPluginFrontmatter.minutesRead}</span>
    )}
  </div>

  {post.data.tags.length > 0 && (
    <div class="flex gap-2 flex-wrap mb-8">
      {post.data.tags.map(tag => (
        <span class="bg-accent-dim text-accent px-2 py-0.5 rounded text-[10px] font-mono">
          {tag}
        </span>
      ))}
    </div>
  )}

  <div class="prose prose-invert prose-sm max-w-none text-text-secondary [&_a]:text-accent [&_h2]:text-text-primary [&_h3]:text-text-primary [&_strong]:text-text-primary [&_code]:text-accent [&_code]:bg-accent-dim [&_code]:px-1 [&_code]:rounded">
    <Content />
  </div>
</BaseLayout>
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/plugins/reading-time.mjs astro.config.mjs src/pages/blog/
git commit -m "feat: add blog listing and post pages with reading time"
```

---

### Task 8: About Page with Contact Form

**Files:**
- Create: `src/components/ContactForm.astro`, `src/pages/about.astro`

- [ ] **Step 1: Create ContactForm component**

Create `src/components/ContactForm.astro`:

```astro
---
// Replace YOUR_FORM_ID with your Formspree form ID from https://formspree.io
const formAction = 'https://formspree.io/f/YOUR_FORM_ID';
---

<form action={formAction} method="POST" class="space-y-4">
  <div>
    <label for="name" class="text-accent font-mono text-[10px] tracking-wider block mb-2">NAME</label>
    <input
      type="text"
      id="name"
      name="name"
      required
      class="w-full bg-bg-card border border-border rounded-lg px-4 py-2 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
      placeholder="Your name"
    />
  </div>
  <div>
    <label for="email" class="text-accent font-mono text-[10px] tracking-wider block mb-2">EMAIL</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      class="w-full bg-bg-card border border-border rounded-lg px-4 py-2 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
      placeholder="your@email.com"
    />
  </div>
  <div>
    <label for="message" class="text-accent font-mono text-[10px] tracking-wider block mb-2">MESSAGE</label>
    <textarea
      id="message"
      name="message"
      required
      rows="5"
      class="w-full bg-bg-card border border-border rounded-lg px-4 py-2 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-y"
      placeholder="Your message..."
    ></textarea>
  </div>
  <button
    type="submit"
    class="bg-accent text-bg-primary px-6 py-2 rounded-lg text-sm font-bold font-mono hover:brightness-110 transition-all"
  >
    TRANSMIT
  </button>
</form>
```

- [ ] **Step 2: Create about page**

Create `src/pages/about.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ContactForm from '../components/ContactForm.astro';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/chalkyjason', icon: 'GH' },
  { label: 'Twitter/X', href: '#', icon: 'X' },
  { label: 'LinkedIn', href: '#', icon: 'LI' },
];
---

<BaseLayout title="About" description="About Jason Chalky — game developer and iOS engineer">
  <p class="text-accent font-mono text-xs tracking-[2px] mb-8">ABOUT</p>

  <div class="grid gap-12 lg:grid-cols-2">
    <!-- Bio -->
    <div>
      <h1 class="text-2xl font-bold mb-4">Jason Chalky</h1>
      <div class="text-text-secondary text-sm leading-relaxed space-y-4">
        <p>Game developer and iOS engineer building interactive experiences. Currently focused on mobile games with SpriteKit and Swift.</p>
        <p>This site showcases my projects, hosts required legal documents for my apps, and serves as a home for devlogs and tutorials.</p>
      </div>

      <!-- Social Links -->
      <div class="mt-8">
        <h2 class="text-accent font-mono text-xs tracking-[2px] mb-4">CONNECT</h2>
        <div class="flex gap-4">
          {socialLinks.map(link => (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              class="bg-bg-card border border-border rounded-lg px-4 py-2 text-text-muted font-mono text-xs hover:text-accent hover:border-accent/30 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>

    <!-- Contact Form -->
    <div>
      <h2 class="text-accent font-mono text-xs tracking-[2px] mb-4">SEND TRANSMISSION</h2>
      <ContactForm />
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds. About page renders with bio and contact form.

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactForm.astro src/pages/about.astro
git commit -m "feat: add about page with bio, social links, and contact form"
```

---

### Task 9: Guardian Protocol Launch Content

**Files:**
- Create: `src/content/projects/guardian-protocol.mdx`, `src/content/legal/guardian-protocol-privacy.md`, `src/content/legal/guardian-protocol-terms.md`, `src/content/legal/guardian-protocol-support.md`, `src/content/blog/2026-04-07-welcome.md`, `public/projects/guardian-protocol/icon.png`

- [ ] **Step 1: Copy app icon from Guardian Protocol repo**

```bash
mkdir -p public/projects/guardian-protocol
cp /Users/jasonchalky/Documents/GitHub/GUARDIANPROTOCOL/GuardianProtocol/Assets.xcassets/AppIcon.appiconset/AppIcon.png public/projects/guardian-protocol/icon.png 2>/dev/null || cp /Users/jasonchalky/Documents/GitHub/GUARDIANPROTOCOL/GuardianProtocol/logo.png public/projects/guardian-protocol/icon.png 2>/dev/null || echo "No icon found — add manually"
```

- [ ] **Step 2: Create Guardian Protocol project page**

Create `src/content/projects/guardian-protocol.mdx`:

```mdx
---
title: "Guardian Protocol"
slug: "guardian-protocol"
tagline: "Real-time air defense tower defense simulation"
status: "testflight"
platform: "iOS"
techStack: ["SpriteKit", "Swift", "GameKit"]
testFlightUrl: "https://testflight.apple.com/join/REPLACE_ME"
screenshots: []
icon: "icon.png"
features:
  - title: "5 Defense Systems"
    description: "TALON-1, PRISM-L, GUARDIAN, EAGLE-T, SENTINEL — each with unique stats, ammo, and cost"
  - title: "12+ Threat Types"
    description: "QASSAM rockets, Shahed drones, cruise missiles, hypersonic weapons, MIRV warheads, decoy swarms"
  - title: "15+ Campaign Missions"
    description: "5 theaters — Middle East, Eastern Europe, Pacific, Korea, Gulf — with escalating difficulty"
  - title: "Budget Management"
    description: "Every shot costs money. Balance interception accuracy against resource allocation"
  - title: "Combo Scoring"
    description: "Chain kills for up to 5x score multiplier with precision timing"
  - title: "Power-Ups & Tactics"
    description: "Barrage, EMP strike, carpet strike, shields, and resupply shop between waves"
relatedBlog: "guardian-protocol"
date: 2026-04-07
---

Command air defense batteries to intercept incoming rockets, drones, and missiles targeting civilian cities. Inspired by real-world defense systems like Iron Dome, Guardian Protocol challenges you to protect your cities across increasingly intense scenarios.

### Gameplay

Each mission drops you into a theater of operations with a pre-mission briefing. Threats arrive in waves — starting with simple unguided rockets and escalating to hypersonic missiles and MIRV warheads. You choose which defense batteries to deploy, manage your ammunition and budget, and make split-second interception decisions.

### Three-Star Rating

Every mission is rated on accuracy, civilian protection, and budget efficiency. Perfect scores unlock achievements and push your tactical skills to the limit.
```

- [ ] **Step 3: Create privacy policy**

Create `src/content/legal/guardian-protocol-privacy.md`:

```md
---
title: "Privacy Policy"
project: "guardian-protocol"
type: "privacy-policy"
lastUpdated: 2026-04-07
---

## Overview

Guardian Protocol ("the App") is developed by Jason Chalky. This privacy policy explains how the App collects, uses, and protects your information.

## Information We Collect

### Advertising Data

The App uses Google AdMob to serve advertisements. AdMob may collect:

- Device advertising identifier (IDFA)
- General location data (IP-based, not precise)
- Device information (model, OS version)
- Ad interaction data

You can opt out of personalized advertising through your iOS device settings under Settings > Privacy & Security > Tracking.

### Game Data

Game progress, scores, and settings are stored locally on your device. This data is not transmitted to any server.

### GameKit / Game Center

If you use Game Center features, Apple handles that data according to [Apple's Privacy Policy](https://www.apple.com/privacy/).

## Third-Party Services

| Service | Purpose | Privacy Policy |
|---------|---------|----------------|
| Google AdMob | Advertising | [Google Privacy Policy](https://policies.google.com/privacy) |
| Apple GameKit | Leaderboards & Achievements | [Apple Privacy Policy](https://www.apple.com/privacy/) |

## Data Retention

Local game data persists until you delete the App. We do not retain any user data on external servers.

## Children's Privacy

The App does not knowingly collect personal information from children under 13. AdMob is configured to comply with COPPA requirements.

## Changes to This Policy

We may update this policy from time to time. Changes will be posted on this page with an updated date.

## Contact

If you have questions about this privacy policy, please contact us through the [support page](/MyWebsite/projects/guardian-protocol/support).
```

- [ ] **Step 4: Create terms of service**

Create `src/content/legal/guardian-protocol-terms.md`:

```md
---
title: "Terms of Service"
project: "guardian-protocol"
type: "terms"
lastUpdated: 2026-04-07
---

## Acceptance of Terms

By downloading, installing, or using Guardian Protocol ("the App"), you agree to these Terms of Service.

## License

The App is licensed, not sold, to you. Jason Chalky grants you a limited, non-exclusive, non-transferable, revocable license to use the App for personal, non-commercial purposes.

## Intellectual Property

All content in the App — including game mechanics, artwork, sounds, and code — is the property of Jason Chalky and is protected by copyright law.

## Acceptable Use

You agree not to:

- Reverse engineer, decompile, or disassemble the App
- Modify or create derivative works based on the App
- Use the App for any commercial purpose without written consent
- Exploit bugs or glitches for unfair advantage in leaderboards

## In-App Advertising

The App contains advertisements served by Google AdMob. By using the App, you acknowledge and accept the display of ads.

## Disclaimer of Warranties

The App is provided "as is" without warranty of any kind. Jason Chalky makes no warranties regarding the App's availability, accuracy, or fitness for a particular purpose.

## Limitation of Liability

To the maximum extent permitted by law, Jason Chalky shall not be liable for any indirect, incidental, or consequential damages arising from your use of the App.

## Changes to Terms

These terms may be updated at any time. Continued use of the App after changes constitutes acceptance of the revised terms.

## Contact

For questions about these terms, please visit the [support page](/MyWebsite/projects/guardian-protocol/support).
```

- [ ] **Step 5: Create support page**

Create `src/content/legal/guardian-protocol-support.md`:

```md
---
title: "Support"
project: "guardian-protocol"
type: "support"
lastUpdated: 2026-04-07
---

## Contact

For bug reports, feature requests, or general questions about Guardian Protocol, please reach out:

- **Email:** support@jasonchalky.com
- **GitHub Issues:** [github.com/chalkyjason/GUARDIANPROTOCOL](https://github.com/chalkyjason/GUARDIANPROTOCOL/issues)

## Frequently Asked Questions

### The game crashes on launch

Make sure you are running iOS 18.0 or later. Try deleting and reinstalling the App.

### My progress was lost

Game progress is stored locally on your device. If you deleted and reinstalled the App, progress cannot be recovered. A future update may include iCloud sync.

### How do I report a bug?

Please open a GitHub issue with:

1. Your device model and iOS version
2. A description of what happened
3. Steps to reproduce the issue

## Data Deletion

Guardian Protocol stores all game data locally on your device. To delete all data associated with the App:

1. Open **Settings** on your iOS device
2. Go to **General** > **iPhone Storage**
3. Find and tap **Guardian Protocol**
4. Tap **Delete App**

This removes all locally stored game data. No data is stored on external servers, so no additional deletion request is needed.

If you have used Game Center features, you can manage that data through your Apple ID settings.
```

- [ ] **Step 6: Create welcome blog post**

Create `src/content/blog/2026-04-07-welcome.md`:

```md
---
title: "System Online"
date: 2026-04-07
tags: ["announcement"]
description: "Welcome to my personal site — a hub for my games, apps, and development updates."
---

This site is officially live. Here you'll find my projects, devlogs, tutorials, and all the legal docs required by app stores.

First up: **Guardian Protocol** is currently in TestFlight. It's a tower defense game inspired by real-world air defense systems. You command batteries like TALON, PRISM, and SENTINEL to intercept incoming threats across 15+ campaign missions.

More details on the [Guardian Protocol project page](/MyWebsite/projects/guardian-protocol).

Stay tuned for devlogs breaking down how it was built — SpriteKit game architecture, wave spawning systems, scoring mechanics, and more.
```

- [ ] **Step 7: Verify full site build**

```bash
npm run build
```

Expected: Build succeeds. All pages generated including Guardian Protocol project page, legal pages, blog post, and homepage with content.

- [ ] **Step 8: Quick visual check**

```bash
npm run preview
```

Open `http://localhost:4321/MyWebsite/` and spot-check:
- Homepage shows Guardian Protocol card and welcome blog post
- `/projects/guardian-protocol` renders with features, legal links
- `/projects/guardian-protocol/privacy-policy` renders
- `/blog/2026-04-07-welcome` renders with reading time
- `/about` renders with form

Kill the preview server when done (Ctrl+C).

- [ ] **Step 9: Commit**

```bash
git add src/content/ public/projects/
git commit -m "feat: add Guardian Protocol content (project page, legal docs, blog post)"
```

---

### Task 10: GitHub Actions Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create GitHub Actions workflow**

```bash
mkdir -p .github/workflows
```

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - name: Install, build, and upload
        uses: withastro/action@v6

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

- [ ] **Step 2: Verify workflow syntax**

```bash
cat .github/workflows/deploy.yml
```

Confirm YAML is valid and actions versions are correct.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow for GitHub Pages deployment"
```

Note: After pushing, go to the GitHub repo Settings > Pages and set the source to "GitHub Actions".

---

### Task 11: /add-project Skill

**Files:**
- Create: `.claude/skills/add-project.md`

- [ ] **Step 1: Create the skill file**

```bash
mkdir -p .claude/skills
```

Create `.claude/skills/add-project.md`:

````md
---
name: add-project
description: Add a new project to the website by analyzing a local repo. Generates project page, legal docs, and copies assets.
---

# Add Project to Website

You are adding a new project to the Jason Chalky personal website (Astro static site).

## Input

The user provides a path to a local repository: `/path/to/repo`

## Steps

### 1. Analyze the Repository

Read and gather information from the repo:

- **README.md** or any markdown docs — extract description, features, and marketing copy
- **Info.plist** or project config files (project.yml, Package.swift, build.gradle) — extract app name, bundle ID, version, platform
- **Source code** — scan for:
  - Analytics SDKs (Firebase, Mixpanel, Amplitude)
  - Ad frameworks (AdMob, Facebook Ads, Unity Ads)
  - Data collection patterns (network calls, UserDefaults, CoreData, CloudKit)
  - Privacy-sensitive permissions (NSCameraUsageDescription, NSLocationUsageDescription, NSContactsUsageDescription in Info.plist)
- **Asset catalogs** — find app icon (AppIcon.appiconset) and any screenshots
- **Package dependencies** (Package.swift, Podfile, package.json) — identify third-party SDKs

### 2. Generate a Slug

Derive a URL-friendly slug from the app name (e.g., "Guardian Protocol" → "guardian-protocol").

### 3. Copy Assets

```bash
mkdir -p public/projects/<slug>
```

Copy the app icon to `public/projects/<slug>/icon.png`. If multiple icon sizes exist, prefer the largest one.

Copy any screenshots found to `public/projects/<slug>/`.

### 4. Generate Project Page

Create `src/content/projects/<slug>.mdx` with frontmatter matching this schema:

```yaml
title: "<App Name>"
slug: "<slug>"
tagline: "<one-line description>"
status: "coming-soon"  # ask user or check TestFlight/App Store presence
platform: "<iOS/Android/Web>"
techStack: [<detected frameworks>]
appStoreUrl: ""
testFlightUrl: ""
screenshots: [<copied screenshot filenames>]
icon: "icon.png"
features:
  - title: "<feature>"
    description: "<description>"
relatedBlog: "<slug>"
date: <today's date YYYY-MM-DD>
```

Write an MDX body with a description and any relevant details from the README.

### 5. Generate Legal Documents

Create these three files:

**`src/content/legal/<slug>-privacy.md`** — Privacy policy tailored to the app's actual data usage. Base it on what you found in step 1:
- If the app uses ads → document the ad SDK's data collection
- If the app uses analytics → document what's tracked
- If the app accesses camera/location/contacts → document why and what's stored
- If the app has no data collection → state that clearly

**`src/content/legal/<slug>-terms.md`** — Terms of service covering license, IP, acceptable use, and disclaimers.

**`src/content/legal/<slug>-support.md`** — Support page with contact info, FAQ placeholders, and data deletion instructions. Data deletion instructions must explain how to remove all app data (usually: delete the app from device, plus any server-side deletion if applicable).

All legal docs must have correct frontmatter:

```yaml
title: "<Privacy Policy|Terms of Service|Support>"
project: "<slug>"
type: "<privacy-policy|terms|support>"
lastUpdated: <today's date YYYY-MM-DD>
```

### 6. Create Branch and Commit

```bash
git checkout -b add-project/<slug>
git add public/projects/<slug>/ src/content/projects/<slug>.mdx src/content/legal/<slug>-*
git commit -m "feat: add <App Name> project page and legal docs"
```

### 7. Verify Build

```bash
npm run build
```

Confirm the build succeeds and the new pages are generated.

### 8. Report to User

Tell the user:
- What was generated (project page, privacy policy, terms, support)
- What data collection was detected and reflected in the privacy policy
- What they should review and customize (especially: status, testFlightUrl/appStoreUrl, screenshots, bio text in legal docs, FAQ in support)
- The branch name so they can review and merge
````

- [ ] **Step 2: Verify the skill is readable**

```bash
cat .claude/skills/add-project.md | head -5
```

Expected: Shows the frontmatter header.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/add-project.md
git commit -m "feat: add /add-project Claude Code skill for automated project pages"
```

---

### Task 12: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update CLAUDE.md with project details**

Replace `CLAUDE.md` with content reflecting the actual project:

```md
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

- **Framework:** Astro 5 (static site generation)
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
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with project architecture and conventions"
```

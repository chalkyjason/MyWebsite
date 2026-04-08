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

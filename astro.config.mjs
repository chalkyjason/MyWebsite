import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './src/plugins/reading-time.mjs';

export default defineConfig({
  site: 'https://chalkyjason.github.io',
  base: '/MyWebsite/',
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

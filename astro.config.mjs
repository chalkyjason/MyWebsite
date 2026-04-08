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

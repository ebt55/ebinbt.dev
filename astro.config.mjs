// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ebinbt.dev',
  output: 'static',
  trailingSlash: 'always',
  // Astro 7 defaults compressHTML to 'jsx', which strips whitespace between inline
  // elements the way React does. This site relies on ordinary HTML whitespace
  // (e.g. " · " separators between inline links), so keep the classic behaviour.
  compressHTML: true,
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  devToolbar: { enabled: false },
});

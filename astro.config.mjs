import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are filled in automatically by GitHub when the site
// is built, so the same code works on tedeye2k.github.io and emmanueledet.com.
export default defineConfig({
  site: process.env.SITE_URL || 'https://emmanueledet.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  // Writes sitemap-index.xml, the list of pages search engines read
  integrations: [sitemap()],
});

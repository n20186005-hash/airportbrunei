import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// URL produksi sebenar. Bila diisi, canonical/OG mutlak, sitemap dan
// arahan Sitemap dalam robots.txt dijana secara automatik.
const site = 'https://airportbrunei.com';

export default defineConfig({
  site: site || undefined,
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});

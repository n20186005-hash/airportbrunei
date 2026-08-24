import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Tetapkan URL produksi sebenar hanya di sini apabila domain sudah tersedia.
// Biarkan kosong semasa pembangunan. Canonical/OG/sitemap akan turun taraf dengan selamat.
const site = '';

export default defineConfig({
  site: site || undefined,
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});

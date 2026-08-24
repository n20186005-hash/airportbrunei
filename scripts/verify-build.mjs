import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const banned = ['example.com', 'localhost', 'chrome-extension://'];
const textExtensions = new Set(['.html', '.xml', '.txt', '.js', '.css', '.json']);

if (!existsSync(dist)) {
  console.error('dist/ tidak wujud. Jalankan pnpm build dahulu.');
  process.exit(1);
}

const files = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else files.push(path);
  }
}
walk(dist);

let failed = false;
for (const file of files) {
  const ext = file.slice(file.lastIndexOf('.'));
  if (!textExtensions.has(ext)) continue;
  const text = readFileSync(file, 'utf8');
  for (const needle of banned) {
    if (text.includes(needle)) {
      console.error(`Kandungan terlarang "${needle}" ditemui dalam ${relative(root, file)}`);
      failed = true;
    }
  }
}

const sitemapFiles = files.filter((f) => /sitemap.*\.xml$/.test(f));
if (sitemapFiles.length === 0) {
  console.log('Sitemap tidak dijana kerana Astro site belum ditetapkan — ini ialah tingkah laku yang disengajakan.');
} else {
  for (const file of sitemapFiles) {
    const text = readFileSync(file, 'utf8');
    if (/<lastmod>/i.test(text)) {
      console.error(`lastmod ditemui dalam ${relative(root, file)}; projek ini tidak membenarkan lastmod rekaan.`);
      failed = true;
    }
    const locs = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    for (const loc of locs) {
      if (!/^https:\/\//i.test(loc) || banned.some((x) => loc.includes(x))) {
        console.error(`URL sitemap tidak sah: ${loc}`);
        failed = true;
      }
    }
  }
}

if (failed) process.exit(1);
console.log(`Audit dist selesai: ${files.length} fail diperiksa, tiada kandungan terlarang.`);

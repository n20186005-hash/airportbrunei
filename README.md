# Independent BWN visitor guide

Malay static Astro site for Brunei International Airport. Existing homepage and three policy/settings URLs are preserved. Sources and credits: SOURCES.md. No live flights, bookings, immigration decisions or airport customer service are provided.

Use pinned Node/pnpm versions from package.json and the lockfile. Verify with `pnpm check`, `pnpm build`, `pnpm audit:build`, and `node scripts/behavior-test.mjs`. `ASTRO_TELEMETRY_DISABLED=1` avoids local telemetry setup. Preserve existing tracked dist convention, including new stylesheet hashes and consent assets.

Worker ASSETS serves the site, canonicalizes HTTP/www with path/query preserved, and returns real noindex 404. The official repository Cloudflare Workers Builds check identifies project airportbrunei. No domain binding or security setting is changed here.

Optional analytics stops immediately when refused. Storage failures keep stale grants from reviving and the settings UI explains persistence limits. Google Maps iframe is a separate disclosed third-party connection. No contact form, account or booking interface exists.

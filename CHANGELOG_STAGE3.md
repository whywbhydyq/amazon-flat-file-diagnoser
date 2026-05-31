# Stage 3 factual rule correction

Date: 2026-05-30

## Scope

Static source/content update only. No npm install, build, lint, typecheck, or tests were run.

## Changes

- Corrected Amazon error 13013 from image URL issue to SKU/catalog not found or deleted.
- Corrected Amazon error 8058 from brand/classification conflict to invalid or missing field value based on current template valid values.
- Corrected Amazon error 20000 from general processing failure to media/image URL cannot be accessed.
- Updated app.js rules, likely fields, fix steps, rule source URLs, and confidence labels for 13013, 8058, and 20000.
- Updated sample Processing Report rows so image URL failure uses 20000 and catalog/SKU status uses 13013.
- Rewrote the three corresponding long-tail pages with corrected TDK, H1, JSON-LD, examples, field tables, checklists, source sections, and internal links.
- Updated hub/index/listing cross-links to avoid repeating the incorrect old meanings.

## Verification

- node --check app.js
- JSON parse package.json / vercel.json / site.webmanifest
- JSON-LD parse for HTML files
- sitemap XML parse
- grep for old incorrect phrases

# Stage 6 — Rule data structure refactor

Date: 2026-05-30

## Scope

This stage refactors the Amazon flat file error rule data in `app.js` from positional arrays plus a separate `ruleSources` map into a single object-per-error structure.

No new pages were added. The homepage layout, parsing flow, export flow, sitemap, canonical URLs, and guide page content were not redesigned in this stage.

## Changes

- Replaced positional rule arrays such as `[title, severity, fields, explanation, fixSteps]` with named object fields:
  - `title`
  - `severity`
  - `likelyFields`
  - `explanation`
  - `fixSteps`
  - `sourceLabel`
  - `sourceUrl`
  - `confidence`
  - `lastChecked`
- Removed the separate `ruleSources` object.
- Updated `rule(code)` to return a complete rule object directly.
- Updated the visible error code grid to read `r.title`, `r.sourceUrl`, `r.sourceLabel`, and `r.confidence` from the unified rule object.
- Kept the unknown-code fallback as an explicit heuristic rule with `confidence: "needs-review"`.

## Why this matters

The previous array-based structure was compact but fragile. Adding or editing rules could easily place a field in the wrong position, causing titles, severity, likely fields, explanations, and sources to drift out of sync.

The new object structure makes future rule updates safer and keeps the visible result card, Markdown export, CSV export, source label, and confidence label aligned with the same rule record.

## Checks performed

- `node --check app.js`
- `node --check scripts/ignore-old-commit.js`
- JSON parse for `package.json`, `vercel.json`, and `site.webmanifest`
- JSON-LD parse across all HTML pages
- `sitemap.xml` XML parse
- canonical URL count equals sitemap URL count
- no internal `.html` links
- no remaining `ruleSources` references
- no remaining positional `r[0]` through `r[4]` rule reads

## Not performed

- No `npm install`
- No `npm run build`
- No lint/typecheck/test command
- No GitHub commit

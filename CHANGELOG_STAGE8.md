# Stage 8 – Repair preview and manual review queue

## Completed

- Added a preview table for safe repaired-file draft edits before download.
- Added a separate manual-review-needed CSV export for rows that should not be automatically changed.
- Added manual-review row classification for missing parent_sku, missing parent rows, theme mismatch, missing variation attributes, parent sellable fields, and duplicate SKU rows.
- Added `manual_review_needed_csv_downloaded` event tracking.
- Updated validation and technical-hardening docs.

## Boundaries preserved

- No Seller Central login.
- No server-side file upload.
- No automatic parent_sku inference.
- No automatic size/color/style/material invention.
- No automatic clearing of parent price or quantity.
- No automatic catalog conflict repair.

## Local checks run

- `node --check app.js`
- `node --check contact.js`
- `node --check scripts/ignore-old-commit.js`
- internal static link check

No `npm run build` or tests were run.

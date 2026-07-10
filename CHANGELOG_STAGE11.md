# Stage 11: feature-rationale audit and repair safety hardening

Date: 2026-05-31

## What changed

- Audited the added variation triage, safe repair draft, manual-review CSV, contact flow, and sample fixture features against the productization goal.
- Tightened safe repaired draft generation so it only edits rows when the child references a present, non-duplicate parent SKU.
- Prevented safe repair edits for duplicate-SKU rows, missing-parent rows, and ambiguous family-theme rows.
- Updated repaired-file documentation to describe the stricter safety boundary.
- Updated sample fixture expectations to match current safe-draft behavior.
- Added `docs/feature-rationale-audit.md` to document why each added feature should stay and where its boundary is.

## Why this matters

The product should not drift into an overpromising Amazon catalog repair tool. This stage keeps the tool positioned as:

- Processing Report checker;
- flat-file / variation triage layer;
- narrow safe draft generator;
- manual-review queue for ambiguous or catalog-sensitive rows.

## Checks performed

- `node --check app.js`
- `node --check contact.js`
- `node --check scripts/ignore-old-commit.js`
- Static internal-link scan excluding Vercel runtime script.

No `npm run build` or test suite was run.

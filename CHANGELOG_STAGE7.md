# Stage 7 - Lightweight technical polish

Date: 2026-05-30

## Changes

- Added low-risk security headers in `vercel.json`: `Permissions-Policy` and `X-Frame-Options`.
- Added manifest icons and generated `/icons/icon-192.png` and `/icons/icon-512.png`.
- Added favicon and Apple touch icon links to HTML pages.
- Refined sitemap priorities by page role: homepage, core guides, supporting guides, error-code pages, legal/about pages.
- Updated CSV export filenames to include a sanitized source report filename slug and date.

## Not changed

- No homepage redesign.
- No new URLs.
- No parser or rules behavior changes beyond the CSV filename.
- No build, test, lint, or typecheck commands were run.

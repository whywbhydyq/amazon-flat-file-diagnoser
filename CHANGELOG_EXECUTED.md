# Executed changes

- Added field-based diagnosis grouping: results now support code / SKU / row / field views.
- Added affected field count to summary cards and copied Markdown output.
- Normalized Amazon error codes from error-code / error-message using 4-5 digit extraction.
- Removed unsafe whole-row fallback that could misread SKU numbers as error codes.
- Added UTF-8 BOM, UTF-16LE and UTF-16BE text decoding for uploaded reports.
- Made the full upload dropzone clickable while preserving drag-and-drop and keyboard behavior.
- Compressed the homepage hero, H1, metric strip spacing and dropzone height.
- Converted internal HTML links from .html URLs to clean URLs.
- Rebuilt sitemap.xml to include all 23 HTML pages and removed humans.txt from sitemap.
- Updated privacy policy to disclose Google AdSense / ad cookies / third-party ad services.
- Kept existing vercel.json ignoreCommand unchanged.

Validation performed:

- node --check app.js
- node --check scripts/ignore-old-commit.js
- JSON parse check for package.json, vercel.json, site.webmanifest
- sitemap URLs matched all HTML canonical page paths
- grep confirmed no internal ./page.html links remain

Not performed:

- npm install
- npm run build
- tests
- lint
- typecheck

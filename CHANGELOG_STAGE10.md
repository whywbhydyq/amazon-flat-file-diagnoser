# Stage 10 — Sample fixtures and manual QA hardening

## Changed

- Added public synthetic sample files under `/samples` for Processing Report and variation flat file flows.
- Added a `Load sample flat file` button next to the existing sample report button.
- Added downloadable sample links so users can inspect the file format before uploading their own data.
- Added `sample_flat_file_loaded` tracking event.
- Updated `package.json` `check` script to include `contact.js` syntax checking.

## Added

- `docs/sample-fixtures.md` describing expected manual QA behavior and parser safety boundaries.

## Safety boundary

The new flat file sample intentionally contains `item_package_quantity` and `quantity` together so manual QA can confirm the parser does not treat package quantity as sellable inventory quantity.

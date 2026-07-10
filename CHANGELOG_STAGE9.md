# Stage 9 — Code audit hardening

Date: 2026-05-31

## Findings

- The flat file column matcher still used broad substring matching after exact alias matching.
- This could misclassify `item_package_quantity` as sellable `quantity`, or other package/count fields as inventory-like fields.
- That false positive could push safe rows into `manual-review-needed.csv` as `Parent row contains sellable fields`.

## Changes

- Tightened `flatFindCol()` matching for strict numeric/operational fields:
  - `quantity`
  - `price`
  - `unitCount`
  - `unitCountType`
  - `itemPackageQuantity`
  - `fulfillmentLatency`
- These fields now require an exact normalized alias match instead of substring matching.
- Kept conservative fuzzy matching for descriptive variation fields where templates often vary.
- Added `noopener` to external links that used `target="_blank"` with `noreferrer` only.

## Not changed

- No build was run.
- No test suite was run.
- No automatic repair scope was expanded.

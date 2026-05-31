# Sample fixtures

These public sample files are intentionally synthetic. They are designed for manual QA, product demos, and user onboarding. They do not contain real seller data.

## Files

- `/samples/sample-processing-report.tsv`
- `/samples/sample-variation-flat-file.tsv`

## Expected Processing Report behavior

Loading the sample report should show six report rows and these major fixability buckets:

- `Needs catalog review` for Error 8541.
- `File-fixable` for Error 99010.
- `Needs variation triage` for Error 90244.
- `Check upload sequence` for Error 13013.
- `Low-risk formatting` for Error 20000 and 90112.

## Expected flat file behavior

Loading the sample flat file should produce a variation family map with:

- Two parent rows.
- Eight child rows.
- One child with missing `relationship_type` and missing `variation_theme` that can be safely filled from the same present parent family.
- One additional child with missing `variation_theme` but enough family context to safely fill the theme, while its missing `size_name` must remain manual review.
- One child with blank `parent_sku`, which must remain manual review.
- One child pointing to a missing parent SKU, which must remain manual review.
- One duplicate SKU pair, which must remain manual review.
- One parent row with sellable `standard_price` and `quantity`, which must remain manual review.
- `item_package_quantity` present in the file; it should not be treated as sellable inventory quantity.

## Boundaries

The sample fixture intentionally does not represent an Amazon-approved upload file. It is a compact diagnostic fixture that exercises the browser parser and repair-safety boundaries.

# Safe repaired flat file draft boundary

Updated: 2026-05-31

This note defines the narrow first version of repaired flat file generation. The generator is intentionally conservative: it only writes a downloadable draft when a value can be inferred from the uploaded flat file itself.

## Evidence behind the boundary

| Evidence | Source | Product implication |
|---|---|---|
| Amazon directs sellers to use the Processing Report after inventory file upload errors. | https://sellercentral.amazon.com/help/hub/reference/external/GY39J4HS7TZYXZJK | Diagnosis starts from the report; repair generation must remain tied to concrete rows, fields, and SKUs. |
| Child variation rows should use the same variation theme chosen for the parent. | https://sellercentral.amazon.com/help/hub/reference/external/GEKYC26YEZX2VSHM | It is safe to fill a blank `variation_theme` only when the same parent family already has exactly one non-empty theme. |
| Error 8058 means invalid or missing attribute values. | https://sellercentral.amazon.com/help/hub/reference/external/G24501 | Missing values can be file-fixable, but valid values still depend on the active category template. |
| Error 8541 can be a product ID / existing ASIN conflict involving brand, title, color, size, or other catalog attributes. | https://sellercentral.amazon.com/gp/help/external/G200692330 | 8541 must not trigger automatic repaired-file generation. It should route to catalog review or Seller Support evidence. |
| Error 8036 can reflect a restriction on creating variation relationships. | https://sellercentral.amazon.com/help/hub/reference/external/G2SCG3A2RBTHSJMC | 8036 is not a normal field-fill repair. It should route to policy/catalog review. |
| Fiverr and Upwork already sell parent-child variation and flat-file repair services. | https://www.fiverr.com/gigs/parent-child-listing and https://www.upwork.com/freelance-jobs/apply/Amazon-Catalog-Variation-Specialist-for-Listing-Troubleshooting_~022056807300346199157/ | Repaired-file generation is a credible paid-service bridge, but the free draft must remain scoped and explainable. |

## Auto-generated draft rules

The first generator may fill:

1. Missing `relationship_type` on child rows with `Variation` when the `relationship_type` column exists **and** the child references a present, non-duplicate parent SKU.
2. Missing `variation_theme` on parent or child rows when the same present, non-duplicate family has exactly one non-empty theme already present in the file.

The generator does not fill:

- missing `parent_sku`
- missing `size_name`, `color_name`, `style_name`, `material_type`, `unit_count`, or `unit_count_type`
- missing or invalid product identifiers
- missing titles, brands, browse nodes, images, dimensions, or compliance attributes
- catalog conflicts such as 8541
- account/policy restrictions such as 8036
- parent row price / quantity clearing
- duplicate SKU resolution

## Why these limits matter

The repaired draft is useful as a confidence-building step, not a promise of final Amazon acceptance. Some Amazon flat file failures are deterministic file-format problems; others are catalog-state, policy, brand, contribution, or valid-value problems. The UI must keep those categories separate.

## Events to monitor

- `flat_file_uploaded`
- `repaired_flat_file_draft_downloaded`
- `repaired_file_clicked`
- `manual_review_clicked`

A strong signal is not only downloads. A stronger signal is a user downloading a safe draft and then still requesting a manual repair for the remaining non-draft issues.

## Stage 5: preview diff and manual-review export

The generator now splits uploaded flat-file findings into two separate outputs before the user downloads anything:

1. **Safe draft edits** — rows and columns that will be changed in the repaired draft, including the original blank value, the proposed value, and the reason.
2. **Manual-review-needed CSV** — rows that should not be changed automatically because the checker lacks source truth or the issue may be catalog-sensitive.

Manual-review CSV currently includes:

- child rows with missing `parent_sku`;
- child rows whose `parent_sku` points to a parent SKU not present in the uploaded file;
- variation families with mixed `variation_theme` values;
- missing `variation_theme` that cannot be inferred from a single family theme;
- missing variation attributes such as size, color, style, material, unit count, or unit count type;
- parent rows containing price or quantity values;
- duplicate SKU rows.

This keeps the automatic repaired draft intentionally conservative. The tool still does not infer source product data, clear sellable parent fields, resolve duplicate rows, or fix ASIN/catalog contribution conflicts.

New validation event:

- `manual_review_needed_csv_downloaded`

Use this together with `repaired_flat_file_draft_downloaded` to see whether users value the split between safe edits and manual catalog work.


## Stage 8: safety audit refinement

The repaired draft generator is now stricter about when a row is considered safe to edit. It will not create safe draft edits for rows whose parent SKU is missing from the file, rows that belong to a duplicate SKU, or rows whose family has conflicting themes. Those rows remain in `manual-review-needed.csv` instead.

This keeps the product promise aligned with the triage positioning: the tool may fill narrow, explainable blanks, but it does not resolve ambiguous family design, missing source data, duplicate row conflicts, or catalog-state problems.

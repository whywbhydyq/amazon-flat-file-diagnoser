# Technical hardening notes

Updated: 2026-05-31

## Security and privacy boundaries

- The checker remains browser-only for Processing Report and flat file parsing.
- The free flow does not ask for Seller Central login, buyer/order data, store credentials, or full account screenshots.
- The contact page now generates two briefs:
  - Private brief: includes optional contact details for private communication.
  - Public-safe brief: removes contact name and email before opening a GitHub Issue.
- GitHub Issue links must use the public-safe brief only.

## Parser scope

Currently supported uploads:

- `.txt`
- `.csv`
- `.tsv`

Not supported in this phase:

- `.xlsx`
- `.xlsm`
- direct Seller Central API access
- automatic upload to Amazon

## Flat file triage checks

The first version checks fields commonly visible in exported or text flat files:

- `sku`
- `parentage`
- `parent_sku`
- `relationship_type`
- `variation_theme`
- `color_name` / `color`
- `size_name` / `size`
- `style_name` / `style`
- `material_type` / `material`
- `unit_count` / `unit_count_type`
- `price`
- `quantity`

Detected signals:

- child rows missing `parent_sku`
- `parent_sku` pointing to a missing SKU
- variation theme mismatch inside a family
- missing variation theme
- child rows missing `relationship_type`
- child rows missing variation attributes implied by the theme
- parent rows containing sellable fields such as price or quantity
- duplicate SKU rows

## Known limits

- Column names vary by category, marketplace, template version, and export path; alias coverage must expand from real user files.
- The parser can detect structural file symptoms, but it cannot verify actual catalog ownership, ASIN contribution priority, Brand Registry state, or account-level policy restrictions.
- Error 90244 is often a valid-value issue, not always a parent-child issue, so the UI routes it to triage instead of promising file repair.
- Error 8036 can reflect a policy/account-level restriction, so the UI routes it to catalog/policy review.

## Checks run in this phase

Run locally after changes:

```bash
node --check app.js
node --check contact.js
node --check scripts/ignore-old-commit.js
```

Do not run `npm run build` or automated tests in this project workflow.

## Safe repaired-file draft generator

Added in the current phase:

- The flat file parser now preserves the detected delimiter so a repaired draft can be serialized in the same broad format.
- The generator only fills low-risk blank fields that can be inferred from the same uploaded flat file.
- Current auto-draft fills are limited to:
  - blank child `relationship_type` when the column exists;
  - blank `variation_theme` when the same family has exactly one non-empty theme.
- The generator does not infer missing `parent_sku`, clear parent price/quantity, resolve duplicate SKUs, fill missing size/color/style values, or handle catalog-level errors.

Run locally after changes:

```bash
node --check app.js
node --check contact.js
node --check scripts/ignore-old-commit.js
```

## Stage 5 hardening notes

The variation flow now exposes a preview table for every safe draft edit before download. Users can inspect the row, SKU, target column, before value, after value, and reason before creating a repaired draft.

Rows that require source data or catalog judgment are exported separately as `manual-review-needed.csv`. This prevents risky automatic changes from being mixed into the repaired draft and gives VA/agency users a client-ready queue for manual work.

Privacy remains local-first: both repaired drafts and manual-review CSV files are generated in the browser from user-provided files. No Seller Central login or server upload is required.


## Stage 9 audit note — column matching

Flat file column matching now uses exact normalized aliases for strict numeric or operational fields such as `quantity`, `price`, `unit_count`, `unit_count_type`, `item_package_quantity`, and `fulfillment_latency`. This prevents fields such as `item_package_quantity` from being treated as sellable inventory `quantity`. Fuzzy matching remains limited to descriptive variation fields where template headers vary more often.


## Contact handoff hardening

The contact page generates a private local brief and a public-safe feedback brief. The `mailto:` draft uses the private brief in the browser only; the GitHub Issue URL uses the public-safe version without name or email. This is safer than using GitHub Issues as the primary manual-service channel.


## Analytics link privacy

The contact page uses `safeTrackedHref()` before sending click events. This prevents generated `mailto:` URLs or GitHub issue query bodies from being sent to analytics.

## Private inquiry email

- Service inquiry drafts are addressed to `flatfile@ymirtool.com`.
- The generated `mailto:` body is still created locally in the browser.
- Analytics sanitization keeps `mailto:` clicks as `mailto:private-draft`; it does not send the email body, subject, name, or reply email to analytics.
- Public GitHub Issue links remain public-safe and exclude contact details.

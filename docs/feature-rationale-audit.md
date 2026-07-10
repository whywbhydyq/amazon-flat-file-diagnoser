# Feature rationale audit

Updated: 2026-05-31

This audit checks whether the added features still match the service-productization thesis for `flatfile.ymirtool.com`.

## Product shape

The site should remain an Amazon Processing Report and flat-file error checker. Variation triage is an advanced use case, not a replacement for the main free checker.

## Feature-by-feature rationale

| Feature | Keep? | Why | Boundary |
|---|---|---|---|
| Processing Report parsing | Yes | It is the lowest-friction entry point and matches Amazon's report-driven error workflow. | Browser-local only; no account login. |
| Fixability triage | Yes | It prevents overpromising and routes users into file-fixable, variation, catalog, or Seller Support buckets. | Labels are advisory, not guarantees. |
| Optional flat-file upload | Yes | Needed to move from error-code explanation to SKU/family structure diagnosis. | `.txt`, `.csv`, `.tsv` only in the first version. |
| Variation family map | Yes | Exposes parent/child structure problems that users otherwise check manually. | Does not validate every category-specific Amazon rule. |
| Safe repaired draft | Yes, narrow scope | Provides a concrete paid-service bridge while staying explainable. | Only fills blanks when parent family context is present, non-duplicate, and unambiguous. |
| Manual-review-needed CSV | Yes | Useful for VA/agency workflows and separates automatable work from expert judgment. | Does not imply the tool can solve catalog/brand/policy issues. |
| Contact/inquiry flow | Yes | Captures paid-service intent without requiring payment integration yet. | Public GitHub issue output must remain de-identified. |
| Sample fixtures | Yes | Supports user onboarding and manual QA without real seller data. | Synthetic data only; not an Amazon-approved upload file. |

## Hard stops avoided

- No Seller Central login is requested.
- No automated upload or SP-API integration is used.
- No catalog, brand, policy, Hazmat, or Seller Support outcome is promised.
- The repaired draft does not invent source product data.
- Ambiguous rows are exported to manual review rather than edited automatically.

## Current recommendation

Continue with this shape. The next improvement should not expand automation breadth. It should improve confidence: clearer preview, better sample QA, a private inquiry endpoint, and eventually small fixture-based parser checks.


## Private inquiry handoff

The contact flow now separates private service inquiry from public feedback. The private brief can be copied or opened as a local `mailto:` draft, while GitHub Issues use a public-safe brief that excludes name and email. This keeps the manual service path aligned with the privacy promise and avoids nudging users to publish commercially sensitive catalog details.

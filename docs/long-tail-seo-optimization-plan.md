# Long-tail SEO optimization plan

Updated: 2026-05-31

## Current evidence level

Serpstat API volume data was not available in this environment because the connected account does not include API access. Do not invent search volume, CPC, difficulty, or trend numbers.

Evidence currently used:

- Service-market evidence: Amazon parent-child variation, flat file upload, and listing error repair are paid services on Fiverr and Upwork.
- Official-rule evidence: Amazon variation relationships rely on parent products, child products, and variation themes; upload errors must be checked against Processing Report rows and current category templates.
- Product evidence: the site now supports local Processing Report parsing, optional flat file parsing, fixability triage, safe repair draft preview, and manual-review-needed CSV export.

## Page roles

| URL | Role | Primary intent | Notes |
|---|---|---|---|
| `/` | Main tool page | Upload Processing Report / flat file checker | Do not turn into a long article. |
| `/amazon-feed-error-codes` | Error-code hub | Browse common Processing Report error codes | Links to error pages and upload CTA. |
| `/amazon-variation-triage` | High-intent conversion page | Parent-child variation structure diagnosis | Holds parent_sku / dropdown / child ASIN modules until GSC proves independent demand. |
| `/amazon-error-8058` | Error page | Invalid or missing field value | File-fixable candidate, but always check field named in report. |
| `/amazon-error-8541` | Error page | Catalog conflict | Manual catalog review likely; avoid file-fix promise. |
| `/amazon-error-90244` | Error page | Invalid value / unit count / variation attribute | Do not classify every 90244 as parent-child structure. |
| `/amazon-error-8036` | Error page | Variation relationship restriction | Manual/catalog review may be required. |

## Candidate long-tail queries

Keep these as modules first. Create independent URLs only after GSC/Bing shows stable impressions and the current page cannot precisely satisfy the query.

| Candidate query | Current host page | Create URL only if |
|---|---|---|
| amazon parent sku not found | `/amazon-variation-triage` | 20+ impressions or repeated real user cases. |
| amazon child asin not showing under parent | `/amazon-variation-triage` | Query appears with position 10-40 and CTR is weak. |
| amazon variation dropdown not showing | `/amazon-variation-triage` | Query appears repeatedly and requires its own example. |
| amazon variation theme mismatch | `/amazon-variation-flat-file-error` | GSC shows stable theme-specific queries. |
| amazon unit count type error 90244 | `/amazon-error-90244` | 90244 page gets unit_count / unit_count_type impressions. |
| amazon error 8007 parent sku not found | `/amazon-variation-triage` initially | Confirm it is a real high-frequency error query before page creation. |

## Optimization rules

1. Tools stay above explanatory copy.
2. Every error page must point back to the upload tool.
3. Every variation-related page must point to `/amazon-variation-triage`.
4. Error pages must explain file-fixable vs manual-review vs Seller Support likely.
5. Do not claim official Amazon validation, guaranteed fix, or 100% accuracy.
6. Do not create pages from D-level logical keyword combinations.

## 30 / 60 / 90 day review

| Time | Data to review | Action |
|---|---|---|
| 30 days | GSC/Bing impressions, clicks, CTR, position | Improve title/description and internal links; no new pages yet. |
| 60 days | Queries ranking 10-40 | Add examples, result explanations, and targeted modules. |
| 90 days | Stable concrete task queries | Create at most 1-3 long-tail tool pages with examples and canonical planning. |

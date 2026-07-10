# Amazon variation triage research notes

Updated: 2026-05-31

This file records the evidence used to keep the product boundary narrow: Processing Report parsing first, optional flat file variation triage second, paid repaired-file/manual review only after the user sees fixability.

## Official rules and technical implications

| Source | Evidence | Product implication |
|---|---|---|
| [Amazon Seller Central: Troubleshoot inventory file upload errors](https://sellercentral.amazon.com/help/hub/reference/external/GY39J4HS7TZYXZJK) | Amazon tells sellers to use the Processing Report to obtain more information after an inventory file upload error. | Processing Report must remain the primary free entry point. |
| [Amazon Seller Central: Inventory file upload FAQ](https://sellercentral.amazon.com/help/hub/reference/external/G201201070) | Upload status and processing reports are the official way to determine whether a processed inventory file had errors. | The tool should group errors by SKU, row, field, and code instead of asking for Seller Central access. |
| [Amazon Seller Central: Product variations overview](https://sellercentral.amazon.com/help/hub/reference/external/GH3RMVV3ZDYRRQ5S) | Variation relationships are built around parent/child products and a variation theme such as color/size. | Variation triage should inspect parentage, parent_sku, relationship_type, variation_theme, and variation attributes. |
| [Amazon Seller Central: Create and manage product variations](https://sellercentral.amazon.com/help/hub/reference/external/GEKYC26YEZX2VSHM) | Child rows should use the same variation theme chosen for the parent. | Same-family theme mismatch is a valid structural warning. |
| [Amazon Seller Central: Error 8058](https://sellercentral.amazon.com/help/hub/reference/external/G24501) | Invalid or missing attribute values must be changed to match the valid values in the inventory template. | 8058 should often be classified as file-fixable, but variation-related fields should route to flat file triage. |
| [Amazon Seller Central: Error 8541](https://sellercentral.amazon.com/gp/help/external/G200692330) | Submitted attributes such as brand, title, UPC, or color can conflict with an existing ASIN. | 8541 should not be promised as file-fixable; route to catalog review / Seller Support evidence. |
| [Amazon Seller Central: Error 90244](https://sellercentral.amazon.com/help/hub/reference/external/GJZZWYN3DEX4ZMUV) | Submitted attribute values are not valid values from the allowed list/enumeration. | 90244 may be a valid-value issue, not only parent-child structure; classify as needs triage rather than guaranteed repair. |
| [Amazon Seller Central: Error 8036](https://sellercentral.amazon.com/help/hub/reference/external/G2SCG3A2RBTHSJMC) | Seller ability to create variation relationships can be removed after recent policy violations. | 8036 is not a normal file repair; route to policy/catalog review. |
| [Amazon Seller Central: Error 99010](https://sellercentral.amazon.com/help/hub/reference/external/G200713270) | Missing or conflicting values in required columns/groups can cause the error. | 99010 can be file-fixable, especially for missing parent/variation fields. |

## Market/service evidence

| Source type | Evidence | Product implication |
|---|---|---|
| Fiverr services, for example [Amazon variation/flat file repair gigs](https://www.fiverr.com/gigs/parent-child-listing) | Existing gigs sell parent-child variation listing repair, flat file upload/error resolution, variation theme fixes, and combining separate listings. | There is paid service demand. The tool can pre-diagnose before a seller hires a freelancer. |
| Upwork services/freelancer profiles, for example [Amazon variation fixes](https://www.upwork.com/services/product/admin-customer-support-amazon-variation-s-created-or-fixed-1310706268136534016) | Service providers sell Amazon variation fixes, catalog cleanup, flat files, and parent-child ASIN repair. | VA/agency users are not only competitors; they can use client-ready reports to resell diagnosis. |
| Larger tools such as [FlatFilePro and catalog suites](https://flatfile.pro/ffp/top-7-flat-file-editing-tools-for-amazon-sellers/) | Existing products position around catalog/flat-file management and variation relationship editing. | The gap is a lightweight, one-off, no-login triage tool rather than another full catalog SaaS. |

## Seller pain signals

| Pain pattern | Evidence from public seller discussions | Product implication |
|---|---|---|
| Variation families split into standalone listings | Sellers report color/size children becoming standalone pages and parent ASINs becoming incomplete. | Detect family structure issues, but avoid promising catalog-level repair. |
| Official tools tried but still unclear | Sellers mention using flat files, Variation Wizard, tutorials, and Seller Support yet still not knowing which field failed. | The tool should answer whether the problem is file-fixable, needs manual catalog review, or likely requires Seller Support. |
| 90244 is confusing beyond variation structure | Sellers report 90244 on unit count/unit count type where the exact failing field is hard to locate. | Keep 90244 classification broad: valid-value/attribute triage, not only variation repair. |
| 8036 can be policy/account-level | Sellers report temporary inability to create variation relationships. | Do not sell repaired-file generation for 8036 as a default action. |

## Product boundary

Do:

- Parse Processing Report locally in the browser.
- Optionally parse user-provided flat file locally in the browser.
- Detect structural parent-child signals that are visible from the file.
- Classify issues into file-fixable, needs variation triage, needs manual catalog review, and Seller Support likely.
- Make repaired-file/manual-review CTA conditional on the user seeing a concrete signal.

Do not:

- Ask for Seller Central login.
- Auto-upload to Amazon.
- Promise all variation relationships can be restored.
- Treat catalog contribution, brand ownership, or policy-limit errors as simple file fixes.
- Send user files to a server in the free checker.

## 2026-05-31 service-market refresh

Additional public service evidence confirms the paid-service pattern:

- Fiverr category pages list many parent-child listing and variation issue services, including flat file upload/error resolution, variation theme fixes, combining separate listings, and parent-child setup.
- Upwork job posts in May 2026 request Amazon catalog and variation specialists who understand flat files, variation structures, listing repair workflows, suppressed ASINs, backend catalog inconsistencies, and Seller Central troubleshooting.
- Upwork project catalog pages and freelancer profiles advertise Amazon catalog, flat file, variation listings, and Seller Support workflows as paid deliverables.

This supports the productized-service path: free file triage first, safe repaired-file draft for narrow file-fixable cases, and paid manual review for catalog or policy cases.

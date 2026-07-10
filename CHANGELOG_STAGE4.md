# Stage 4 - Error-code boundary and source correction

Date: 2026-05-30

## Changed

- Corrected Amazon Error 8036 from an invalid product ID explanation to a variation relationship restriction / policy limitation explanation.
- Corrected Amazon Error 8008 from a generic field-length explanation to a child SKU not recognized / relationship feed setup explanation.
- Expanded Amazon Error 90112 from a narrow invalid enum explanation to a broader invalid field value, date, numeric, required-field, or format validation explanation.
- Upgraded 8036, 8008, and 90112 rule sources to Amazon Seller Central Help URLs with official confidence.
- Updated app.js rules, sample report wording, three error-code pages, homepage links, feed-error-code hub links, and related guide references.

## Validation

- Static syntax and structured data checks only.
- No npm install, npm run build, test, lint, or typecheck was run.

# Private inquiry handoff

The contact page should not push service requests into a public GitHub Issue by default.

## Rationale

The product handles Amazon flat file and Processing Report problems. Even when the page asks for a desensitized summary, users may still paste commercially sensitive details such as store names, internal SKUs, supplier hints, or contact information. A public GitHub Issue is acceptable for missing error-code feedback, but it is not appropriate as the primary service inquiry path.

## Current implementation

The page now generates two separate outputs:

1. **Private brief**
   - Includes the optional contact name and reply email entered by the user.
   - Stays in the browser.
   - Can be copied or opened as a local `mailto:` draft.
   - Does not upload files or submit data to a server.

2. **Public-safe feedback brief**
   - Removes name and email.
   - Intended only for missing error-code reports or public product feedback.
   - Used for the GitHub Issue link.

## Events

- `inquiry_brief_generated`
- `inquiry_brief_copied` with `version=private-local`
- `inquiry_brief_copied` with `version=public-safe`
- `email_draft_opened`
- `github_issue_opened`

## Boundary

This is still not a full private backend. It is a safer handoff until a proper form endpoint or inbox workflow is configured.

Do not ask users to paste:

- Seller Central credentials
- buyer or order data
- account screenshots
- full supplier or sourcing data
- complete confidential catalog files
- Brand Registry or legal documents


## Tracking privacy

Click tracking must never send the full generated `mailto:` URL to analytics because the URL body contains the private brief. The contact script records only `mailto:private-draft`. GitHub URLs with query strings are reduced to a public-safe query label rather than the full body.

# Stage 12 - Private inquiry handoff hardening

## Why

The previous contact flow was already public-safe for GitHub Issues, but it still gave the public issue path too much prominence for service requests. Manual flat file repair and variation review are service inquiries, not public bug reports.

## Changed

- Added a private email draft handoff on `contact.html`.
- Kept the private brief browser-only and copyable.
- Reframed GitHub Issues as public-safe feedback / missing error-code reporting only.
- Added `email_draft_opened` event tracking.
- Added `docs/private-inquiry-handoff.md`.
- Updated validation and technical hardening docs.

## Boundary

No backend endpoint was added. No files are uploaded. The email draft uses the user's local mail client through `mailto:` and leaves the recipient blank until a real private inbox is configured.


## Additional hardening

- Sanitized tracked href values so analytics never receives the full generated `mailto:` body or GitHub issue query body.

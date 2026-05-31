# Stage 13 - fixed private inquiry recipient

- Confirmed `flatfile@ymirtool.com` as the private inquiry recipient.
- Updated `contact.js` so generated private email drafts use `mailto:flatfile@ymirtool.com`.
- Updated the contact page copy to tell users that service inquiries go to `flatfile@ymirtool.com`.
- Kept analytics href sanitization unchanged: `mailto:` clicks are tracked only as `mailto:private-draft`, without leaking subject/body/contact data.
- No Seller Central login, file upload, backend submission, or public issue submission is added.

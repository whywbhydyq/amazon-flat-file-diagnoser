const $ = (selector, root = document) => root.querySelector(selector);

function trackEvent(name, props = {}) {
  if (window.AFFDTracking?.trackEvent) return window.AFFDTracking.trackEvent(name, props);
  const payload = { tool: "amazon_flat_file_diagnoser", ...props };
  try {
    if (window.va?.track) window.va.track(name, payload);
    if (window.gtag) window.gtag("event", name, payload);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });
  } catch (_) {}
}

function labelForRequest(value) {
  return {
    "repaired-flat-file": "Repaired flat file",
    "manual-review": "Manual variation review",
    "diagnostic-report": "Diagnostic report",
    "missing-error-code": "Missing error code / feedback"
  }[value] || "Flat file review";
}

function copyText(text) {
  const fallback = () => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.readOnly = true;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    if (!ok) throw new Error("copy failed");
  };
  return navigator.clipboard?.writeText ? navigator.clipboard.writeText(text).catch(fallback) : Promise.resolve(fallback());
}

function setFromQuery() {
  const params = new URLSearchParams(location.search);
  const intent = params.get("intent");
  const source = params.get("source");
  const select = $("[name=requestType]");
  if (intent && select && [...select.options].some(option => option.value === intent)) select.value = intent;
  trackEvent("contact_page_opened", { source: source || "direct", intent: intent || "" });
}

function formData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function buildBrief(data, { publicSafe = false } = {}) {
  const lines = [
    `Request type: ${labelForRequest(data.requestType)}`,
    `Role: ${data.role || ""}`,
    `Marketplace: ${data.marketplace || ""}`,
    `Affected SKU count: ${data.skuCount || ""}`,
    `Error codes: ${data.errorCodes || ""}`,
    "",
    "Issue summary:",
    data.issueSummary || "",
    "",
    "Already tried:",
    data.tried || ""
  ];

  if (!publicSafe) {
    lines.push("", "Contact:", data.contactName || "", data.email || "");
  }

  lines.push(
    "",
    publicSafe
      ? "Privacy note: this public issue brief intentionally excludes name, email, Seller Central login, buyer/order data, real store screenshots, and sensitive catalog files."
      : "Privacy note: no Seller Central login, buyer/order data, real store screenshots, or sensitive catalog files should be posted publicly."
  );

  return lines.join("\n");
}

function githubIssueUrl(data, publicBrief) {
  const title = `[${labelForRequest(data.requestType)}] Public feedback / missing error-code report`;
  return `https://github.com/whywbhydyq/amazon-flat-file-diagnoser/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(publicBrief)}`;
}

const INQUIRY_EMAIL = "flatfile@ymirtool.com";
const MAX_URL_LENGTH = 1800;
const SENSITIVE_PUBLIC_PATTERNS = [
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
  /https?:\/\//i,
  /\b(order|buyer|customer|seller central|merchant token|account|login|password|case id)\b/i,
  /\b\+?\d[\d\s().-]{7,}\d\b/
];

function mailtoUrl(data, privateBrief) {
  const subject = `[${labelForRequest(data.requestType)}] Amazon flat file review request`;
  return `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(privateBrief)}`;
}

function compactMailtoUrl(data) {
  const subject = `[${labelForRequest(data.requestType)}] Amazon flat file review request`;
  return `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

function containsPublicSensitiveText(data) {
  const text = [data.issueSummary, data.tried, data.errorCodes, data.marketplace].join("\n");
  return SENSITIVE_PUBLIC_PATTERNS.some(pattern => pattern.test(text));
}

function setLinkState(link, href, { disabled = false, label = "" } = {}) {
  if (!link) return;
  link.href = href;
  link.classList.toggle("disabled-link", disabled);
  link.setAttribute("aria-disabled", disabled ? "true" : "false");
  if (label) link.title = label;
}

function safeTrackedHref(href = "") {
  if (!href) return "";
  if (href.startsWith("mailto:")) return "mailto:private-draft";
  try {
    const url = new URL(href, window.location.origin);
    if (url.hostname === "github.com" && url.search) return `${url.origin}${url.pathname}?public-safe-query`;
    if (url.origin === window.location.origin) return url.pathname;
    return url.origin + url.pathname;
  } catch (_) {
    return href.split("?")[0].slice(0, 120);
  }
}

const form = $("#reviewRequestForm");
const output = $("#requestOutput");
const briefBox = $("#requestBrief");
const publicBriefBox = $("#publicRequestBrief");
const copyBtn = $("#copyRequestBrief");
const copyPublicBtn = $("#copyPublicRequestBrief");
const issueLink = $("#openGithubIssue");
const emailDraftLink = $("#openEmailDraft");
const handoffWarning = $("#handoffWarning");

setFromQuery();

if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = formData(form);
    const privateBrief = buildBrief(data);
    const publicBrief = buildBrief(data, { publicSafe: true });

    briefBox.value = privateBrief;
    if (publicBriefBox) publicBriefBox.value = publicBrief;
    const fullMailto = mailtoUrl(data, privateBrief);
    const fullIssueUrl = githubIssueUrl(data, publicBrief);
    const warnings = [];

    if (fullMailto.length > MAX_URL_LENGTH) {
      setLinkState(emailDraftLink, compactMailtoUrl(data), {
        disabled: false,
        label: "Brief is too long for a reliable mailto URL. Copy the private brief and paste it into the email body."
      });
      warnings.push("Private brief is long, so the email draft link only opens the address and subject. Copy the private brief and paste it manually.");
    } else {
      setLinkState(emailDraftLink, fullMailto);
    }

    if (fullIssueUrl.length > MAX_URL_LENGTH) {
      setLinkState(issueLink, "https://github.com/whywbhydyq/amazon-flat-file-diagnoser/issues/new", {
        disabled: false,
        label: "Public brief is too long for a reliable GitHub issue URL. Copy the public-safe brief manually."
      });
      warnings.push("Public GitHub issue text is long, so the link opens a blank issue. Copy the public-safe brief and paste it manually.");
    } else {
      setLinkState(issueLink, fullIssueUrl);
    }

    if (containsPublicSensitiveText(data)) {
      warnings.push("Potential sensitive text detected in the public-safe brief. Review and remove emails, URLs, phone/order/account details, and store-specific identifiers before posting publicly.");
    }

    if (handoffWarning) {
      handoffWarning.textContent = warnings.join(" ");
      handoffWarning.classList.toggle("hidden", !warnings.length);
    }

    output.classList.remove("hidden");
    output.scrollIntoView({ behavior: "smooth", block: "start" });

    trackEvent("inquiry_brief_generated", {
      request_type: data.requestType || "",
      role: data.role || "",
      sku_count: data.skuCount || "",
      handoff_options: "private_email_draft,public_safe_issue"
    });
  });
}

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await copyText(briefBox.value);
      copyBtn.textContent = "Copied";
      trackEvent("inquiry_brief_copied", { version: "private-local" });
      setTimeout(() => (copyBtn.textContent = "Copy private brief"), 1800);
    } catch (_) {
      copyBtn.textContent = "Copy failed";
    }
  });
}

if (copyPublicBtn && publicBriefBox) {
  copyPublicBtn.addEventListener("click", async () => {
    try {
      await copyText(publicBriefBox.value);
      copyPublicBtn.textContent = "Copied";
      trackEvent("inquiry_brief_copied", { version: "public-safe" });
      setTimeout(() => (copyPublicBtn.textContent = "Copy public-safe brief"), 1800);
    } catch (_) {
      copyPublicBtn.textContent = "Copy failed";
    }
  });
}

document.addEventListener("click", event => {
  const target = event.target.closest("[data-track]");
  if (!target) return;
  trackEvent(target.dataset.track, {
    source: target.dataset.source || "",
    href: safeTrackedHref(target.getAttribute("href") || "")
  });
});

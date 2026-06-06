(function () {
  function safeTrackedHref(href = "") {
    if (!href) return "";
    if (href.startsWith("mailto:")) return "mailto:private-draft";
    try {
      const url = new URL(href, window.location.origin);
      if (url.origin === window.location.origin) return url.pathname;
      if (url.hostname === "github.com" && url.search) return `${url.origin}${url.pathname}?public-safe-query`;
      return url.origin + url.pathname;
    } catch (_) {
      return String(href).split("?")[0].slice(0, 120);
    }
  }

  function trackEvent(name, props = {}) {
    if (!name) return;
    const payload = { tool: "amazon_flat_file_diagnoser", ...props };
    try {
      if (window.va?.track) window.va.track(name, payload);
      if (window.gtag) window.gtag("event", name, payload);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: name, ...payload });
    } catch (_) {}
  }

  function trackClick(target) {
    if (!target) return;
    trackEvent(target.dataset.track, {
      intent: target.dataset.intent || "",
      source: target.dataset.source || "",
      href: safeTrackedHref(target.getAttribute("href") || "")
    });
  }

  window.AFFDTracking = { trackEvent, safeTrackedHref, trackClick };

  if (document.currentScript?.dataset.autotrack === "true") {
    document.addEventListener("click", event => {
      const target = event.target.closest("[data-track]");
      if (target) trackClick(target);
    });
  }
})();

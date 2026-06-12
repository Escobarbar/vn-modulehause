"use client";

import { COOKIE_CONSENT_KEY } from "@/lib/cookie-consent";

export const WineggCookieSettingsLink = () => (
  <button
    type="button"
    onClick={() => {
      try {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        localStorage.removeItem("vn-cookie-consent");
        sessionStorage.removeItem(COOKIE_CONSENT_KEY);
      } catch {
        // ignore
      }
      window.dispatchEvent(new Event("vn-consent"));
    }}
    className="text-sm text-white/60 transition-colors hover:text-white"
  >
    Cookie-Einstellungen
  </button>
);

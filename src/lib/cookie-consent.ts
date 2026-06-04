export const COOKIE_CONSENT_KEY = "vn-cookie-consent-v2";
export const COOKIE_CONSENT_VERSION = "2026-06-04";

export type CookieCategory = "essential" | "statistics" | "marketing";

export type CookieConsentState = {
  version: string;
  essential: true;
  statistics: boolean;
  marketing: boolean;
  timestamp: string;
};

function readStoredConsentRaw(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return (
      localStorage.getItem(COOKIE_CONSENT_KEY) ??
      sessionStorage.getItem(COOKIE_CONSENT_KEY)
    );
  } catch {
    return null;
  }
}

export function parseConsent(raw: string | null): CookieConsentState | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as CookieConsentState;
    if (data.version !== COOKIE_CONSENT_VERSION) return null;
    if (typeof data.statistics !== "boolean") return null;
    return data;
  } catch {
    if (raw === "accepted") {
      return {
        version: COOKIE_CONSENT_VERSION,
        essential: true,
        statistics: true,
        marketing: true,
        timestamp: new Date().toISOString(),
      };
    }
    return null;
  }
}

export function getStoredConsent(): CookieConsentState | null {
  return parseConsent(readStoredConsentRaw());
}

export function saveConsent(partial: {
  statistics: boolean;
  marketing: boolean;
}): CookieConsentState {
  if (typeof window === "undefined") {
    throw new Error("saveConsent is only available in the browser");
  }

  const state: CookieConsentState = {
    version: COOKIE_CONSENT_VERSION,
    essential: true,
    statistics: partial.statistics,
    marketing: partial.marketing,
    timestamp: new Date().toISOString(),
  };

  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(state));
  } catch {
    // Private mode / blocked storage — still hide banner for this session
    try {
      sessionStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }

  window.dispatchEvent(new Event("vn-consent"));
  return state;
}

export function hasAnsweredConsent(): boolean {
  if (typeof window === "undefined") return true;
  return getStoredConsent() !== null;
}

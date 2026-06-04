"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ChevronDown, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStoredConsent, saveConsent } from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

function subscribe(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener("vn-consent", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("vn-consent", handler);
  };
}

/** Primitives only — objects from getSnapshot cause infinite re-renders. */
function getConsentAnswered(): boolean {
  return getStoredConsent() !== null;
}

function getServerConsentAnswered(): boolean {
  return false;
}

export const CookieConsent = () => {
  const hasAnswered = useSyncExternalStore(
    subscribe,
    getConsentAnswered,
    getServerConsentAnswered,
  );
  const [showSettings, setShowSettings] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (hasAnswered) return null;

  const acceptAll = () => {
    try {
      saveConsent({ statistics: true, marketing: true });
    } catch (e) {
      console.error("[CookieConsent]", e);
    }
  };

  const rejectOptional = () => {
    try {
      saveConsent({ statistics: false, marketing: false });
    } catch (e) {
      console.error("[CookieConsent]", e);
    }
  };

  const saveSelection = () => {
    try {
      saveConsent({ statistics, marketing });
    } catch (e) {
      console.error("[CookieConsent]", e);
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      aria-modal="false"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-2xl rounded-2xl border border-border bg-card p-4 shadow-xl sm:p-6"
    >
      <h2
        id="cookie-banner-title"
        className="font-display text-lg font-semibold text-foreground"
      >
        Cookie-Einstellungen
      </h2>
      <p id="cookie-banner-desc" className="mt-2 text-sm text-muted-foreground">
        Wir verwenden Cookies und vergleichbare Technologien. Technisch
        notwendige Cookies sind für den Betrieb der Website erforderlich.
        Optionale Cookies helfen uns, die Nutzung zu analysieren und Inhalte zu
        verbessern. Sie können Ihre Auswahl jederzeit in der{" "}
        <Link href="/datenschutz" className="text-primary underline">
          Datenschutzerklärung
        </Link>{" "}
        widerrufen (Art. 7 Abs. 3 DSGVO).
      </p>

      <button
        type="button"
        onClick={() => setShowSettings((s) => !s)}
        className="mt-4 flex w-full items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
        aria-expanded={showSettings}
      >
        <span className="flex items-center gap-2">
          <Settings2 className="size-4" />
          Einstellungen anpassen
        </span>
        <ChevronDown
          className={cn(
            "size-4 transition-transform",
            showSettings && "rotate-180",
          )}
        />
      </button>

      {showSettings && (
        <ul className="mt-3 space-y-3 rounded-lg border border-border bg-background p-3 text-sm">
          <li className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium text-foreground">Notwendig</p>
              <p className="text-muted-foreground">
                Sitzung, Sicherheit, Speicherung Ihrer Cookie-Auswahl (immer
                aktiv).
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              Aktiv
            </span>
          </li>
          <li className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium text-foreground">Statistik</p>
              <p className="text-muted-foreground">
                Anonyme Auswertung zur Verbesserung der Website.
              </p>
            </div>
            <label className="flex shrink-0 items-center gap-2">
              <input
                type="checkbox"
                checked={statistics}
                onChange={(e) => setStatistics(e.target.checked)}
                className="size-4 accent-primary"
              />
            </label>
          </li>
          <li className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium text-foreground">Marketing</p>
              <p className="text-muted-foreground">
                Personalisierte Inhalte und Reichweitenmessung (falls eingesetzt).
              </p>
            </div>
            <label className="flex shrink-0 items-center gap-2">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="size-4 accent-primary"
              />
            </label>
          </li>
        </ul>
      )}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button
          type="button"
          variant="outline"
          onClick={rejectOptional}
          className="rounded-full sm:flex-1"
        >
          Nur notwendige
        </Button>
        {showSettings && (
          <Button
            type="button"
            variant="secondary"
            onClick={saveSelection}
            className="rounded-full sm:flex-1"
          >
            Auswahl speichern
          </Button>
        )}
        <Button
          type="button"
          onClick={acceptAll}
          className="rounded-full sm:flex-1"
        >
          Alle akzeptieren
        </Button>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Rechtsgrundlage optional: Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG.
        Ohne Zustimmung werden keine optionalen Tracking-Cookies gesetzt.
      </p>
    </div>
  );
};

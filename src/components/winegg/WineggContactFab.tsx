"use client";

import Link from "next/link";
import { Home, MessageCircle, Search } from "lucide-react";
import { focusWineggSearch } from "@/lib/winegg-utils";

export const WineggContactFab = () => (
  <div
    className="winegg-contact-fab fixed bottom-6 right-4 z-40 flex flex-col gap-3 sm:right-8"
    aria-label="Schnellzugriff"
  >
    <button
      type="button"
      onClick={focusWineggSearch}
      className="hidden size-12 items-center justify-center rounded-full bg-[var(--winegg-gold)] text-white shadow-lg transition-all hover:scale-105 hover:bg-[var(--winegg-gold-hover)] active:scale-95 md:flex sm:size-14"
      aria-label="Modellsuche"
    >
      <Search className="size-5 sm:size-6" strokeWidth={1.5} />
    </button>
    <Link
      href="/v2#modelle"
      className="flex size-12 items-center justify-center rounded-full bg-[var(--winegg-gold)] text-white shadow-lg transition-all hover:scale-105 hover:bg-[var(--winegg-gold-hover)] active:scale-95 sm:size-14"
      aria-label="Alle Modelle"
    >
      <Home className="size-5 sm:size-6" strokeWidth={1.5} />
    </Link>
    <Link
      href="/kontakt"
      className="flex size-12 items-center justify-center rounded-full bg-[var(--winegg-gold)] text-white shadow-lg transition-all hover:scale-105 hover:bg-[var(--winegg-gold-hover)] active:scale-95 sm:size-14"
      aria-label="Kontakt"
    >
      <MessageCircle className="size-5 sm:size-6" strokeWidth={1.5} />
    </Link>
  </div>
);

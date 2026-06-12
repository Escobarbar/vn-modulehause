"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "winegg-energy-mode";

export const WineggEnergyToggle = () => {
  const [energyMode, setEnergyMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "on") {
      setEnergyMode(true);
      document.querySelector(".theme-winegg")?.classList.add("winegg-energy");
    }
  }, []);

  const toggle = () => {
    const next = !energyMode;
    setEnergyMode(next);
    const root = document.querySelector(".theme-winegg");
    if (next) {
      root?.classList.add("winegg-energy");
      localStorage.setItem(STORAGE_KEY, "on");
    } else {
      root?.classList.remove("winegg-energy");
      localStorage.setItem(STORAGE_KEY, "off");
    }
  };

  return (
    <div className="winegg-energy-toggle fixed bottom-6 left-4 z-40 flex items-center gap-2 sm:left-8">
      <button
        type="button"
        role="switch"
        aria-checked={energyMode}
        onClick={toggle}
        className={cn(
          "relative h-7 w-14 rounded-full transition-colors",
          energyMode ? "bg-[var(--winegg-gray)]" : "bg-[var(--winegg-gray-light)]",
        )}
        aria-label="Energiesparmodus"
      >
        <span
          className={cn(
            "absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform",
            energyMode ? "left-7" : "left-0.5",
          )}
        />
      </button>
      <span className="winegg-energy-toggle__label hidden text-xs min-[400px]:inline sm:text-sm">
        Energiesparmodus
      </span>
    </div>
  );
};

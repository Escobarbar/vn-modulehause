"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { navItems, modelNavGroups } from "@/content/site";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex size-10 items-center justify-center rounded-full text-foreground hover:bg-muted md:hidden"
        aria-label="Menü öffnen"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="border-border bg-card">
        <SheetHeader>
          <SheetTitle className="font-display text-left text-foreground">
            Navigation
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-lg font-medium hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
          <p className="mt-6 px-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Modellhäuser
          </p>
          {modelNavGroups.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {g.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

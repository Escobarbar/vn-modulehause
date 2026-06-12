import Link from "next/link";
import { CtaButton } from "@/components/shared/CtaButton";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-28 text-center">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold text-foreground">
        Seite nicht gefunden
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Die angeforderte Seite existiert nicht oder wurde verschoben.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <CtaButton href="/">Zur Startseite</CtaButton>
        <Link
          href="/kontakt"
          className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-white/5"
        >
          Kontakt
        </Link>
      </div>
    </div>
  );
}

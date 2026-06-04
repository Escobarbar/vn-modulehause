"use client";

import { motion } from "motion/react";
import { Download } from "lucide-react";
import { pricingTiers } from "@/content/pages/home";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const PricingSection = () => (
  <section id="preise" className="scroll-mt-28 py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        title={pricingTiers.title}
        description={pricingTiers.subtitle}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 overflow-hidden rounded-2xl border-2 border-primary/20 bg-card shadow-md"
      >
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-primary/10 hover:bg-primary/10">
                <TableHead className="py-4 font-semibold text-foreground">
                  Wohnfläche
                </TableHead>
                {pricingTiers.columns.map((col, i) => (
                  <TableHead
                    key={col}
                    className="py-4 text-center text-foreground"
                  >
                    <span className="block font-display text-base font-bold">
                      {col}
                    </span>
                    <span className="mt-1 block text-xs font-normal text-muted-foreground">
                      {pricingTiers.columnDesc[i]}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingTiers.rows.map((row, rowIndex) => (
                <TableRow
                  key={row.size}
                  className={
                    rowIndex % 2 === 0
                      ? "border-border bg-background hover:bg-accent/30"
                      : "border-border bg-muted/30 hover:bg-accent/30"
                  }
                >
                  <TableCell className="py-4 font-display font-semibold text-foreground">
                    {row.size}
                  </TableCell>
                  <TableCell className="py-4 text-center text-lg font-semibold text-primary">
                    ab {row.basis.toLocaleString("de-DE")} € / m²
                  </TableCell>
                  <TableCell className="py-4 text-center text-base font-medium text-foreground">
                    ab {row.comfort.toLocaleString("de-DE")} € / m²
                  </TableCell>
                  <TableCell className="py-4 text-center text-base font-medium text-foreground">
                    ab {row.komplett.toLocaleString("de-DE")} € / m²
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-4 p-4 md:hidden">
          {pricingTiers.rows.map((row) => (
            <div
              key={row.size}
              className="rounded-xl border border-primary/15 bg-background p-4 shadow-sm"
            >
              <p className="font-display text-lg font-semibold text-foreground">
                {row.size}
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between rounded-lg bg-primary/5 px-2 py-1.5">
                  <dt className="font-medium text-foreground">BASIS</dt>
                  <dd className="font-semibold text-primary">
                    ab {row.basis.toLocaleString("de-DE")} €/m²
                  </dd>
                </div>
                <div className="flex justify-between px-2 py-1">
                  <dt className="text-muted-foreground">COMFORT</dt>
                  <dd className="font-medium">
                    ab {row.comfort.toLocaleString("de-DE")} €/m²
                  </dd>
                </div>
                <div className="flex justify-between px-2 py-1">
                  <dt className="text-muted-foreground">KOMPLETT</dt>
                  <dd className="font-medium">
                    ab {row.komplett.toLocaleString("de-DE")} €/m²
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </motion.div>

      <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Download className="size-4 shrink-0 text-primary" />
        Detaillierte Preis-PDFs finden Sie auf den jeweiligen Modellseiten.
      </p>
    </div>
  </section>
);

"use client";

import { WineggReveal } from "@/components/winegg/WineggReveal";
import { pricingTiers } from "@/content/pages/home";

export const WineggPricingSection = () => (
  <section id="preise" className="winegg-section scroll-mt-28 py-16 sm:py-24">
    <div className="mx-auto max-w-[1920px] px-4 sm:px-8 lg:px-12">
      <WineggReveal>
        <h2 className="winegg-heading text-2xl text-[var(--winegg-gray-dark)] sm:text-3xl md:text-4xl">
          {pricingTiers.title}
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--winegg-gray)]">{pricingTiers.subtitle}</p>
      </WineggReveal>

      <WineggReveal delay={200} className="winegg-energy-pricing-table mt-10 overflow-hidden rounded-[var(--winegg-radius-md)] border border-[var(--winegg-gray-light)]/40">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="bg-[var(--winegg-gold)] text-white">
                <th className="px-6 py-4 font-medium uppercase tracking-wider">Wohnfläche</th>
                {pricingTiers.columns.map((col, i) => (
                  <th key={col} className="px-6 py-4 text-center">
                    <span className="font-winegg-display text-lg">{col}</span>
                    <span className="mt-1 block text-xs font-normal opacity-90">
                      {pricingTiers.columnDesc[i]}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingTiers.rows.map((row) => (
                <tr
                  key={row.size}
                  className="winegg-energy-pricing-row border-t border-[var(--winegg-gray-light)]/30 bg-[var(--winegg-surface)]"
                >
                  <td className="px-6 py-4 font-medium text-[var(--winegg-gray-dark)]">
                    {row.size}
                  </td>
                  <td className="px-6 py-4 text-center text-[var(--winegg-gray)]">
                    {row.basis.toLocaleString("de-DE")} €/m²
                  </td>
                  <td className="px-6 py-4 text-center text-[var(--winegg-gray)]">
                    {row.comfort.toLocaleString("de-DE")} €/m²
                  </td>
                  <td className="px-6 py-4 text-center text-[var(--winegg-gray)]">
                    {row.komplett.toLocaleString("de-DE")} €/m²
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-[var(--winegg-gray-light)]/30 md:hidden">
          {pricingTiers.rows.map((row) => (
            <div key={row.size} className="bg-[var(--winegg-surface)] p-5">
              <p className="font-winegg-display text-lg text-[var(--winegg-gray-dark)]">
                {row.size}
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                {pricingTiers.columns.map((col, i) => (
                  <div key={col} className="flex justify-between gap-4">
                    <dt className="text-[var(--winegg-gray)]">{col}</dt>
                    <dd className="font-medium text-[var(--winegg-gold)]">
                      {[row.basis, row.comfort, row.komplett][i].toLocaleString("de-DE")} €/m²
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </WineggReveal>
    </div>
  </section>
);

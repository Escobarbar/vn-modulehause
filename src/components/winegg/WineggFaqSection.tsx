"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WineggReveal } from "@/components/winegg/WineggReveal";
import { faqs } from "@/content/pages/home";

export const WineggFaqSection = () => (
  <section id="faq" className="winegg-section scroll-mt-28 py-16 sm:py-24">
    <div className="mx-auto max-w-3xl px-4 sm:px-8 lg:px-12">
      <WineggReveal>
        <h2 className="winegg-heading text-center text-2xl text-[var(--winegg-gray-dark)] sm:text-3xl">
          Häufige Fragen
        </h2>
      </WineggReveal>

      <WineggReveal delay={150} className="mt-10">
        <Accordion className="border-t border-[var(--winegg-gray-light)]/40">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`faq-${i}`} className="border-[var(--winegg-gray-light)]/40">
              <AccordionTrigger className="break-words pr-8 font-winegg-display text-left text-base text-[var(--winegg-gray-dark)] hover:text-[var(--winegg-gold)] hover:no-underline sm:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--winegg-gray)]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </WineggReveal>
    </div>
  </section>
);

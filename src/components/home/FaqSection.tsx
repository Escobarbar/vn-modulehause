"use client";

import { faqs } from "@/content/pages/home";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInView } from "@/components/motion/FadeInView";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FaqSection = () => (
  <section id="faq" className="scroll-mt-28 border-t border-border py-12 sm:py-16">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <FadeInView>
        <SectionHeading
          label="FAQ"
          title="Häufige Fragen"
          align="center"
        />
      </FadeInView>

      <FadeInView delay={0.08}>
        <Accordion
          multiple={false}
          className="mt-8 w-full rounded-2xl border border-border bg-card px-2 shadow-sm sm:px-4"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${i}`}
              className="border-border px-2"
            >
              <AccordionTrigger className="py-4 text-left font-display text-base font-semibold text-foreground hover:text-primary hover:no-underline sm:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeInView>
    </div>
  </section>
);

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeInView } from "@/components/motion/FadeInView";
import { faqs } from "@/content/pages/home";
import { sonderFaq } from "@/content/pages/sonder-v3";

export const SonderFaq = () => {
  return (
    <section id="faq" className="sonder-section scroll-mt-24 py-20 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <FadeInView>
          <h2 className="font-sonder-display text-center text-4xl leading-tight tracking-tight text-[var(--sonder-navy)] sm:text-5xl">
            {sonderFaq.title}
          </h2>
        </FadeInView>

        <FadeInView delay={0.1} className="mt-12">
          <Accordion className="border-t border-[var(--sonder-border)]">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${i}`}
                className="border-[var(--sonder-border)]"
              >
                <AccordionTrigger className="break-words pr-8 text-left font-sonder-display text-base text-[var(--sonder-navy)] hover:text-[var(--sonder-accent)] hover:no-underline sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[var(--sonder-blue-muted)]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeInView>
      </div>
    </section>
  );
};

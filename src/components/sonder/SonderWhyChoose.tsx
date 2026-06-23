"use client";

import { FadeInView } from "@/components/motion/FadeInView";
import { sonderWhyChoose } from "@/content/pages/sonder-v3";

export const SonderWhyChoose = () => {
  return (
    <section className="sonder-section py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Heading */}
        <FadeInView>
          <h2 className="font-sonder-display whitespace-pre-line text-4xl leading-tight tracking-tight text-[var(--sonder-navy)] sm:text-5xl lg:text-6xl">
            {sonderWhyChoose.heading}
          </h2>
        </FadeInView>

        {/* Items list */}
        <div className="mt-14 lg:mt-20">
          {sonderWhyChoose.items.map((item, i) => (
            <FadeInView key={item.number} delay={0.08 * i}>
              <div
                className={`grid grid-cols-1 items-baseline gap-4 border-t border-[var(--sonder-border)] py-7 lg:grid-cols-12 lg:gap-6 lg:py-9 ${
                  i === sonderWhyChoose.items.length - 1
                    ? "border-b"
                    : ""
                }`}
              >
                {/* Number */}
                <span className="text-sm text-[var(--sonder-blue-muted)] lg:col-span-1">
                  {item.number}
                </span>

                {/* Title */}
                <h3 className="font-sonder-display text-2xl font-medium tracking-tight text-[var(--sonder-navy)] sm:text-3xl lg:col-span-5 lg:text-4xl">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-[var(--sonder-blue-muted)] lg:col-span-5 lg:col-start-8 lg:text-right">
                  {item.description}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
};

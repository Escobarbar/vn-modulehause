"use client";

import { FadeInView } from "@/components/motion/FadeInView";
import { sonderProcess } from "@/content/pages/sonder-v3";

export const SonderProcess = () => {
  return (
    <section className="sonder-section-alt py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <FadeInView>
          <h2 className="font-sonder-display text-4xl leading-tight tracking-tight text-[var(--sonder-navy)] sm:text-5xl">
            {sonderProcess.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--sonder-blue-muted)]">
            {sonderProcess.subtitle}
          </p>
        </FadeInView>

        <div className="mt-14 lg:mt-20">
          {sonderProcess.steps.map((step, i) => (
            <FadeInView key={step.step} delay={0.08 * i}>
              <div
                className={`grid grid-cols-1 items-baseline gap-4 border-t border-[var(--sonder-border)] py-7 lg:grid-cols-12 lg:gap-6 lg:py-9 ${
                  i === sonderProcess.steps.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="text-sm text-[var(--sonder-blue-muted)] lg:col-span-1">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="font-sonder-display text-2xl font-medium tracking-tight text-[var(--sonder-navy)] sm:text-3xl lg:col-span-5 lg:text-4xl">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--sonder-blue-muted)] lg:col-span-5 lg:col-start-8 lg:text-right">
                  {step.description}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
};

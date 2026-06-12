import { WineggReveal } from "@/components/winegg/WineggReveal";
import { processSteps } from "@/content/pages/home";

export const WineggProcessSection = () => (
  <section className="winegg-section-alt py-16 sm:py-24">
    <div className="mx-auto max-w-[1920px] px-4 sm:px-8 lg:px-12">
      <WineggReveal>
        <h2 className="winegg-heading text-2xl text-[var(--winegg-gray-dark)] sm:text-3xl md:text-4xl">
          Ihr Weg zum Zuhause
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--winegg-gray)]">
          Von der ersten Anfrage bis zum Einzug – transparent und persönlich begleitet.
        </p>
      </WineggReveal>

      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <WineggReveal key={step.step} delay={150 + i * 100}>
            <li className="relative">
              <span className="font-winegg-display text-5xl text-[var(--winegg-gold)]/30">
                {String(step.step).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-winegg-display text-lg text-[var(--winegg-gray-dark)]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--winegg-gray)]">
                {step.description}
              </p>
            </li>
          </WineggReveal>
        ))}
      </ol>
    </div>
  </section>
);

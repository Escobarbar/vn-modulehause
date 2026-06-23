import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeInView } from "@/components/motion/FadeInView";
import { sonderCta } from "@/content/pages/sonder-v3";

export const SonderCta = () => {
  return (
    <section className="bg-[var(--sonder-navy)] py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <FadeInView>
          <h2 className="font-sonder-display text-3xl leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {sonderCta.title}
          </h2>
        </FadeInView>
        <FadeInView delay={0.1} className="mt-6">
          <p className="text-base leading-relaxed text-white/75">
            {sonderCta.description}
          </p>
        </FadeInView>
        <FadeInView delay={0.2} className="mt-10">
          <Link href={sonderCta.ctaHref} className="sonder-btn-white">
            {sonderCta.cta}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </FadeInView>
      </div>
    </section>
  );
};

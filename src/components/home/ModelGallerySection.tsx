import { getModelsByCategory } from "@/content/models";
import type { ModelCategory } from "@/content/models/types";
import { ModelCarousel } from "@/components/models/ModelCarousel";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInView } from "@/components/motion/FadeInView";

type ModelGallerySectionProps = {
  id: string;
  category: ModelCategory;
  title: string;
  description: string;
};

export const ModelGallerySection = ({
  id,
  category,
  title,
  description,
}: ModelGallerySectionProps) => {
  const items = getModelsByCategory(category);

  return (
    <section
      id={id}
      className="scroll-mt-28 border-b border-border/60 py-10 last:border-b-0 sm:py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInView>
          <SectionHeading title={title} description={description} />
        </FadeInView>
        <ModelCarousel models={items} ariaLabel={title} />
      </div>
    </section>
  );
};

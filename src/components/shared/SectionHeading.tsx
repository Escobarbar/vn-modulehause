import { cn } from "@/lib/utils";
import { GradientText } from "./GradientText";

type SectionHeadingProps = {
  label?: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export const SectionHeading = ({
  label,
  title,
  highlight,
  description,
  className,
  align = "left",
}: SectionHeadingProps) => {
  const titleParts = highlight ? title.split(highlight) : null;

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {label && (
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {titleParts ? (
          <>
            {titleParts[0]}
            <GradientText>{highlight}</GradientText>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground text-balance">
          {description}
        </p>
      )}
    </div>
  );
};

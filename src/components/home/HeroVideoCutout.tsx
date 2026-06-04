import { cn } from "@/lib/utils";

type HeroVideoCutoutProps = {
  children: React.ReactNode;
  className?: string;
  /** When false, falls back to gradient text (no video behind hero) */
  hasVideo?: boolean;
};

export const HeroVideoCutout = ({
  children,
  className,
  hasVideo = true,
}: HeroVideoCutoutProps) => {
  if (!hasVideo) {
    return (
      <span className={cn("text-gradient mt-1 block", className)}>{children}</span>
    );
  }

  return (
    <span
      className={cn(
        "hero-video-cutout mt-1 block font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl",
        className,
      )}
    >
      {children}
    </span>
  );
};

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SpecCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
};

export const SpecCard = ({
  icon: Icon,
  label,
  value,
  className,
}: SpecCardProps) => {
  const compact = value.length > 10;

  return (
    <div
      className={cn(
        "group flex aspect-square min-h-[7.5rem] flex-col items-center justify-center gap-2 rounded-2xl border border-border/80 bg-card p-3 shadow-sm transition-all duration-200",
        "hover:border-primary/25 hover:shadow-md hover:shadow-primary/5",
        className,
      )}
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        <Icon className="size-5" strokeWidth={1.75} aria-hidden />
      </div>
      <p className="text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "max-w-full px-1 text-center font-display font-semibold leading-tight text-foreground",
          compact ? "text-sm sm:text-base" : "text-lg sm:text-xl",
        )}
      >
        {value}
      </p>
    </div>
  );
};

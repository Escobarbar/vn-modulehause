import { cn } from "@/lib/utils";

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "p";
};

export const GradientText = ({
  children,
  className,
  as: Tag = "span",
}: GradientTextProps) => (
  <Tag className={cn("text-gradient", className)}>{children}</Tag>
);

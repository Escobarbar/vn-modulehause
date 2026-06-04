import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

/** White line-art on transparent PNG — inverted on light header/footer */
export const Logo = ({ className }: LogoProps) => (
  <Link href="/" className={cn("group flex shrink-0 items-center", className)}>
    <Image
      src="/logo-vn.png"
      alt=""
      width={1005}
      height={780}
      className="h-9 w-auto object-contain brightness-0 transition-opacity group-hover:opacity-80 sm:h-10"
      priority
    />
    <span className="sr-only">{siteConfig.name}</span>
  </Link>
);

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { HouseModel } from "@/content/models/types";
import { formatArea, formatPrice } from "@/content/models";
import { Badge } from "@/components/ui/badge";

type ModelCardProps = {
  model: HouseModel;
  index?: number;
  /** Disable scroll-reveal when used inside carousels */
  animate?: boolean;
};

export const ModelCard = ({
  model,
  index = 0,
  animate = true,
}: ModelCardProps) => {
  const reduceMotion = useReducedMotion();
  const image = model.images[0];
  const href = `/${model.slug}`;

  const card = (
      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <Badge className="absolute left-3 top-3 border-0 bg-white/90 text-foreground">
            KfW {model.kfw}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-xl font-bold text-foreground">
            {model.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatArea(model.livingAreaM2)}
          </p>
          <p className="mt-2 text-lg font-semibold text-primary">
            ab {formatPrice(model.priceFromEur)}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:text-primary">
            Mehr erfahren
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
  );

  if (!animate || reduceMotion) {
    return <article className="group h-full">{card}</article>;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: Math.min(index * 0.04, 0.24), duration: 0.4 }}
      className="group h-full"
    >
      {card}
    </motion.article>
  );
};

"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type WineggRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export const WineggReveal = ({
  children,
  className,
  delay = 0,
}: WineggRevealProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.75,
        delay: delay / 1000,
        ease: [0, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

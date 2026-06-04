"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { homeHeroImage, homeHeroVideo } from "@/content/home-media";

export const HeroBackground = () => {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduceMotion || !videoRef.current) return;
    const video = videoRef.current;
    const play = () => {
      void video.play().catch(() => {});
    };
    if (video.readyState >= 2) play();
    else video.addEventListener("canplay", play, { once: true });
    return () => video.removeEventListener("canplay", play);
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <Image
        src={homeHeroImage}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
        aria-hidden
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="size-full object-cover"
      muted
      loop
      playsInline
      preload="metadata"
      poster={homeHeroImage}
      aria-hidden
    >
      <source src={homeHeroVideo} type="video/mp4" />
    </video>
  );
};

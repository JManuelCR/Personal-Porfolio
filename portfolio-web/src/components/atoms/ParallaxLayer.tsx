"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type PropsWithChildren } from "react";

interface ParallaxLayerProps extends PropsWithChildren {
  speed?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  className,
  speed = 1,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -90, speed * 90]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: reduceMotion ? 0 : y, willChange: "transform" }}
      data-testid="parallax-layer"
    >
      {children}
    </motion.div>
  );
}

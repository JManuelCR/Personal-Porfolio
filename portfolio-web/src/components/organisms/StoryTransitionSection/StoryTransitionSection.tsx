"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ParallaxLayer, SectionTitle } from "@/components/atoms";

interface StoryTransitionSectionProps {
  content: {
    title: string;
    subtitle: string;
    focusLabel: string;
    focusValue: string;
  };
}

export function StoryTransitionSection({ content }: StoryTransitionSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [0.84, 1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.2, 1, 0.88]);

  return (
    <section id="historia" ref={ref} className="relative overflow-hidden rounded-3xl border border-line bg-panel-strong p-8 md:p-12">
      <ParallaxLayer speed={0.6} className="story-shape story-rail" />
      <ParallaxLayer speed={1.25} className="story-shape story-focus" />

      <motion.div className="relative z-10 space-y-8" style={{ scale, opacity }}>
        <SectionTitle eyebrow={content.focusLabel}>{content.title}</SectionTitle>
        <p className="max-w-3xl text-base leading-8 text-muted md:text-lg">
          {content.subtitle}
        </p>
        <div className="story-focus-card">
          <span className="story-focus-label">{content.focusLabel}</span>
          <p className="story-focus-value">{content.focusValue}</p>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ProfileStoryPhase } from "@/types/portfolio";

interface ProfileVisualNarrativeProps {
  phases: ProfileStoryPhase[];
}

const MIN_NARRATIVE_PHASES = 4;

const clamp = (value: number, min: number, max: number): number => {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
};

export function ProfileVisualNarrative({ phases }: ProfileVisualNarrativeProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const [softenMotion, setSoftenMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const updateMotionProfile = () => {
      setSoftenMotion(window.innerWidth < 768);
    };

    updateMotionProfile();
    window.addEventListener("resize", updateMotionProfile);

    return () => {
      window.removeEventListener("resize", updateMotionProfile);
    };
  }, []);

  useEffect(() => {
    if (phases.length === 0) {
      return;
    }

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const nextIndex = clamp(Math.floor(latest * phases.length), 0, phases.length - 1);
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    });

    return unsubscribe;
  }, [phases.length, scrollYProgress]);

  const narrativeHeight = Math.max(MIN_NARRATIVE_PHASES, phases.length) * 100;
  const safeActiveIndex = phases.length > 0 ? clamp(activeIndex, 0, phases.length - 1) : 0;
  const activePhase =
    phases[safeActiveIndex] ??
    ({
      id: "phase-fallback",
      stage: "",
      title: "",
      description: "",
      imageGallery: [],
      backgroundLayer: "",
      floatingElement: "",
      parallaxSpeed: 0,
    } as ProfileStoryPhase);
  const parallaxFactor = reduceMotion ? 0 : softenMotion ? 0.55 : 1;

  const backgroundYBase = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const floatingYBase = useTransform(scrollYProgress, [0, 1], [-220, 220]);

  const backgroundY = useTransform(backgroundYBase, (value) => {
    return value * activePhase.parallaxSpeed * parallaxFactor;
  });

  const floatingY = useTransform(floatingYBase, (value) => {
    const depthMultiplier = Math.max(0.7, activePhase.parallaxSpeed + 0.35);
    return value * depthMultiplier * parallaxFactor;
  });

  if (phases.length === 0) {
    return null;
  }

  const visibleGallery = activePhase.imageGallery.slice(0, 3);

  return (
    <section
      id="profile-story"
      ref={sectionRef}
      className="profile-visual-narrative"
      style={{ height: `${narrativeHeight}vh` }}
    >
      <div className="profile-visual-narrative-sticky">
        <motion.div
          className="profile-narrative-layer profile-narrative-layer-bg"
          style={reduceMotion ? undefined : { y: backgroundY }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`bg-${activePhase.id}`}
              className="profile-narrative-bg-frame"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <Image
                src={activePhase.backgroundLayer}
                alt={`${activePhase.title} background`}
                fill
                unoptimized
                sizes="100vw"
                className="profile-narrative-bg-image"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="profile-narrative-layer profile-narrative-layer-floating"
          style={reduceMotion ? undefined : { y: floatingY }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`floating-${activePhase.id}`}
              className="profile-narrative-floating-frame"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <Image
                src={activePhase.floatingElement}
                alt={`${activePhase.stage} floating asset`}
                fill
                unoptimized
                sizes="(max-width: 767px) 80px, 170px"
                className="profile-narrative-floating-image"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="profile-narrative-layer profile-narrative-layer-content">
          <AnimatePresence mode="wait">
            <motion.article
              key={activePhase.id}
              className="profile-narrative-content"
              data-testid={`profile-narrative-${activePhase.id}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <p className="profile-narrative-stage">{activePhase.stage}</p>
              <h3 className="profile-narrative-title">{activePhase.title}</h3>
              <p className="profile-narrative-description">{activePhase.description}</p>

              <div className="profile-narrative-gallery" aria-label="Profile phase gallery">
                {visibleGallery.map((image, index) => (
                  <div
                    key={`${activePhase.id}-gallery-${index + 1}`}
                    className="profile-narrative-gallery-item"
                  >
                    <Image
                      src={image}
                      alt={`${activePhase.stage} gallery ${index + 1}`}
                      fill
                      unoptimized
                      sizes="(max-width: 767px) 100vw, 280px"
                      className="profile-narrative-gallery-image"
                    />
                  </div>
                ))}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="profile-narrative-progress" aria-hidden="true">
          {phases.map((phase, index) => (
            <span
              key={phase.id}
              className={`profile-narrative-progress-dot${index === safeActiveIndex ? " is-active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

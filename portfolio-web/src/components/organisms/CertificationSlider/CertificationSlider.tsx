"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SectionTitle, SliderArrow, SliderDot } from "@/components/atoms";
import { CertificationCard } from "@/components/molecules";
import dynamic from 'next/dynamic';

export interface CertificationSlideItem {
  id: string;
  badge: string;
  title: string;
  issuer: string;
  imageUrl: string;
  skills: string[];
  dotLabel: string;
}

interface CertificationSliderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  previousLabel: string;
  nextLabel: string;
  statusLabel: string;
  items: CertificationSlideItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function getSlidesPerView(viewportWidth: number): number {
  if (viewportWidth < 768) {
    return 1;
  }

  if (viewportWidth < 1120) {
    return 2;
  }

  return 3;
}

export function CertificationSlider({
  eyebrow,
  title,
  subtitle,
  previousLabel,
  nextLabel,
  statusLabel,
  items,
  autoPlay = false,
  autoPlayInterval = 4200,
}: CertificationSliderProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const updateMeasurements = () => {
      const nextWidth = viewportRef.current?.offsetWidth ?? window.innerWidth;
      setSlidesPerView(getSlidesPerView(nextWidth));
    };

    updateMeasurements();

    const resizeObserver = new ResizeObserver(updateMeasurements);

    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }

    window.addEventListener("resize", updateMeasurements);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMeasurements);
    };
  }, []);

  const itemCount = items.length;
  const visibleCount = Math.min(slidesPerView, Math.max(itemCount, 1));
  const activeIndex = itemCount === 0 ? 0 : ((currentIndex % itemCount) + itemCount) % itemCount;
  const activeItem = items[activeIndex];
  const visibleItems = Array.from({ length: visibleCount }, (_, offset) => {
    const itemIndex = itemCount === 0 ? 0 : (activeIndex + offset) % itemCount;
    return items[itemIndex];
  }).filter(Boolean);

  useEffect(() => {
    if (!autoPlay || itemCount <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setDirection(1);
      setCurrentIndex((previousIndex) => previousIndex + 1);
    }, autoPlayInterval);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [autoPlay, autoPlayInterval, itemCount]);

  const movePrevious = () => {
    setDirection(-1);
    setCurrentIndex((previousIndex) => previousIndex - 1);
  };

  const moveNext = () => {
    setDirection(1);
    setCurrentIndex((previousIndex) => previousIndex + 1);
  };

  const goToIndex = (index: number) => {
    setDirection(index >= activeIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } },
  ) => {
    if (info.offset.x <= -60) {
      moveNext();
      return;
    }

    if (info.offset.x >= 60) {
      movePrevious();
    }
  };

  return (
    <section
      id="certifications"
      className="mission-panel certification-slider-shell overflow-hidden rounded-3xl p-8 md:p-12"
      aria-roledescription="carousel"
      aria-label={title}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          movePrevious();
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          moveNext();
        }
      }}
      tabIndex={0}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <SectionTitle eyebrow={eyebrow}>{title}</SectionTitle>
            <p className="max-w-3xl text-base leading-8 text-muted md:text-lg">{subtitle}</p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto">
            <SliderArrow
              direction="prev"
              ariaLabel={previousLabel}
              onClick={movePrevious}
              disabled={itemCount <= 1}
            />
            <SliderArrow
              direction="next"
              ariaLabel={nextLabel}
              onClick={moveNext}
              disabled={itemCount <= 1}
            />
          </div>
        </div>

        <div ref={viewportRef} className="certification-slider-viewport overflow-hidden pt-2">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`${activeIndex}-${slidesPerView}`}
              className="certification-slider-track"
              initial={{ x: direction > 0 ? 72 : -72, opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -72 : 72, opacity: 0.5 }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              drag={itemCount > 1 ? "x" : false}
              dragElastic={0.08}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              style={{ "--slides-per-view": String(visibleCount) } as CSSProperties}
            >
              {visibleItems.map((item, index) => (
                <div key={`${item.id}-${index}-${activeIndex}`} className="certification-slide">
                  <CertificationCard {...item} active={index === 0} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {items.map((item, index) => (
              <SliderDot
                key={`${item.id}-${index}`}
                active={activeIndex === index}
                ariaLabel={item.dotLabel || item.title}
                onClick={() => goToIndex(index)}
              />
            ))}
          </div>

          <div className="certification-slider-status" aria-live="polite">
            <span className="certification-slider-status-label">{statusLabel}</span>
            <AnimatePresence mode="wait">
              {activeItem ? (
                <motion.p
                  key={`${activeItem.id}-${activeItem.title}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="certification-slider-status-value"
                >
                  {activeItem.title}
                  <span className="mx-2 text-accent-strong">/</span>
                  {activeItem.issuer}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

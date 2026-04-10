"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { SectionTitle, SliderArrow, SliderDot } from "@/components/atoms";
import { CertificationCard } from "@/components/molecules";

const sliderGap = 16;

export interface CertificationSlideItem {
  badge: string;
  title: string;
  issuer: string;
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
  const [viewportWidth, setViewportWidth] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const updateMeasurements = () => {
      const nextWidth = viewportRef.current?.offsetWidth ?? window.innerWidth;
      setViewportWidth(nextWidth);
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

  const maxIndex = Math.max(0, items.length - slidesPerView);
  const visibleIndex = Math.min(currentIndex, maxIndex);
  const paginationCount = maxIndex + 1;
  const activeItem = items[visibleIndex] ?? items[0];

  useEffect(() => {
    if (!autoPlay || maxIndex === 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex >= maxIndex ? 0 : previousIndex + 1));
    }, autoPlayInterval);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [autoPlay, autoPlayInterval, maxIndex]);

  const offset = useMemo(() => {
    if (!viewportWidth) {
      return 0;
    }

    return visibleIndex * ((viewportWidth + sliderGap) / slidesPerView);
  }, [slidesPerView, viewportWidth, visibleIndex]);

  const movePrevious = () => {
    setCurrentIndex(visibleIndex <= 0 ? maxIndex : visibleIndex - 1);
  };

  const moveNext = () => {
    setCurrentIndex(visibleIndex >= maxIndex ? 0 : visibleIndex + 1);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
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
              disabled={items.length <= 1}
            />
            <SliderArrow
              direction="next"
              ariaLabel={nextLabel}
              onClick={moveNext}
              disabled={items.length <= 1}
            />
          </div>
        </div>

        <div ref={viewportRef} className="certification-slider-viewport overflow-hidden">
          <motion.div
            className="certification-slider-track"
            style={{ "--slides-per-view": String(slidesPerView) } as CSSProperties}
            animate={{ x: -offset }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            drag={items.length > slidesPerView ? "x" : false}
            dragElastic={0.08}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
          >
            {items.map((item, index) => {
              const isVisible = index >= visibleIndex && index < visibleIndex + slidesPerView;

              return (
                <motion.div key={`${item.badge}-${item.title}`} layout className="certification-slide">
                  <CertificationCard {...item} active={isVisible} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {Array.from({ length: paginationCount }, (_, index) => {
              const item = items[index] ?? items[0];

              return (
                <SliderDot
                  key={`${item.badge}-${index}`}
                  active={visibleIndex === index}
                  ariaLabel={item.dotLabel}
                  onClick={() => setCurrentIndex(index)}
                />
              );
            })}
          </div>

          <div className="certification-slider-status" aria-live="polite">
            <span className="certification-slider-status-label">{statusLabel}</span>
            <AnimatePresence mode="wait">
              <motion.p
                key={`${activeItem.badge}-${activeItem.title}`}
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
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

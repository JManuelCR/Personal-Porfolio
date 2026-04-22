"use client";

import Lenis from "lenis";
import { useEffect, type PropsWithChildren } from "react";

const localeSwitchScrollResetKey = "portfolio:locale-switch-reset-scroll";

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      gestureOrientation: "vertical",
      wheelMultiplier: 0.95,
      touchMultiplier: 1.1,
      autoRaf: true,
      anchors: true,
    });

    if (window.sessionStorage.getItem(localeSwitchScrollResetKey) === "1") {
      window.sessionStorage.removeItem(localeSwitchScrollResetKey);
      lenis.scrollTo(0, { immediate: true });
      // window.requestAnimationFrame(() => {
      //   lenis.scrollTo(0, { immediate: true });
      // });
    }

    let rafId = 0;

    const frame = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(frame);
    };

    rafId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ParallaxLayer } from "./ParallaxLayer";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  return {
    motion: {
      div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
        function MotionDiv(props, ref) {
          return <div ref={ref} {...props} />;
        },
      ),
    },
    useReducedMotion: () => false,
    useScroll: () => ({ scrollYProgress: 0.5 }),
    useTransform: () => 0,
  };
});

describe("ParallaxLayer", () => {
  it("renders children without breaking scroll hooks", () => {
    render(
      <ParallaxLayer speed={1.2}>
        <div>Layer Content</div>
      </ParallaxLayer>,
    );

    expect(screen.getByText("Layer Content")).toBeInTheDocument();
    expect(screen.getByTestId("parallax-layer")).toBeInTheDocument();
  });
});

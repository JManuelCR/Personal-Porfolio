import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProfileVisualNarrative } from "./ProfileVisualNarrative";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
        function MotionDiv(props, ref) {
          return <div ref={ref} {...props} />;
        },
      ),
      article: React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
        function MotionArticle(props, ref) {
          return <article ref={ref} {...props} />;
        },
      ),
    },
    useReducedMotion: () => false,
    useScroll: () => ({
      scrollYProgress: {
        on: () => () => undefined,
      },
    }),
    useTransform: () => 0,
  };
});

const phases = [
  {
    id: "phase-1",
    stage: "Industrial Core",
    title: "Hardware & Low-Level Control",
    description: "PLC and assembler foundations.",
    imageGallery: ["https://example.com/img-1.webp"],
    backgroundLayer: "https://example.com/bg-1.webp",
    floatingElement: "https://example.com/fg-1.webp",
    parallaxSpeed: 0.2,
  },
  {
    id: "phase-2",
    stage: "Connectivity",
    title: "CAN-BUS Protocol Intelligence",
    description: "Critical network fault detection.",
    imageGallery: ["https://example.com/img-2.webp"],
    backgroundLayer: "https://example.com/bg-2.webp",
    floatingElement: "https://example.com/fg-2.webp",
    parallaxSpeed: 0.6,
  },
];

describe("ProfileVisualNarrative", () => {
  it("renders the first phase inside the sticky narrative viewport", () => {
    render(<ProfileVisualNarrative phases={phases} />);

    expect(screen.getByTestId("profile-narrative-phase-1")).toBeInTheDocument();
    expect(screen.getByText("Industrial Core")).toBeInTheDocument();
  });
});

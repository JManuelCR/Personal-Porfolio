import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StoryTransitionSection } from "@/components/organisms/StoryTransitionSection";

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
    useTransform: () => 1,
  };
});

describe("StoryTransitionSection", () => {
  it("renders transition content with scroll hooks mocked", () => {
    render(
      <StoryTransitionSection
        content={{
          title: "Historia",
          subtitle: "Transicion hacia analitica",
          focusLabel: "Enfoque",
          focusValue: "Business Analytics",
        }}
      />,
    );

    expect(screen.getByText("Historia")).toBeInTheDocument();
    expect(screen.getByText("Business Analytics")).toBeInTheDocument();
  });
});

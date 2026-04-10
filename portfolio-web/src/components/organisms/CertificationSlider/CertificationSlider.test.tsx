import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { CertificationSlider } from "./CertificationSlider";

vi.mock("framer-motion", async () => {
  const React = await import("react");

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function MotionDiv(
        props,
        ref,
      ) {
        return <div ref={ref} {...props} />;
      }),
      p: React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(function MotionParagraph(
        props,
        ref,
      ) {
        return <p ref={ref} {...props} />;
      }),
    },
  };
});

const items = [
  {
    badge: "EGADE",
    title: "Business Analytics Candidate",
    issuer: "EGADE Business School",
    dotLabel: "Go to Business Analytics Candidate",
  },
  {
    badge: "AZURE",
    title: "Cloud Fundamentals Track",
    issuer: "Microsoft Learn",
    dotLabel: "Go to Cloud Fundamentals Track",
  },
  {
    badge: "DATA",
    title: "Data Foundations Track",
    issuer: "Microsoft Learn",
    dotLabel: "Go to Data Foundations Track",
  },
  {
    badge: "POWER",
    title: "Power BI Reporting Track",
    issuer: "Microsoft Learn",
    dotLabel: "Go to Power BI Reporting Track",
  },
];

beforeEach(() => {
  class ResizeObserverMock {
    observe() {}
    disconnect() {}
  }

  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("CertificationSlider", () => {
  it("moves to the next certification when next arrow is clicked", () => {
    render(
      <CertificationSlider
        eyebrow="Validation Track"
        title="Certifications"
        subtitle="Proof points"
        previousLabel="Previous certification"
        nextLabel="Next certification"
        statusLabel="Active certification"
        items={items}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Next certification" }));

    expect(screen.getByText("Cloud Fundamentals Track")).toBeInTheDocument();
    expect(screen.getByText("Microsoft Learn")).toBeInTheDocument();
  });

  it("advances automatically when autoplay is enabled", () => {
    vi.useFakeTimers();

    render(
      <CertificationSlider
        eyebrow="Validation Track"
        title="Certifications"
        subtitle="Proof points"
        previousLabel="Previous certification"
        nextLabel="Next certification"
        statusLabel="Active certification"
        items={items}
        autoPlay
        autoPlayInterval={1500}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText("Cloud Fundamentals Track")).toBeInTheDocument();
  });
});

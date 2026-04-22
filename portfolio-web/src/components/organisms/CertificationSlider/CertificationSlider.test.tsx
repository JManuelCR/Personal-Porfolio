import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { CertificationSlider } from "./CertificationSlider";

vi.mock("framer-motion", async () => {
  const React = await import("react");

  const stripMotionProps = (props: Record<string, unknown>) => {
    const filteredProps = { ...props };

    delete filteredProps.animate;
    delete filteredProps.drag;
    delete filteredProps.dragElastic;
    delete filteredProps.dragMomentum;
    delete filteredProps.exit;
    delete filteredProps.initial;
    delete filteredProps.layout;
    delete filteredProps.onDragEnd;
    delete filteredProps.transition;

    return filteredProps;
  };

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: React.forwardRef(function MotionDiv(props: Record<string, unknown>, ref: React.ForwardedRef<HTMLDivElement>) {
        return <div ref={ref} {...(stripMotionProps(props) as React.HTMLAttributes<HTMLDivElement>)} />;
      }),
      p: React.forwardRef(function MotionParagraph(props: Record<string, unknown>, ref: React.ForwardedRef<HTMLParagraphElement>) {
        return <p ref={ref} {...(stripMotionProps(props) as React.HTMLAttributes<HTMLParagraphElement>)} />;
      }),
    },
  };
});

const items = [
  {
    id: "cert-001",
    badge: "EGADE",
    title: "Business Analytics Candidate",
    issuer: "EGADE Business School",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/demo/o/certs%2Fegade.webp?alt=media",
    skills: ["Business Intelligence", "Decision Making"],
    dotLabel: "Go to Business Analytics Candidate",
  },
  {
    id: "cert-002",
    badge: "AZURE",
    title: "Cloud Fundamentals Track",
    issuer: "Microsoft Learn",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/demo/o/certs%2Fazure.webp?alt=media",
    skills: ["Azure Architecture", "Cloud Security"],
    dotLabel: "Go to Cloud Fundamentals Track",
  },
  {
    id: "cert-003",
    badge: "DATA",
    title: "Data Foundations Track",
    issuer: "Microsoft Learn",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/demo/o/certs%2Fdata.webp?alt=media",
    skills: ["Python", "Machine Learning"],
    dotLabel: "Go to Data Foundations Track",
  },
  {
    id: "cert-004",
    badge: "POWER",
    title: "Power BI Reporting Track",
    issuer: "Microsoft Learn",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/demo/o/certs%2Fpower.webp?alt=media",
    skills: ["Power BI", "Reporting"],
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
  });

  it("loops infinitely back to the first certification", () => {
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

    fireEvent.click(screen.getByRole("button", { name: "Previous certification" }));

    expect(screen.getByText("Power BI Reporting Track")).toBeInTheDocument();
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

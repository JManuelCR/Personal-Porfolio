import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "./ProjectCard";

const project = {
  id: "analytics-demo",
  category: "data_science",
  name: "Analytics Demo",
  stack: ["React 19", "Tailwind"],
  impact: "Improved decision velocity",
  visual: "Interactive KPI board",
  firebaseImageUrl:
    "https://firebasestorage.googleapis.com/v0/b/demo/o/image.webp?alt=media",
  firebaseVideoUrl:
    "https://firebasestorage.googleapis.com/v0/b/demo/o/video.mp4?alt=media",
};

describe("ProjectCard", () => {
  it("switches from image to video on card hover", () => {
    render(<ProjectCard project={project} />);

    const media = screen.getByLabelText("Analytics Demo preview");
    const image = screen.getByAltText("Analytics Demo static preview");
    const video = media.querySelector("video");
    const card = media.closest("article");

    expect(image.className).not.toContain("is-hidden");
    expect(video?.className).not.toContain("is-visible");

    fireEvent.mouseEnter(card as HTMLElement);

    expect(image.className).toContain("is-hidden");
    expect(video?.className).toContain("is-visible");
  });
});

import { describe, expect, it } from "vitest";
import { mapCatalogSourceToProjects, sanitizeCitationNoise } from "@/lib/project-catalog";

describe("project catalog transformation", () => {
  it("maps raw source and preserves Firebase URLs", () => {
    const source = {
      project_logic: {
        analytics: {
          name: "Analytics Demo",
          stack: ["React 19", "Node.js"],
          impact: "Business impact [cite: 1]",
          visual: "Realtime dashboard [cite: 2]",
          firebase_image_url:
            "https://firebasestorage.googleapis.com/v0/b/demo/o/image.webp?alt=media",
          firebase_video_url:
            "https://firebasestorage.googleapis.com/v0/b/demo/o/video.mp4?alt=media",
        },
      },
    };

    const projects = mapCatalogSourceToProjects(source);

    expect(projects).toHaveLength(1);
    expect(projects[0].firebaseImageUrl).toContain("firebasestorage.googleapis.com");
    expect(projects[0].impact).toBe("Business impact");
  });

  it("throws when Firebase URL is invalid", () => {
    const source = {
      project_logic: {
        bad: {
          name: "Invalid Media",
          stack: ["React"],
          impact: "Impact",
          visual: "Visual",
          firebase_image_url: "https://example.com/image.webp",
          firebase_video_url:
            "https://firebasestorage.googleapis.com/v0/b/demo/o/video.mp4?alt=media",
        },
      },
    };

    expect(() => mapCatalogSourceToProjects(source)).toThrow("Invalid firebase image URL");
  });

  it("removes citation markers", () => {
    expect(sanitizeCitationNoise("Data [cite_start] value [cite: 1, 2]")).toBe("Data value");
  });
});

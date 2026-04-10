import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CertificationCard } from "./CertificationCard";

describe("CertificationCard", () => {
  it("renders image, title, issuer and skill badges", () => {
    render(
      <CertificationCard
        badge="EGADE"
        title="Business Analytics Program"
        issuer="EGADE Business School"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/demo/o/certs%2Fegade.webp?alt=media"
        skills={["Business Intelligence", "Statistical Modeling"]}
      />,
    );

    expect(screen.getByText("EGADE")).toBeInTheDocument();
    expect(screen.getByText("Business Analytics Program")).toBeInTheDocument();
    expect(screen.getByText("EGADE Business School")).toBeInTheDocument();
    expect(screen.getByAltText("Business Analytics Program credential image")).toBeInTheDocument();
    expect(screen.getByText("Business Intelligence")).toBeInTheDocument();
  });
});

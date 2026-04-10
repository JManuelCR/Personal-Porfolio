import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CertificationCard } from "./CertificationCard";

describe("CertificationCard", () => {
  it("renders badge, title and issuer", () => {
    render(
      <CertificationCard
        badge="EGADE"
        title="Business Analytics Program"
        issuer="EGADE Business School"
      />,
    );

    expect(screen.getByText("EGADE")).toBeInTheDocument();
    expect(screen.getByText("Business Analytics Program")).toBeInTheDocument();
    expect(screen.getByText("EGADE Business School")).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SliderDot } from "./SliderDot";

describe("SliderDot", () => {
  it("calls onClick and reflects active state", () => {
    const onClick = vi.fn();

    render(<SliderDot active ariaLabel="Go to first slide" onClick={onClick} />);

    const dot = screen.getByRole("button", { name: "Go to first slide" });

    fireEvent.click(dot);

    expect(dot).toHaveAttribute("aria-pressed", "true");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

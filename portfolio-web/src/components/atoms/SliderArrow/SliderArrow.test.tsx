import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SliderArrow } from "./SliderArrow";

describe("SliderArrow", () => {
  it("calls onClick when enabled", () => {
    const onClick = vi.fn();

    render(
      <SliderArrow direction="next" ariaLabel="Next slide" onClick={onClick} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <SliderArrow direction="prev" ariaLabel="Previous slide" disabled onClick={() => {}} />,
    );

    expect(screen.getByRole("button", { name: "Previous slide" })).toBeDisabled();
  });
});

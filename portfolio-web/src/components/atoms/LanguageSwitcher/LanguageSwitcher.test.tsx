import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LanguageSwitcher } from "./LanguageSwitcher";

vi.mock("next-intl", () => ({
  useLocale: () => "es",
}));

describe("LanguageSwitcher", () => {
  it("calls onChange with en locale", () => {
    const onChange = vi.fn();

    render(<LanguageSwitcher value="es" onChange={onChange} />);

    fireEvent.click(screen.getByRole("button", { name: "EN" }));

    expect(onChange).toHaveBeenCalledWith("en");
  });
});

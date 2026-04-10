import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { buildLocaleTarget, LanguageSwitcher } from "./LanguageSwitcher";

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

  it("builds locale targets without preserving anchor hashes", () => {
    expect(buildLocaleTarget("/es", "?view=compact", "en")).toBe("/en?view=compact");
    expect(buildLocaleTarget("/es/historia", "", "en")).toBe("/en/historia");
  });
});

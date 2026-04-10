interface SliderArrowProps {
  direction: "prev" | "next";
  ariaLabel: string;
  disabled?: boolean;
  onClick: () => void;
}

export function SliderArrow({
  direction,
  ariaLabel,
  disabled = false,
  onClick,
}: SliderArrowProps) {
  const isNext = direction === "next";

  return (
    <button
      type="button"
      className={`slider-arrow ${disabled ? "is-disabled" : ""}`}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`slider-arrow-icon ${isNext ? "" : "rotate-180"}`}
      >
        <path
          d="M8 5.5 14.5 12 8 18.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}

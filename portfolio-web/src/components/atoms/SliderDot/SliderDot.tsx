interface SliderDotProps {
  active?: boolean;
  ariaLabel: string;
  onClick: () => void;
}

export function SliderDot({ active = false, ariaLabel, onClick }: SliderDotProps) {
  return (
    <button
      type="button"
      className={`slider-dot ${active ? "is-active" : ""}`}
      aria-label={ariaLabel}
      aria-pressed={active}
      onClick={onClick}
    />
  );
}

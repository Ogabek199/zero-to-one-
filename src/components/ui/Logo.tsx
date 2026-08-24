import { clsx } from "@/lib/clsx";

interface LogoProps {
  /** Colour of the marks + text. */
  variant?: "light" | "dark";
  /** Overall scale via text size; the marks scale with it. */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Stretch the lockup to fill its container's full width. The wordmark is
   * sized off the viewport and the circles absorb whatever width is left, so
   * the logo always spans the gutter-to-gutter width on mobile.
   */
  fluid?: boolean;
  className?: string;
}

const TEXT_SIZE: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "text-[13px] leading-[0.95]",
  md: "text-[15px] leading-[0.95]",
  lg: "text-[26px] leading-[0.95]",
  xl: "text-[52px] leading-[0.92]",
};

const MARK_SIZE: Record<NonNullable<LogoProps["size"]>, number> = {
  sm: 40,
  md: 46,
  lg: 90,
  xl: 152,
};

/* ---- fluid geometry ----------------------------------------------------- */
/* Proportions are taken from the "xl" lockup: a 152px mark next to 52px type,
   separated by a 20px gap. Expressed relative to the type size they become the
   em values below, so one font-size drives the whole lockup. The wordmark is
   ~2.05em wide, which is where the 8.1 divisor comes from:
   mark (5.71em) + gap (0.385em) + word (2.05em) ≈ 8.1em of container width.
   At this divisor the stacked wordmark and the circles come out the same
   height; to make the lockup shorter, cap the container's width instead of
   changing the divisor. */
const FLUID_MARK_D = 152;
const FLUID_STROKE = 4;
const FLUID_R = FLUID_MARK_D / 2 - FLUID_STROKE / 2 - 1.5;
const FLUID_OVERLAP = 2 * FLUID_R;
const FLUID_VIEWBOX = `0 0 ${FLUID_MARK_D + FLUID_OVERLAP} ${FLUID_MARK_D}`;
/** The lockup is sized off its own container's width (container query units),
    so it fills the full gutter-to-gutter width on mobile and the full width of
    whatever column it sits in on desktop. */
const FLUID_FONT_SIZE = "calc(100cqw / 8.1)";

/**
 * Zero to One wordmark: an outlined circle overlapping a filled circle,
 * followed by the stacked "zero / to / one" lockup.
 */
export function Logo({
  variant = "light",
  size = "md",
  fluid = false,
  className,
}: LogoProps) {
  const color = variant === "light" ? "#FFFFFF" : "#0D0D0D";

  if (fluid) {
    return (
      <span
        className={clsx("block w-full", className)}
        style={{ containerType: "inline-size" }}
      >
      <span
        className="flex w-full items-center gap-[0.385em]"
        style={{ fontSize: FLUID_FONT_SIZE }}
      >
        <svg
          viewBox={FLUID_VIEWBOX}
          fill="none"
          aria-hidden="true"
          className="h-auto min-w-0 flex-1"
        >
          <circle
            cx={FLUID_MARK_D / 2}
            cy={FLUID_MARK_D / 2}
            r={FLUID_R}
            stroke={color}
            strokeWidth={FLUID_STROKE}
          />
          <circle
            cx={FLUID_OVERLAP + FLUID_MARK_D / 2}
            cy={FLUID_MARK_D / 2}
            r={FLUID_R}
            fill={color}
          />
        </svg>
        <span
          className="shrink-0 font-sans text-[1em] font-medium lowercase leading-[0.92]"
          style={{ color }}
        >
          zero
          <br />
          to
          <br />
          one
        </span>
      </span>
      </span>
    );
  }

  const heights: Record<NonNullable<LogoProps["size"]>, string> = {
    sm: "h-[28px]",
    md: "h-[36px]",
    lg: "h-[64px]",
    xl: "h-[108px]",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center",
        size === "xl" ? "gap-5" : size === "lg" ? "gap-3.5" : "gap-2.5",
        className,
      )}
    >
      <svg
        viewBox={FLUID_VIEWBOX}
        fill="none"
        aria-hidden="true"
        shapeRendering="geometricPrecision"
        className={clsx("w-auto shrink-0", heights[size])}
      >
        <circle
          cx={FLUID_MARK_D / 2}
          cy={FLUID_MARK_D / 2}
          r={FLUID_R}
          stroke={color}
          strokeWidth={FLUID_STROKE}
        />
        <circle
          cx={FLUID_OVERLAP + FLUID_MARK_D / 2}
          cy={FLUID_MARK_D / 2}
          r={FLUID_R}
          fill={color}
        />
      </svg>
      <span
        className={clsx(
          "shrink-0 font-sans font-medium lowercase select-none",
          TEXT_SIZE[size],
        )}
        style={{ color }}
      >
        zero
        <br />
        to
        <br />
        one
      </span>
    </span>
  );
}

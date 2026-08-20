import { clsx } from "@/lib/clsx";

interface LogoProps {
  /** Colour of the marks + text. */
  variant?: "light" | "dark";
  /** Overall scale via text size; the marks scale with it. */
  size?: "sm" | "md" | "lg" | "xl";
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

/**
 * Zero to One wordmark: an outlined circle overlapping a filled circle,
 * followed by the stacked "zero / to / one" lockup.
 */
export function Logo({ variant = "light", size = "md", className }: LogoProps) {
  const color = variant === "light" ? "#FFFFFF" : "#0D0D0D";
  const large = size === "lg" || size === "xl";
  const d = MARK_SIZE[size];
  const stroke = size === "xl" ? 4 : size === "lg" ? 3 : 2;
  const r = d / 2 - stroke / 2 - (large ? 1.5 : 0.5);
  // Distance between the two circle centres. Set to the sum of the radii
  // (2 * r) so the circles only kiss at their edges instead of overlapping.
  const overlap = 2 * r;

  return (
    <span
      className={clsx(
        "inline-flex items-center",
        size === "xl" ? "gap-5" : "gap-2",
        className,
      )}
    >
      <svg
        width={d + overlap}
        height={d}
        viewBox={`0 0 ${d + overlap} ${d}`}
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle
          cx={d / 2}
          cy={d / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
        />
        <circle cx={overlap + d / 2} cy={d / 2} r={r} fill={color} />
      </svg>
      <span
        className={clsx(
          "font-sans font-medium lowercase",
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

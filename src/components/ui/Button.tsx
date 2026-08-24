import { clsx } from "@/lib/clsx";
import type { AnchorHTMLAttributes } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** light = white bg / red text (on red sections). */
  variant?: "light";
  fullWidth?: boolean;
}

/**
 * Primary call-to-action with landing page micro-interactions.
 */
export function Button({
  variant = "light",
  fullWidth,
  className,
  children,
  href = "#ariza",
  ...rest
}: ButtonProps) {
  return (
    <a
      href={href}
      className={clsx(
        "group relative inline-flex items-center justify-center overflow-hidden px-8 py-4",
        "font-sans text-[16px] leading-[90%] font-bold uppercase tracking-[-4%]",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.015] hover:shadow-xl active:scale-[0.985] active:duration-100",
        "cursor-pointer select-none",
        variant === "light" &&
          "bg-white text-[#DE2A41] shadow-lg shadow-black/10 hover:bg-white hover:shadow-black/20",
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {/* Dynamic light sheen sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-full top-0 block -skew-x-12 bg-gradient-to-r from-transparent via-red-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-shimmer group-hover:opacity-100"
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </a>
  );
}

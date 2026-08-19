import { clsx } from "@/lib/clsx";
import type { AnchorHTMLAttributes } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** light = white bg / red text (on red sections). */
  variant?: "light";
  fullWidth?: boolean;
}

/**
 * Primary call-to-action. Rendered as an anchor so it can link to the
 * application form; swap `href` for your real endpoint.
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
        "inline-flex items-center justify-center px-8 py-4",
        "font-sans text-[13px] font-bold uppercase tracking-[0.08em]",
        "transition-colors duration-200",
        variant === "light" &&
          "bg-white text-brand-red hover:bg-white/90",
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

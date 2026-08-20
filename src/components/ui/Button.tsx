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
        "font-sans text-[16px] leading-[90%] font-bold uppercase tracking-[-4%]",
        "transition-colors duration-200",
        variant === "light" &&
          "bg-white text-[#DE2A41] hover:bg-white/90",
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

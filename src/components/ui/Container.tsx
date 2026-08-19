import { clsx } from "@/lib/clsx";
import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Render as a different element (e.g. "section"). Defaults to div. */
  as?: ElementType;
}

/**
 * The single site container. Centres content, caps width at 1440px
 * (see `maxWidth.shell` in tailwind.config.ts) and applies the gutter.
 * Every section wraps its content in this so widths stay consistent.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={clsx(
        "mx-auto w-full max-w-shell px-5 sm:px-8",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

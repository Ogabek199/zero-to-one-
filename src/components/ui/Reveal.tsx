"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { clsx } from "@/lib/clsx";

interface RevealProps {
  children: ReactNode;
  /** Stagger, in milliseconds, applied as a transition delay. */
  delay?: number;
  className?: string;
}

/**
 * Fades its children up into place the first time they scroll into view.
 *
 * Cheap by design: no animation library, one shared-shape IntersectionObserver
 * per instance that unobserves itself after firing, and the animation itself
 * only touches `opacity` and `transform`, so it stays on the compositor and
 * never triggers layout. Users with "reduce motion" enabled — and browsers
 * without IntersectionObserver — get the content immediately, unanimated.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      el.classList.add("reveal-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("reveal-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

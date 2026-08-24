"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { clsx } from "@/lib/clsx";

export type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "blur-in";

interface RevealProps {
  children: ReactNode;
  /** Stagger, in milliseconds, applied as a transition delay. */
  delay?: number;
  /** Animation variant (default: "fade-up") */
  variant?: RevealVariant;
  /** Duration in milliseconds (default: 800ms) */
  duration?: number;
  className?: string;
}

/**
 * High-performance landing page reveal component with spring easing and compositor transforms.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "fade-up",
  duration,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /** Show the block with no transition at all (no flash, no re-fade). */
    const showInstantly = () => {
      const previous = el.style.transition;
      el.style.transition = "none";
      el.classList.add("reveal-in");
      void el.offsetHeight;
      el.style.transition = previous;
    };

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      showInstantly();
      return;
    }

    if (window.scrollY > 0 && el.getBoundingClientRect().top < window.innerHeight) {
      showInstantly();
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
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx("reveal", `reveal-${variant}`, className)}
      style={{
        ...(delay ? { transitionDelay: `${delay}ms` } : {}),
        ...(duration ? { transitionDuration: `${duration}ms` } : {}),
      }}
    >
      {children}
    </div>
  );
}

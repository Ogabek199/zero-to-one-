import { clsx } from "@/lib/clsx";

interface StepBlockProps {
  /** Image source (defaults to /zero_to_one.jpg). */
  src?: string;
  /** Flip horizontally (used to mirror the shape for the CTA section). */
  flipX?: boolean;
  flipY?: boolean;
  className?: string;
}

/**
 * The large white stepped background graphic that sits behind the hero and
 * CTA headlines. It renders /public/zero_to_one.svg — drop your exact SVG in
 * with that filename and it appears here with no code changes.
 */
export function StepBlock({ src = "/zero_to_one.jpg", flipX, flipY, className }: StepBlockProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx("pointer-events-none absolute inset-0", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="h-full w-full"
        style={{
          objectFit: "fill",
          transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
        }}
      />
    </div>
  );
}

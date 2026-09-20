import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  /** Run the track in the opposite direction */
  reverse?: boolean;
  /** Extra classes for the outer (overflow-hidden) wrapper */
  className?: string;
  /** Separator glyph between items */
  separator?: string;
  /** Track duration in seconds */
  duration?: number;
  /** Pause the marquee on hover */
  pauseOnHover?: boolean;
}

/** Pure-CSS infinite marquee. Two copies of the list translate -50%. */
export default function Marquee({
  items,
  reverse = false,
  className,
  separator = "✦",
  duration = 42,
  pauseOnHover = true,
}: MarqueeProps) {
  /** One copy of the track. Only the visible copy is exposed to screen readers. */
  const renderTrack = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex w-max shrink-0 items-center gap-12 pr-12"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-12">
          <span className="whitespace-nowrap font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
            {item}
          </span>
          <span className="text-xl text-terra md:text-2xl" aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "overflow-hidden",
        pauseOnHover && "marquee-pause",
        className
      )}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div
        className={cn(
          "flex w-max",
          reverse ? "marquee-track-reverse" : "marquee-track"
        )}
      >
        {renderTrack(false)}
        {renderTrack(true)}
      </div>
    </div>
  );
}
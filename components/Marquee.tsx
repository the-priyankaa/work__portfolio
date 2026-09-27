"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Scroll speed in px/second. Deriving the duration from the measured group
 * width rather than a fixed 28s is what keeps the pace identical on a phone and
 * on a 4K panel: adding copies to cover a wide viewport must not make the words
 * scroll faster. 46px/s is the pace this has always had.
 */
const SPEED = 46;

/**
 * Groups rendered before measurement — and if measurement never happens. Two is
 * what the band has always shipped, so it still loops with JS disabled and
 * still loops for the frame or two before hydration lands.
 */
const DEFAULT_COPIES = 2;

/** Everything the stylesheet needs in order to loop seamlessly. */
interface Metrics {
  /** Identical groups on the track. */
  copies: number;
  /**
   * Seconds for one group-width shift. Null until measured, so the stylesheet
   * default applies and the track animates from its first frame.
   */
  duration: number | null;
}

/**
 * Infinite CSS marquee band. Decorative — hidden from screen readers.
 *
 * The loop is a `translateX` from 0 to exactly one group width, which is what
 * makes it seamless: whatever is on screen at the end of the cycle is exactly
 * what was on screen at the start. That only holds while the track is wider
 * than the viewport, so the group count is measured rather than assumed — a
 * fixed 2 groups leaves an empty band on any display wider than the content.
 */
export default function Marquee({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<Metrics>({ copies: DEFAULT_COPIES, duration: null });

  // Every group is identical, so measuring one of them covers all of them.
  const row = [...items, ...items];

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const group = groupRef.current;
      if (!container || !group) return;
      const groupWidth = group.offsetWidth;
      // Not laid out yet, or an empty item list.
      if (groupWidth <= 0) return;
      // The spare copy is what removes the gap. The shift is one whole group,
      // so the track has to reach a full group *past* the viewport edge —
      // otherwise the far side runs dry before the next group arrives.
      const copies = Math.max(DEFAULT_COPIES, Math.ceil(container.clientWidth / groupWidth) + 1);
      setMetrics({ copies, duration: groupWidth / SPEED });
    };

    measure();

    // Anton comes from @fontsource, so the first measurement is taken against
    // the fallback face and would under-count the width.
    document.fonts?.ready.then(measure);

    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    // The container follows the viewport. The groups are fixed-width text with
    // no wrapping, so they only change when the font does — not on resize.
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [items]);

  // Custom properties inherit, so setting them on the container is enough for
  // both the track's `animation` and the keyframe to see them.
  const style: CSSProperties | undefined =
    metrics.duration === null
      ? undefined
      : ({
          "--marquee-copies": metrics.copies,
          "--marquee-duration": `${metrics.duration.toFixed(2)}s`,
        } as CSSProperties);

  return (
    <div className="marquee" aria-hidden="true" ref={containerRef} style={style}>
      <div className="marquee__track">
        {Array.from({ length: metrics.copies }, (_, group) => (
          <div className="marquee__group" key={group} ref={group === 0 ? groupRef : undefined}>
            {row.map((item, i) => (
              <span className="marquee__item" key={`${group}-${i}`}>
                {item} <span className="marquee__sep" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

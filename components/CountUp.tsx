"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Target value to count up to. */
  value: number;
  /** Text appended after the number, e.g. "+". */
  suffix?: string;
  duration?: number;
}

/** Counts from 0 to `value` when scrolled into view. */
export default function CountUp({ value, suffix = "", duration = 1.2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
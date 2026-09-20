"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Custom cursor (desktop, fine pointers only).
 * A small dot follows the pointer; a ring lags behind and
 * grows + shows a label over interactive elements.
 */
export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // Defer enabling so we don't call setState synchronously inside the effect.
    const raf = requestAnimationFrame(() => setEnabled(true));
    const cleanup = () => cancelAnimationFrame(raf);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: Event) => {
      const target = e.target as Element | null;
      const interactive = target?.closest?.(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      );
      setHovering(Boolean(interactive));

      const labelled = interactive?.closest?.("[data-cursor-label]");
      if (labelled instanceof HTMLElement && labelled.dataset.cursorLabel) {
        setLabel(labelled.dataset.cursorLabel);
      } else if (interactive?.closest?.("[data-cursor='view']")) {
        setLabel("VIEW");
      } else {
        setLabel("");
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      cleanup();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* trailing ring / label */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999]"
        style={{ x: ringX, y: ringY }}
      >
        <div
          className={cn(
            "-translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color,border-color] duration-300 ease-out",
            label
              ? "h-20 w-20 border border-terra bg-terra/25"
              : hovering
                ? "h-12 w-12 border border-terra/70"
                : "h-8 w-8 border border-cream/50"
          )}
        >
          {label && (
            <span className="flex h-full w-full items-center justify-center font-display text-[10px] uppercase tracking-[0.2em] text-cream">
              {label}
            </span>
          )}
        </div>
      </motion.div>

      {/* dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999]"
        style={{ x, y }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-terra" />
      </motion.div>
    </>
  );
}
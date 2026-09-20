"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts */
  delay?: number;
  /** Initial vertical offset in px */
  y?: number;
  /** Animate only once */
  once?: boolean;
}

/**
 * Scroll-triggered fade/slide reveal.
 * prefers-reduced-motion is handled globally by <MotionConfig reducedMotion="user">.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
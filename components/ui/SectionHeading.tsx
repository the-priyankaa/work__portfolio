"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small editorial kicker shown above the title, e.g. "SERVICES" */
  kicker?: string;
  /** Big display title (ReactNode so you can mix accents/styles) */
  title: ReactNode;
  className?: string;
}

/** Editorial section heading — kicker line + oversized display title. */
export default function SectionHeading({
  kicker,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("text-center", className)}>
      {kicker && (
        <span className="mb-5 inline-flex items-center gap-4 font-display text-[11px] uppercase tracking-[0.45em] text-terra-light">
          <span className="h-px w-10 bg-terra/60" aria-hidden />
          {kicker}
          <span className="h-px w-10 bg-terra/60" aria-hidden />
        </span>
      )}
      <h2 className="font-display text-[clamp(2.5rem,7vw,5.25rem)] font-black uppercase leading-[0.95] tracking-tight text-cream">
        {title}
      </h2>
    </Reveal>
  );
}
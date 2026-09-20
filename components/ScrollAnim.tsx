"use client";

import { useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import { useMotionValueEvent, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollAnimProps {
  /** 0→1 scroll progress of the owning (tall) section */
  progress: MotionValue<number>;
  /** Canvas-rendered scroll video (frequent keyframes for smooth seeking) */
  videoSrc: string;
  /** Static fallback shown before load / when scrubbing is unavailable */
  posterSrc: string;
  /** Positioning classes for the media layer (e.g. "absolute right-0") */
  className?: string;
  /** Styling for the media element itself (blend mode / opacity) */
  mediaClassName?: string;
}

/**
 * Scroll-scrubbed background animation.
 *
 * The owning section must be taller than the viewport and pin its content
 * on a `sticky` stage. As the user scrolls through the section, `progress`
 * advances the video's currentTime — the animation plays in sync with the
 * scroll.
 *
 * Decorative only: hidden from assistive tech and pointer events. Under
 * `prefers-reduced-motion` the video stays on its poster frame (no scrub).
 */
export default function ScrollAnim({
  progress,
  videoSrc,
  posterSrc,
  className,
  mediaClassName,
}: ScrollAnimProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);

  useMotionValueEvent(progress, "change", (p) => {
    const video = videoRef.current;
    // Reduced motion: the video stays on its poster (static), no scrubbing.
    if (!video || failed || reduce) return;
    // Read duration live: webm may report Infinity until fully buffered,
    // so retry on every scroll event until a finite value is known.
    const d = video.duration;
    if (!Number.isFinite(d) || d <= 0) return;
    const target = Math.min(p * d, Math.max(d - 0.001, 0));
    // Seek only when the target moved more than one frame, so fast
    // scrolling doesn't flood the decoder with pending seeks.
    if (Math.abs(video.currentTime - target) > 1 / 30) {
      video.currentTime = target;
    }
  });

  const mediaClasses = cn("h-full w-full object-cover", mediaClassName);

  return (
    <div aria-hidden className={cn("pointer-events-none overflow-hidden", className)}>
      {failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={posterSrc} alt="" aria-hidden className={mediaClasses} />
      ) : (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden
          onError={() => setFailed(true)}
          className={mediaClasses}
        />
      )}
    </div>
  );
}
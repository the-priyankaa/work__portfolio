"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Scroll-driven background animation.
 *
 * Plays the frame sequence in `public/anim/` on a <canvas>, mapping scroll
 * progress to frame index across the first `RANGE_VH` screens. Once the intro
 * range is passed the final frame is held and the canvas stops changing, so the
 * artwork is never a distraction behind the rest of the copy. The frames ship
 * as WebP (alpha preserved) rather than a video because the artwork is
 * transparent and is layered over the page gradient — see
 * scripts/build-animation.mjs for why video was ruled out.
 *
 * Purely decorative: hidden from assistive tech and never intercepts pointer
 * events. With reduced motion it draws a single static frame, decodes no
 * others, and never attaches a scroll listener.
 */

interface Manifest {
  frameCount: number;
  width: number;
  height: number;
  /** e.g. "/anim/%04d.webp" */
  pattern: string;
  firstIndex: number;
}

const MANIFEST_URL = "/anim/manifest.json";

/**
 * The canvas backing store is never larger than the CSS viewport. The art only
 * carries `manifest.width` px of real detail, so a 2x buffer would only upscale
 * those same pixels across 4x the fill cost — and every scroll frame repaints
 * the whole viewport. Text is DOM, so nothing else is affected.
 */
const MAX_DPR = 1;

/**
 * How far down the page the animation plays, in viewport heights. Past the intro
 * the final frame is held, so the artwork never sits behind body copy for the
 * rest of the page — the whole point of the effect is the first impression.
 */
const RANGE_VH = 1.5;

/** How many frames decode at once. Enough to keep a connection busy, few enough
 *  that decoded bitmaps never pile up faster than they are watched. */
const CONCURRENCY = 6;

/** The single frame held when motion is reduced. */
const staticIndex = (m: Manifest) => Math.floor(m.frameCount / 2);

function frameUrl(manifest: Manifest, i: number) {
  return manifest.pattern.replace("%04d", String(manifest.firstIndex + i).padStart(4, "0"));
}

export default function ScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let disposed = false;
    const frames: (HTMLImageElement | undefined)[] = [];
    let manifest: Manifest | null = null;
    let rafId = 0;
    /** The image currently on the canvas. Tracked by identity, not by index —
     *  see `drawAt`. */
    let painted: HTMLImageElement | null = null;

    /** Draw `img` scaled to cover the canvas, anchored centre. */
    const paint = (img: HTMLImageElement) => {
      const { width: cw, height: ch } = canvas;
      const scale = Math.max(cw / img.width, ch / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    /** Nearest already-decoded frame, so scrolling never shows an empty canvas. */
    const nearest = (index: number) => {
      for (let d = 0; d < frames.length; d++) {
        const a = frames[index - d];
        if (a) return a;
        const b = frames[index + d];
        if (b) return b;
      }
      return undefined;
    };

    const drawAt = (index: number) => {
      const img = frames[index] ?? nearest(index);
      // Compare the image, not the index. `nearest` may hand back a different
      // frame than the one asked for, and a frame that lands nearer the target
      // later still has to repaint — tracking the index instead pins the canvas
      // to whatever was on screen when the request was made.
      if (!img || img === painted) return;
      painted = img;
      paint(img);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      // Force a repaint at the new size — assigning canvas.width wipes the bitmap.
      painted = null;
      if (manifest) {
        drawAt(reduce ? staticIndex(manifest) : currentIndex());
      }
    };

    /** Distance over which the animation plays: the first `RANGE_VH` screens,
     *  or the whole document if that is shorter. */
    const introRange = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return Math.min(RANGE_VH * window.innerHeight, max);
    };

    /**
     * Intro progress (0..1) mapped onto the frame sequence. Clamped at 1, so
     * past the intro every scroll resolves to the last index and `drawAt`
     * early-returns — the final frame simply stays on the canvas.
     */
    const currentIndex = () => {
      if (!manifest) return 0;
      const range = introRange();
      const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
      return Math.round(progress * (manifest.frameCount - 1));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        if (manifest) drawAt(currentIndex());
      });
    };

    // One listener whether or not motion is reduced, so resizing still repaints.
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);

    if (!reduce) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    resize();

    let cancelled = false;

    (async () => {
      let loaded: Manifest;
      try {
        const res = await fetch(MANIFEST_URL, { cache: "force-cache" });
        if (!res.ok) throw new Error(String(res.status));
        loaded = (await res.json()) as Manifest;
      } catch {
        return; // No animation is a perfectly fine outcome.
      }
      if (disposed || cancelled) return;
      if (!loaded?.frameCount || !loaded.pattern) return;
      manifest = loaded;

      frames.length = loaded.frameCount;

      const lastIndex = loaded.frameCount - 1;

      /** True once the visitor is well past the intro: the animation is over and
       *  the last frame is held from here on. */
      const settled = () => window.scrollY > introRange() + window.innerHeight;

      /** Decode one frame into `frames[i]`. Never rejects. */
      const loadFrame = (i: number) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            frames[i] = img;
            // Repaint if this frame is nearer the target than whatever is up.
            // A redundant call is a no-op, since `drawAt` compares the image.
            drawAt(reduce ? staticIndex(loaded) : currentIndex());
            resolve();
          };
          img.onerror = () => {
            frames[i] = undefined; // Keep the index space intact.
            resolve();
          };
          img.src = frameUrl(loaded, i);
        });

      // Reduced motion: exactly one frame is ever painted, so decode only that.
      if (reduce) {
        await loadFrame(staticIndex(loaded));
        return;
      }

      // Arrived past the intro (a deep link, or a fast flick): the only frame
      // that will ever be painted is the last one, so skip straight to it.
      if (settled()) {
        await loadFrame(lastIndex);
        return;
      }

      // Frames are claimed nearest-to-target rather than in order, so whatever
      // the visitor is actually looking at arrives first. At the top of the page
      // that is frame 0 and the order comes out ascending anyway.
      const claimed = new Set<number>();
      const take = () => {
        const target = currentIndex();
        let best = -1;
        let bestD = Infinity;
        for (let i = 0; i < loaded.frameCount; i++) {
          if (frames[i] || claimed.has(i)) continue;
          const d = Math.abs(i - target);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        // Reserve before awaiting — otherwise two workers claim the same frame.
        if (best >= 0) claimed.add(best);
        return best;
      };

      const workers = Array.from({ length: CONCURRENCY }, async () => {
        while (!cancelled && !settled()) {
          const i = take();
          if (i < 0) return; // Nothing left to fetch.
          await loadFrame(i);
        }
      });
      await Promise.all(workers);

      // Scrolled past the intro mid-stream: the held frame has to be the real
      // last one, not whatever `nearest` could reach from what loaded so far.
      if (!cancelled && !frames[lastIndex]) await loadFrame(lastIndex);
    })();

    return () => {
      disposed = true;
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} className="scroll-anim" aria-hidden="true" />;
}

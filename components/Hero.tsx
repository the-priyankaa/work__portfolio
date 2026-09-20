"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import ScrollAnim from "@/components/ScrollAnim";
import { EASE } from "@/lib/motion";

/**
 * Hero — a tall scroll stage.
 *
 * The section is 320vh tall so there is scroll distance to drive the
 * scroll-scrubbed background animation (a 165-frame sequence encoded as a
 * small VP9 webm). Content is pinned on a sticky full-viewport stage while
 * the animation advances with the scroll. The cutout portrait floats at the
 * top-right on desktop.
 */
export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -110]);

  /** Masked line reveal used for the entrance animation */
  const maskReveal = (delay: number) => ({
    initial: { y: "112%" },
    animate: { y: "0%" },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section id="home" ref={ref} className="relative h-[320vh] bg-navy">
      {/* Sticky stage — pinned while the background animation scrubs */}
      <div className="sticky top-0 h-svh min-h-[100vh] overflow-hidden">
        {/* subtle ambient glows (depth, not decorative noise) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-teal/10 blur-[120px]" />
          <div className="absolute -right-32 bottom-10 h-[24rem] w-[24rem] rounded-full bg-terra/10 blur-[130px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-cream/5" />
        </div>

        {/* ghost name — behind the text, drifts down on scroll */}
        <motion.span
          aria-hidden
          style={{ y: ghostY }}
          className="pointer-events-none absolute left-[max(1.5rem,4.5vw)] top-[10%] z-[2] select-none whitespace-nowrap font-display text-[clamp(5rem,20vw,16rem)] font-black uppercase leading-none tracking-tight text-stroke opacity-[0.12]"
        >
          {portfolio.hero.name}
        </motion.span>

        {/* scroll-scrubbed background animation, kept to the right half
            so it never washes out the text column */}
        <ScrollAnim
          progress={scrollYProgress}
          videoSrc="/animation/scroll-anim.webm"
          posterSrc="/animation/scroll-poster.jpg"
          className="anim-mask absolute inset-y-0 right-0 z-[1] hidden w-[50%] md:block"
          mediaClassName="opacity-50 mix-blend-screen"
        />

        {/* portrait — top right (desktop only) */}
        <motion.div
          style={{ y: portraitY }}
          className="pointer-events-none absolute right-[4%] top-[13%] z-20 hidden w-[min(34vh,26vw)] lg:block"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.85 }}
          >
            <motion.div
              aria-hidden
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* soft halo so the dark cutout reads against the stage */}
              <div
                aria-hidden
                className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(207,203,229,0.16),transparent_65%)] blur-md"
              />
              {/* offset hairline frame */}
              <div
                aria-hidden
                className="absolute -left-4 -top-4 h-full w-full rounded-[2px] border border-cream/20"
              />
              {/* artwork */}
              <picture className="relative block overflow-hidden rounded-[2px]">
                <source srcSet={portfolio.hero.imageWebp} type="image/webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portfolio.hero.image}
                  alt={portfolio.hero.imageAlt}
                  width={1086}
                  height={1448}
                  fetchPriority="high"
                  className="relative z-10 block w-full"
                />
              </picture>
              {/* terra corner accent */}
              <div
                aria-hidden
                className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-terra"
              />
              {/* serif accent tucked behind the lower-left corner */}
              <span
                aria-hidden
                className="absolute -left-12 bottom-2 -rotate-12 font-accent text-7xl italic text-stroke-terra"
              >
                {portfolio.hero.accent}
              </span>
              {/* rings + floating dot */}
              <div
                aria-hidden
                className="absolute -right-8 -top-6 h-14 w-14 rounded-full border border-teal/50"
              />
              <motion.div
                aria-hidden
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-12 -bottom-3 h-4 w-4 rounded-full bg-terra"
              />
              <div
                aria-hidden
                className="absolute -left-24 top-12 h-10 w-10 rounded-full border border-teal/60"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* content */}
        <div className="container-x relative z-10 flex h-full flex-col justify-center pb-24 pt-28">
          {/* kicker */}
          <div className="mb-6 overflow-hidden">
            <motion.p
              {...maskReveal(0.1)}
              className="flex items-center gap-4 font-display text-[11px] uppercase tracking-[0.5em] text-terra-light"
            >
              <span className="h-px w-12 bg-terra/60" aria-hidden />
              {portfolio.hero.greeting}
            </motion.p>
          </div>

          {/* main name */}
          <div className="overflow-hidden">
            <h1 className="font-display text-[clamp(3.5rem,13vw,10.5rem)] font-black uppercase leading-[0.85] tracking-tight text-cream">
              <span className="sr-only">
                {portfolio.hero.greeting} {portfolio.hero.name}
              </span>
              <motion.span aria-hidden className="block" {...maskReveal(0.22)}>
                {portfolio.hero.name}
                <span className="text-terra">✦</span>
              </motion.span>
            </h1>
          </div>

          {/* role note */}
          <div className="mt-7 overflow-hidden">
            <motion.p
              {...maskReveal(0.34)}
              className="font-display text-xs uppercase tracking-[0.4em] text-muted md:text-sm"
            >
              {portfolio.hero.note}
            </motion.p>
          </div>

          {/* taglines */}
          <div className="mt-14 space-y-3 md:mt-20">
            {portfolio.hero.taglines.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: EASE,
                    delay: 0.5 + i * 0.13,
                  }}
                  className="group flex items-baseline gap-5 md:gap-7"
                >
                  <span className="font-display text-xs tracking-[0.3em] text-terra-light md:text-sm">
                    0{i + 1}
                  </span>
                  <span className="font-display text-[clamp(1.6rem,4.6vw,3.4rem)] font-extrabold uppercase leading-tight tracking-tight text-cream transition-colors duration-300 group-hover:text-terra">
                    {line}
                    {i === portfolio.hero.taglines.length - 1 && (
                      <span className="ml-4 inline-block font-accent text-[0.95em] normal-case italic text-terra transition-transform duration-300 group-hover:-rotate-6">
                        {portfolio.hero.accent}
                      </span>
                    )}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.0 }}
            className="mt-12 flex flex-wrap items-center gap-6 md:mt-16"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 border border-terra bg-terra px-8 py-4 font-display text-xs uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-terra-light"
            >
              {portfolio.hero.cta}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:-rotate-45"
              >
                ↗
              </span>
            </a>
            <a
              href="#projects"
              className="group font-display text-xs uppercase tracking-[0.25em] text-muted transition-colors hover:text-cream"
            >
              {portfolio.hero.secondaryCta}
              <span
                aria-hidden
                className="ml-2 inline-block h-px w-8 -translate-y-[3px] bg-muted transition-all duration-300 group-hover:w-12 group-hover:bg-terra"
              />
            </a>
          </motion.div>
        </div>

        {/* scroll cue — chip keeps it legible over the animation wash */}
        <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
          <div className="flex flex-col items-center gap-3 rounded-full border border-cream/10 bg-navy/70 px-6 py-3 backdrop-blur-sm">
            <span className="font-display text-[10px] uppercase tracking-[0.4em] text-muted">
              Scroll
            </span>
            <span className="block h-12 w-px overflow-hidden bg-cream/10">
              <span className="animate-scroll-line block h-full w-full bg-terra" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
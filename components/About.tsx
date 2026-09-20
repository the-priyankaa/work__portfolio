"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

/** Staggered word reveal for the intro statement */
function IntroStatement() {
  const intro = portfolio.about.introduction;
  const words = intro.split(" ");

  return (
    <motion.p
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="font-display text-2xl font-bold uppercase leading-snug tracking-tight text-cream md:text-4xl lg:text-[2.75rem]"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={fadeUpItem}
          className="mr-[0.28em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative bg-violet section-pad overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[26rem] w-[26rem] rounded-full bg-teal/10 blur-[140px]"
      />

      <div className="container-x relative">
        <SectionHeading
          kicker={portfolio.about.kicker}
          title={
            <>
              ABOUT <span className="text-stroke">ME</span>
            </>
          }
        />

        <div className="mx-auto mt-14 max-w-4xl text-center md:mt-20">
          <div id="about-heading" className="sr-only">
            About me
          </div>
          <IntroStatement />
        </div>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          {/* Left column — skills + stats */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="mb-6 font-display text-[11px] uppercase tracking-[0.4em] text-terra">
                What I do
              </p>
              <div className="flex flex-wrap gap-3">
                {portfolio.about.skills.map((skill, i) => (
                  <Reveal key={skill} delay={i * 0.06}>
                    <span className="inline-flex cursor-default items-center border border-cream/15 px-4 py-2 font-display text-[11px] uppercase tracking-[0.2em] text-cream/85 transition-colors duration-300 hover:border-terra hover:text-terra">
                      {skill}
                    </span>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-12">
              <div className="rule mb-8" aria-hidden />
              <div className="grid grid-cols-3 gap-6">
                {portfolio.about.stats.map((stat) => (
                  <div key={stat.label}>
                    <CountUp
                      to={stat.value}
                      suffix={stat.suffix}
                      className="font-display text-4xl font-black tracking-tight text-cream md:text-5xl"
                    />
                    <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right column — bio paragraphs */}
          <div className="space-y-6 lg:col-span-7 lg:pl-8">
            {portfolio.about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <p className="pt-4 font-accent text-2xl italic text-cream/80">
                — {portfolio.name}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { portfolio } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";

export default function Clients() {
  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="relative overflow-hidden bg-violet section-pad"
    >
      <div className="container-x relative">
        <SectionHeading
          kicker={portfolio.clients.kicker}
          title={
            <>
              WHO GETS <span className="text-stroke">SERVED</span>
            </>
          }
        />
        <Reveal className="mt-8 text-center">
          <p className="font-accent text-xl italic text-muted md:text-2xl">
            {portfolio.clients.lead}
          </p>
        </Reveal>
      </div>

      {/* marquee rows */}
      <div className="mt-16 space-y-10 md:mt-24">
        <Marquee items={portfolio.clients.list} duration={38} />
        <Marquee
          items={portfolio.clients.list}
          reverse
          duration={52}
          className="opacity-50"
        />
      </div>

      <Reveal className="container-x mt-20 text-center" delay={0.2}>
        <a
          href="#contact"
          className="group inline-flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-cream transition-colors hover:text-terra"
        >
          Become one of them
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </Reveal>
    </section>
  );
}
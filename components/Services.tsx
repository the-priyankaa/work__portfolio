"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import { EASE } from "@/lib/motion";

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-indigo section-pad"
    >
      <div className="container-x relative">
        <SectionHeading
          kicker={portfolio.services.kicker}
          title={
            <>
              I <span className="text-stroke">OFFER</span>
            </>
          }
        />

        <div className="mt-16 grid gap-x-16 gap-y-14 md:mt-24 lg:grid-cols-2">
          {portfolio.services.items.map((service, i) => (
            <motion.article
              key={service.number}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 2) * 0.12 }}
              className="group relative border-t border-cream/10 pt-8 transition-colors duration-500 hover:border-terra/60"
            >
              {/* big ghost number */}
              <span
                aria-hidden
                className="text-stroke pointer-events-none absolute -top-7 right-2 font-display text-8xl font-black uppercase leading-none opacity-40 transition-all duration-500 group-hover:text-terra group-hover:opacity-100 md:text-9xl"
                style={{ WebkitTextStrokeColor: "inherit" }}
              >
                {service.number}
              </span>

              <h3 className="relative font-display text-2xl font-extrabold uppercase tracking-tight text-cream transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                {service.title}
              </h3>
              <p className="relative mt-4 max-w-md text-base leading-relaxed text-muted md:text-lg">
                {service.description}
              </p>

              <span
                aria-hidden
                className="relative mt-7 inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.3em] text-terra-light opacity-0 transition-all duration-500 group-hover:opacity-100"
              >
                Explore
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
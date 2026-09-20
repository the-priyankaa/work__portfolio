"use client";

import { motion, useReducedMotion } from "motion/react";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2 className="h2 h2--center">What Clients Say</h2>
        <ul className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <motion.li
              key={t.name}
              className="quote"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              whileHover={reduce ? undefined : { y: -6 }}
            >
              <blockquote className="quote__text">&ldquo;{t.quote}&rdquo;</blockquote>
              <footer className="quote__meta">
                <strong className="quote__name">{t.name}</strong>
                <span className="quote__role">{t.role}</span>
              </footer>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
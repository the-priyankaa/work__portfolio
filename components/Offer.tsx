"use client";

import { motion, useReducedMotion } from "motion/react";
import { SERVICES } from "@/lib/data";

export default function Offer() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="offer">
      <div className="container">
        <h2 className="h2 h2--center">I Offer</h2>
        <ul className="offer__grid">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.n}
              className="pill"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              whileHover={reduce ? undefined : { y: -6 }}
            >
              <span className="pill__n" aria-hidden="true">
                {s.n}
              </span>
              <div className="pill__box" style={{ backgroundImage: `url(${s.image})` }}>
                <span className="pill__label">
                  {s.lead} <strong>{s.bold}</strong>
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
"use client";

import { motion, useReducedMotion } from "motion/react";
import { PROCESS } from "@/lib/data";

export default function Process() {
  const reduce = useReducedMotion();

  return (
    <section id="process" className="process">
      <div className="container">
        <h2 className="h2 h2--center">How I Work</h2>
        <ol className="process__grid">
          {PROCESS.map((step, i) => (
            <motion.li
              key={step.n}
              className="step"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              whileHover={reduce ? undefined : { y: -4 }}
            >
              <div className="step__box">
                <span className="step__n" aria-hidden="true">
                  {step.n}
                </span>
                <h3 className="step__title">{step.title}</h3>
              </div>
              <p className="step__text">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
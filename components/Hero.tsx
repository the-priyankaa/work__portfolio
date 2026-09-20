"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { TAGLINE } from "@/lib/data";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <motion.h1
          className="hero__title"
          initial={reduce ? false : { opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          Hi! I&rsquo;m Suman
        </motion.h1>

        <motion.div
          className="hero__char"
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1, y: [0, -12, 0] }}
          transition={
            reduce
              ? undefined
              : { opacity: { duration: 0.6, ease: "easeOut" }, scale: { duration: 0.6 }, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } }
          }
        >
          <Image
            src="/images/hero-suman.png"
            alt="3D illustration of Suman waving, wearing a red hoodie"
            width={322}
            height={673}
            priority
          />
        </motion.div>

        <motion.p
          className="hero__tagline"
          variants={container}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
        >
          {TAGLINE.map((t) => (
            <motion.span key={t.bold} variants={reduce ? undefined : item}>
              <strong>{t.bold}</strong> {t.light}
            </motion.span>
          ))}
        </motion.p>

        <motion.a
          className="btn"
          href="#contact"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: "easeOut" }}
        >
          Contact Me
        </motion.a>
      </div>
    </section>
  );
}
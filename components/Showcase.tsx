"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SHOWCASE, type Media } from "@/lib/data";

function Slot({ media, className }: { media?: Media; className: string }) {
  return (
    <div className={`slot ${className}`}>
      {media &&
        (media.type === "video" ? (
          <video src={media.src} muted loop playsInline controls aria-label={media.alt} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media.src} alt={media.alt} loading="lazy" />
        ))}
    </div>
  );
}

export default function Showcase() {
  // Front card is shown last (bottom) exactly like the design: 03, 02, then 01.
  const [active, setActive] = useState("01");
  const [touched, setTouched] = useState(false);
  const reduce = useReducedMotion();

  const behind = SHOWCASE.filter((c) => c.n !== active).sort((a, b) => (a.n < b.n ? 1 : -1));
  const front = SHOWCASE.find((c) => c.n === active)!;
  const ordered = [...behind, front];

  return (
    <section id="projects" className="showcase">
      <div className="container">
        <h2 className="h2 h2--center">My Showcase</h2>
        <div className="stack">
          {ordered.map((c, i) => {
            const isFront = c.n === active;
            return (
              <motion.article
                key={c.n}
                className={`card ${isFront ? "card--front" : ""} ${isFront && touched ? "card--lift" : ""}`}
                style={{ "--i": i } as React.CSSProperties}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              >
                <button
                  className="card__tab"
                  onClick={() => {
                    setTouched(true);
                    setActive(c.n);
                  }}
                  aria-pressed={isFront}
                  aria-label={`Show ${c.title}`}
                  tabIndex={isFront ? -1 : 0}
                />
                <div className="card__head">
                  <span className="card__n">{c.n}</span>
                  <h3 className="card__title">{c.title}</h3>
                </div>
                <div className="card__body">
                  <div className="card__side">
                    <Slot media={c.side[0]} className="slot--wide" />
                    <Slot media={c.side[1]} className="slot--wide" />
                  </div>
                  <Slot media={c.main} className="slot--tall" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
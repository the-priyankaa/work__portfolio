"use client";

import Image from "next/image";
import { useRef } from "react";
import { CLIENTS } from "@/lib/data";

export default function Clients() {
  const track = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const step = el.firstElementChild?.getBoundingClientRect().width ?? el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="clients" className="clients">
      <div className="container">
        <h2 className="h2 h2--center">Who Get Served</h2>
        <div className="carousel">
          <button className="carousel__btn" onClick={() => scroll(-1)} aria-label="Previous clients">
            <svg viewBox="0 0 20 36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 3L4 18l12 15" /></svg>
          </button>
          <ul className="carousel__track" ref={track}>
            {CLIENTS.map((c) => (
              <li key={c.name} className="carousel__item">
                <Image src={c.logo} alt={c.name} width={c.w} height={c.h} />
              </li>
            ))}
          </ul>
          <button className="carousel__btn" onClick={() => scroll(1)} aria-label="Next clients">
            <svg viewBox="0 0 20 36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 3l12 15L4 33" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

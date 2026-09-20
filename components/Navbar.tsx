"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));

    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      // Near the top → Home is active by default.
      if (window.scrollY < 60) {
        setActive("home");
        return;
      }

      // The last section whose top has passed the probe line (just under the
      // sticky bar) is the one currently being read.
      const probe = window.scrollY + 150;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      setActive(current);
    };

    const onResize = () => {
      // Collapse the mobile menu when the viewport grows to desktop width.
      if (window.matchMedia("(min-width: 721px)").matches) setOpen(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav__inner">
        <a className="nav__brand" href="#home" onClick={() => setOpen(false)}>
          Suman
        </a>

        <button
          className={`nav__burger ${open ? "is-open" : ""}`}
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="nav-links"
          className={`nav__links ${open ? "is-open" : ""}`}
          aria-label="Primary"
        >
          {NAV_LINKS.map((l) => {
            const id = l.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={isActive ? "is-active" : undefined}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
"use client";

import type { FormEvent } from "react";
import { portfolio } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    handle: "instagram",
    href: portfolio.social.instagram,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.4" cy="6.6" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "linkedin",
    href: portfolio.social.linkedin,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    handle: "github",
    href: portfolio.social.github,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    handle: "facebook",
    href: portfolio.social.facebook,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

const inputClasses =
  "w-full border-b border-cream/20 bg-transparent py-3 font-sans text-base text-cream placeholder:text-muted/60 transition-colors duration-300 focus:border-terra focus:outline-none";

export default function Contact() {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    const mailto = `mailto:${portfolio.contact.email}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-mid section-pad"
    >
      {/* giant watermark */}
      <span
        aria-hidden
        className="text-stroke pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none whitespace-nowrap font-display text-[clamp(4rem,16vw,13rem)] font-black uppercase leading-none opacity-[0.07]"
      >
        HELLO
      </span>

      <div className="container-x relative">
        <SectionHeading
          kicker={portfolio.contact.kicker}
          title={
            <>
              CONTACT <span className="text-stroke">ME</span>
            </>
          }
        />

        <Reveal className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-muted md:text-lg">
            {portfolio.contact.sub}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 md:mt-20 lg:grid-cols-3 lg:gap-10">
          {/* Social */}
          <Reveal>
            <h3 className="mb-6 font-display text-xs uppercase tracking-[0.35em] text-terra-light">
              Social Media
            </h3>
            <ul className="space-y-1">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-2 font-display text-lg uppercase tracking-tight text-cream/85 transition-colors duration-300 hover:text-terra"
                  >
                    {link.icon}
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                      {link.label}
                    </span>
                    <span
                      aria-hidden
                      className="ml-auto text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Call & mail */}
          <Reveal delay={0.12}>
            <h3 className="mb-6 font-display text-xs uppercase tracking-[0.35em] text-terra-light">
              Direct
            </h3>
            <div className="space-y-8">
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.25em] text-muted">
                  Call me
                </p>
                <a
                  href={`tel:${portfolio.contact.phone.replace(/\s/g, "")}`}
                  className="mt-2 inline-block font-display text-xl font-bold tracking-tight text-cream transition-colors hover:text-terra md:text-2xl"
                >
                  {portfolio.contact.phone}
                </a>
              </div>
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.25em] text-muted">
                  Mail me
                </p>
                <a
                  href={`mailto:${portfolio.contact.email}`}
                  className="mt-2 inline-block break-all font-display text-xl font-bold tracking-tight text-cream transition-colors hover:text-terra md:text-2xl"
                >
                  {portfolio.contact.email}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.24}>
            <h3 className="mb-6 font-display text-xs uppercase tracking-[0.35em] text-terra-light">
              Or send a note
            </h3>
            <form onSubmit={submit} className="space-y-7">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block font-display text-[11px] uppercase tracking-[0.25em] text-muted"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={inputClasses}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block font-display text-[11px] uppercase tracking-[0.25em] text-muted"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClasses}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block font-display text-[11px] uppercase tracking-[0.25em] text-muted"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about your project…"
                  className={inputClasses}
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-3 border border-terra bg-terra px-8 py-4 font-display text-xs uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-terra-light"
              >
                Send Message
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:-rotate-45"
                >
                  ↗
                </span>
              </button>
              <p className="text-xs leading-relaxed text-muted">
                This opens your email app with the message pre-filled — or write
                to me directly at{" "}
                <a
                  href={`mailto:${portfolio.contact.email}`}
                  className="text-cream underline decoration-terra/50 underline-offset-4 hover:text-terra"
                >
                  {portfolio.contact.email}
                </a>
                .
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
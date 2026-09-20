"use client";

import type { FormEvent } from "react";
import { CONTACT } from "@/lib/data";

const icons: Record<string, React.ReactNode> = {
  Facebook: (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#3b5998" />
      <path d="M21.6 32V21.3h3.5l.6-4.1h-4.1v-2.6c0-1.2.4-2 2.1-2h2.1V8.9c-.4 0-1.6-.2-3.1-.2-3.1 0-5.2 1.9-5.2 5.3v3.2h-3.5v4.1h3.5V32h4.1z" fill="#fff" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="ig2" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#feda75" />
          <stop offset=".35" stopColor="#fa7e1e" />
          <stop offset=".6" stopColor="#d62976" />
          <stop offset="1" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#ig2)" />
      <rect x="10.5" y="10.5" width="19" height="19" rx="5.5" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="20" cy="20" r="4.6" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="26" cy="14" r="1.3" fill="#fff" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#0a66c2" />
      <path d="M11.5 16.5h3.7V28h-3.7V16.5zm1.9-5.8a2.1 2.1 0 110 4.3 2.1 2.1 0 010-4.3zM17.6 16.5h3.5v1.6c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.7V28h-3.7v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V28h-3.7V16.5z" fill="#fff" />
    </svg>
  ),
};

export default function ContactSection() {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="contact">
      <div className="container contact__grid">
        <div className="contact__copy">
          <h2 className="h2">Contact Me</h2>
          <p className="contact__lead">
            Have a project in mind? Let&rsquo;s make something people remember.
          </p>

          <div className="contact__links">
            <a className="contact__link" href={CONTACT.phoneHref}>
              <span className="contact__label">Call Me</span>
              {CONTACT.phone}
            </a>
            <a className="contact__link" href={`mailto:${CONTACT.email}`}>
              <span className="contact__label">Mail Me</span>
              {CONTACT.email}
            </a>
          </div>

          <div className="contact__social">
            {CONTACT.socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                {icons[s.name]}
              </a>
            ))}
          </div>
        </div>

        <form className="contact__form" onSubmit={submit}>
          <label className="field">
            <span className="field__label">Name</span>
            <input className="field__input" type="text" name="name" required autoComplete="name" />
          </label>
          <label className="field">
            <span className="field__label">Email</span>
            <input className="field__input" type="email" name="email" required autoComplete="email" />
          </label>
          <label className="field">
            <span className="field__label">Message</span>
            <textarea className="field__input field__input--area" name="message" rows={4} required />
          </label>
          <button className="btn contact__submit" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
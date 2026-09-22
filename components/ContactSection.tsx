"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/lib/data";
import Reveal from "@/components/Reveal";

// Get your free access key at https://web3forms.com (enter
// chitrokoralok@gmail.com) and set it in .env.local:
//   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-access-key-here
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    // Without a configured key, fall back to opening the visitor's mail app
    // (already addressed to chitrokoralok@gmail.com).
    if (!ACCESS_KEY) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name,
          email,
          message,
          subject: `Portfolio enquiry from ${name}`,
          from_name: "Suman Portfolio",
          botcheck: "",
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container contact__grid">
        <Reveal className="contact__copy">
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
        </Reveal>

        <Reveal delay={0.15} className="contact__form">
          <form className="contact__form" onSubmit={submit} aria-busy={status === "sending"}>
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
            <button className="btn contact__submit" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            {status === "success" && (
              <p className="form-note form-note--ok" role="status">
                Message sent! I&rsquo;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="form-note form-note--err" role="alert">
                Something went wrong. Please email me directly at {CONTACT.email}.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
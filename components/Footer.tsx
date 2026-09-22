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
        <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#feda75" />
          <stop offset=".35" stopColor="#fa7e1e" />
          <stop offset=".6" stopColor="#d62976" />
          <stop offset="1" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#ig)" />
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
  YouTube: (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#ff0000" />
      <path d="M31.5 15.8a2.7 2.7 0 00-1.9-1.9C27.7 13.3 20 13.3 20 13.3s-7.7 0-9.6.6a2.7 2.7 0 00-1.9 1.9C8 17.7 8 20 8 20s0 2.3.5 4.2a2.7 2.7 0 001.9 1.9c1.9.6 9.6.6 9.6.6s7.7 0 9.6-.6a2.7 2.7 0 001.9-1.9c.5-1.9.5-4.2.5-4.2s0-2.3-.5-4.2z" fill="#fff" />
      <path d="M17.7 22.9l6.2-2.9-6.2-2.9v5.8z" fill="#ff0000" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <h3>Social Media</h3>
          <div className="footer__social">
            {CONTACT.socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                {icons[s.name]}
              </a>
            ))}
          </div>
        </div>
        <div className="footer__col footer__col--center">
          <h3>Contact Me</h3>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
        </div>
        <div className="footer__col footer__col--end">
          <h3>Mail Me</h3>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
      </div>
    </footer>
  );
}

import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2 className="h2 h2--center">What Clients Say</h2>
        <ul className="testimonials__grid">
          {TESTIMONIALS.map((t) => (
            <li key={t.name} className="quote">
              <blockquote className="quote__text">&ldquo;{t.quote}&rdquo;</blockquote>
              <footer className="quote__meta">
                <strong className="quote__name">{t.name}</strong>
                <span className="quote__role">{t.role}</span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
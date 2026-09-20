import { SERVICES } from "@/lib/data";

export default function Offer() {
  return (
    <section id="services" className="offer">
      <div className="container">
        <h2 className="h2 h2--center">I Offer</h2>
        <ul className="offer__grid">
          {SERVICES.map((s) => (
            <li key={s.n} className="pill">
              <span className="pill__n" aria-hidden="true">
                {s.n}
              </span>
              <div className="pill__box" style={{ backgroundImage: `url(${s.image})` }}>
                <span className="pill__label">
                  {s.lead} <strong>{s.bold}</strong>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

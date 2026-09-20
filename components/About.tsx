import Image from "next/image";
import { ABOUT, SKILLS, STATS } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about__grid">
        <div className="about__photo">
          <Image
            src="/images/about-suman.png"
            alt="3D illustration of Suman with arms crossed, wearing a blue hoodie"
            width={609}
            height={1022}
          />
        </div>
        <div className="about__copy">
          <h2 className="h2">About Me</h2>
          {ABOUT.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}

          <ul className="about__skills">
            {SKILLS.map((s) => (
              <li key={s} aria-label={s}>
                {s}
              </li>
            ))}
          </ul>

          <dl className="about__stats">
            {STATS.map((st) => (
              <div key={st.label} className="stat">
                <dt className="stat__value">{st.value}</dt>
                <dd className="stat__label">{st.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
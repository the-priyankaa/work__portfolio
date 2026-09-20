import Image from "next/image";
import { ABOUT, SKILLS, STATS } from "@/lib/data";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about__grid">
        <Reveal className="about__photo">
          <Image
            src="/images/about-suman.png"
            alt="3D illustration of Suman with arms crossed, wearing a blue hoodie"
            width={609}
            height={1022}
          />
        </Reveal>
        <div className="about__copy">
          <Reveal>
            <h2 className="h2">About Me</h2>
          </Reveal>
          {ABOUT.map((p, i) => (
            <Reveal key={p.slice(0, 20)} delay={0.08 * (i + 1)}>
              <p>{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.22}>
            <ul className="about__skills">
              {SKILLS.map((s) => (
                <li key={s} aria-label={s}>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <dl className="about__stats">
              {STATS.map((st) => (
                <div key={st.label} className="stat">
                  <dt className="stat__value">
                    <CountUp value={st.value} suffix={st.suffix} />
                  </dt>
                  <dd className="stat__label">{st.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
import { TAGLINE } from "@/lib/data";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <h1 className="hero__title">Hi! I&rsquo;m Suman</h1>

        <Image
          className="hero__char"
          src="/images/hero-suman.png"
          alt="3D illustration of Suman waving, wearing a red hoodie"
          width={322}
          height={673}
          priority
        />

        <p className="hero__tagline">
          {TAGLINE.map((t) => (
            <span key={t.bold}>
              <strong>{t.bold}</strong> {t.light}
            </span>
          ))}
        </p>

        <a className="btn" href="#contact">
          Contact Me
        </a>
      </div>
    </section>
  );
}

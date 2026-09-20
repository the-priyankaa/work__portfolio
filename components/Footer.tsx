import { portfolio } from "@/data/portfolio";
import Marquee from "@/components/ui/Marquee";

const KEYWORDS = [
  "Design",
  "Animation",
  "Video Editing",
  "Storytelling",
  "Branding",
  "Motion",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 bg-ink">
      <Marquee
        items={KEYWORDS}
        separator="✦"
        duration={30}
        className="border-b border-cream/10 py-8"
      />

      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 text-center md:flex-row md:text-left">
        <p className="font-display text-[11px] uppercase tracking-[0.25em] text-muted">
          © {year} {portfolio.name}. All rights reserved.
        </p>
        <p className="font-display text-[11px] uppercase tracking-[0.25em] text-muted">
          Designed &amp; built with care — dark mode only.
        </p>
        <a
          href="#home"
          className="group inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.25em] text-cream transition-colors hover:text-terra"
        >
          Back to top
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:-translate-y-1"
          >
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}
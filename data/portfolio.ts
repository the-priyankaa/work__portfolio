/* ────────────────────────────────────────────────────────────────
   PORTFOLIO CONFIGURATION
   ────────────────────────────────────────────────────────────────
   Edit THIS file to personalise the whole site:
   your name, bio, services, projects, clients, social & contact info.
   No component edits are needed — everything is driven from here.
   ──────────────────────────────────────────────────────────────── */

export type ProjectCategory = "Graphic Designing" | "Animation" | "Video Editing";

export interface Project {
  /** Project display title */
  title: string;
  /** One of: "Graphic Designing" | "Animation" | "Video Editing" */
  category: ProjectCategory;
  /** Path to a file inside /public (or any absolute URL) */
  image: string;
  /** Short description shown on the card */
  description: string;
  /** Year of the project */
  year: string;
}

export interface Service {
  /** Card number, e.g. "01" */
  number: string;
  title: string;
  description: string;
}

const asset = (slug: string) => `/projects/${slug}.svg`;

export const portfolio = {
  /* ── Identity ─────────────────────────────────────────────── */
  name: "Suman",
  role: "Graphic Designer, Animator & Video Editor",
  tagline: "Designing visuals, animating imagination, telling stories.",

  /* ── Hero ────────────────────────────────────────────────── */
  hero: {
    greeting: "HI! I’M",
    name: "SUMAN",
    taglines: ["Designing Visuals", "Animating Imagination", "Telling Stories"],
    accent: "&", // decorative italic serif glyph after the taglines
    note: "Graphic Designer · Animator · Video Editor",
    cta: "Contact Me",
    secondaryCta: "View Work",
    /* Hero artwork — cutout portrait floated at the top-right (desktop) */
    image: "/hero.png", // transparent PNG (fallback)
    imageWebp: "/hero.webp", // compressed WebP (preferred)
    imageAlt: "Portrait of Suman",
  },

  /* ── About ───────────────────────────────────────────────── */
  about: {
    heading: "ABOUT ME",
    kicker: "WHO I AM",
    introduction:
      "I’m a Graphic Designer, Animator & Video Editor who loves turning simple ideas into visuals that actually make people stop and look.",
    paragraphs: [
      "I enjoy playing with design, motion, colours, and storytelling to create work that feels fresh, purposeful, and memorable.",
      "For me, good design isn’t just about making things look great — it’s about making them feel right and communicate clearly.",
      "Whether it’s a brand identity, social media creative, animation, or video, I bring a mix of creativity, curiosity, and attention to detail to every project.",
    ],
    skills: [
      "Brand identity",
      "Social media creatives",
      "Animation",
      "Video editing",
      "Visual storytelling",
    ],
    stats: [
      { value: 40, suffix: "+", label: "Projects delivered" },
      { value: 5, suffix: "+", label: "Years of practice" },
      { value: 12, suffix: "+", label: "Industries served" },
    ],
  },

  /* ── Services ─────────────────────────────────────────────── */
  services: {
    kicker: "SERVICES",
    heading: "I OFFER",
    items: [
      {
        number: "01",
        title: "Design Your Brand",
        description:
          "Logos, identities and visual systems that give your brand presence, personality and room to grow.",
      },
      {
        number: "02",
        title: "Animate Your Idea",
        description:
          "Motion design that turns abstract concepts into stories people actually remember.",
      },
      {
        number: "03",
        title: "Showcase Your Product",
        description:
          "Product visuals and launch creatives that make audiences stop, look and buy.",
      },
      {
        number: "04",
        title: "Retouch Your Daily Life",
        description:
          "Polished imagery, clean edits and everyday visual housekeeping that keeps your feed feeling fresh.",
      },
    ] satisfies Service[],
  },

  /* ── Projects / Showcase ──────────────────────────────────── */
  showcase: {
    kicker: "WORK",
    heading: "MY SHOWCASE",
    categories: ["Graphic Designing", "Animation", "Video Editing"] as ProjectCategory[],
  },

  projects: [
    {
      title: "Ray of Hope",
      category: "Graphic Designing",
      image: asset("ray-of-hope"),
      description:
        "Brand identity for a community movement — symbol, type system and campaign visuals.",
      year: "2026",
    },
    {
      title: "Nourish Kids",
      category: "Graphic Designing",
      image: asset("nourish-kids"),
      description:
        "Packaging and identity system for a kids’ nutrition brand trusted by moms.",
      year: "2025",
    },
    {
      title: "Nordica Clinic",
      category: "Graphic Designing",
      image: asset("nordica-clinic"),
      description:
        "Full rebrand for a physiotherapy & rehabilitation clinic — calm, precise, human.",
      year: "2025",
    },
    {
      title: "Loop Motions",
      category: "Animation",
      image: asset("loop-motions"),
      description:
        "A looping motion study series — playful cycles built for social feeds.",
      year: "2026",
    },
    {
      title: "Product in Motion",
      category: "Animation",
      image: asset("product-in-motion"),
      description:
        "Launch animation for a new product — concept to final rendered story.",
      year: "2025",
    },
    {
      title: "Story Cut",
      category: "Video Editing",
      image: asset("story-cut"),
      description:
        "Short-form video editing for creators — rhythm, pacing and punchlines.",
      year: "2026",
    },
    {
      title: "Launch Reel",
      category: "Video Editing",
      image: asset("launch-reel"),
      description:
        "Brand campaign film & reel editing — cut from 40 hours of footage to 60 seconds.",
      year: "2025",
    },
  ] satisfies Project[],

  /* ── Clients ──────────────────────────────────────────────── */
  clients: {
    kicker: "CLIENTS",
    heading: "WHO GETS SERVED",
    lead: "Brands and teams I love working with.",
    list: [
      "Startups",
      "Brands",
      "Creators",
      "Small Businesses",
      "Agencies",
      "E-commerce",
      "Social Media Creators",
    ],
  },

  /* ── Contact ──────────────────────────────────────────────── */
  contact: {
    kicker: "LET’S TALK",
    heading: "CONTACT ME",
    sub: "Have a project in mind? Let’s make something people remember.",
    /* TODO: replace with your own contact details */
    email: "hello@yourname.com",
    phone: "+91 00000 00000",
  },

  /* ── Social ───────────────────────────────────────────────── */
  social: {
    /* TODO: replace with your profile URLs */
    instagram: "https://instagram.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    github: "https://github.com/yourhandle",
    facebook: "https://facebook.com/yourhandle",
  },
};

export type Portfolio = typeof portfolio;
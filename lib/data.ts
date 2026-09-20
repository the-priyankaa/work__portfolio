// All editable content lives here.

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

export const TAGLINE = [
  { bold: "Designing", light: "Visuals" },
  { bold: "Animating", light: "Imagination" },
  { bold: "Telling", light: "Stories" },
];

export const ABOUT = [
  "I'm a Graphic Designer, Animator & Video Editor who loves turning simple ideas into visuals that actually make people stop and look. I enjoy playing with design, motion, colours, and storytelling to create work that feels fresh, purposeful, and memorable.",
  "For me, good design isn't just about making things look great—it's about making them feel right and communicate clearly. Whether it's a brand identity, social media creative, animation, or video, I bring a mix of creativity, curiosity, and attention to detail to every project.",
];

export const SKILLS = [
  "Brand Identity",
  "Social Media Creatives",
  "Animation",
  "Video Editing",
  "Visual Storytelling",
];

export const STATS = [
  { value: 40, suffix: "+", label: "Projects delivered" },
  { value: 5, suffix: "+", label: "Years of practice" },
  { value: 12, suffix: "+", label: "Industries served" },
];

// Background images for the pills: replace the SVGs in /public/images/offer
// with your own JPG/PNG/WebP and update the paths here.
export const SERVICES = [
  { n: "01", lead: "Design Your", bold: "Brand", image: "/images/offer/brand.svg" },
  { n: "02", lead: "Animate Your", bold: "Idea", image: "/images/offer/idea.svg" },
  { n: "03", lead: "Showcase Your", bold: "Product", image: "/images/offer/product.svg" },
  { n: "04", lead: "Retouch Your", bold: "Daily Life", image: "/images/offer/daily.svg" },
];

export type Media = { src: string; alt: string; type?: "image" | "video" };

// `main` is the tall slot on the right, `side` are the two wide slots on the left.
// Leave arrays empty to keep the black placeholders from the design.
export const SHOWCASE: {
  n: string;
  title: string;
  main?: Media;
  side: Media[];
}[] = [
  { n: "01", title: "Graphic Designing", side: [] },
  { n: "02", title: "Animation", side: [] },
  { n: "03", title: "Video Editing", side: [] },
];

export const CLIENTS = [
  { name: "Ray of Hope", logo: "/images/logos/ray-of-hope.png", w: 441, h: 354 },
  { name: "Arviora International", logo: "/images/logos/arviora.png", w: 417, h: 332 },
  { name: "Prime Physiotherapy & Rehabilitation Clinic", logo: "/images/logos/prime-clinic.png", w: 316, h: 337 },
];

export const PROCESS = [
  {
    n: "01",
    title: "Discover",
    text: "We talk through your goals, audience and inspiration so the brief is sharp before anything is designed.",
  },
  {
    n: "02",
    title: "Design",
    text: "Concepts, colours, typography and layout come together — iterated with you until it feels right.",
  },
  {
    n: "03",
    title: "Animate",
    text: "Motion, transitions and timing bring the ideas to life for social feeds, launches or broadcasts.",
  },
  {
    n: "04",
    title: "Deliver",
    text: "Final files in every format you need, plus small refinements until you're completely happy.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Suman turned our rough idea into a brand identity people instantly recognise. Communication was smooth and the results blew us away.",
    name: "Client One",
    role: "Founder, Startup",
  },
  {
    quote:
      "The product animation paid for itself in the first week — viewers finally understood what we built. Sharp, fast and creative.",
    name: "Client Two",
    role: "Marketing Lead",
  },
  {
    quote:
      "Every edit was tasteful and on brief. Suman has an eye for pacing and detail that made our content feel premium.",
    name: "Client Three",
    role: "Content Creator",
  },
];

export const CONTACT = {
  phone: "+91 70592 70026",
  phoneHref: "tel:+917059270026",
  email: "chitrokoralok@gmail.com",
  socials: [
    { name: "Facebook", href: "https://facebook.com/" },
    { name: "Instagram", href: "https://instagram.com/" },
    { name: "LinkedIn", href: "https://linkedin.com/" },
  ],
};

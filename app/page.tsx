import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Offer from "@/components/Offer";
import Showcase from "@/components/Showcase";
import Marquee from "@/components/Marquee";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Clients from "@/components/Clients";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const MARQUEE_ITEMS = ["Design", "Animate", "Edit", "Tell Stories"];

export default function Page() {
  return (
    <>
      <Background />
      <main>
        <Navbar />
        <Hero />
        <About />
        <Offer />
        <Showcase />
        <Marquee items={MARQUEE_ITEMS} />
        <Process />
        <Testimonials />
        <Marquee items={MARQUEE_ITEMS} />
        <Clients />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
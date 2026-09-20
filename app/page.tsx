import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Offer from "@/components/Offer";
import Showcase from "@/components/Showcase";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Clients from "@/components/Clients";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Offer />
      <Showcase />
      <Process />
      <Testimonials />
      <Clients />
      <ContactSection />
      <Footer />
    </main>
  );
}
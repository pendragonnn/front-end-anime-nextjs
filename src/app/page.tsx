import AboutSection from "@/sections/landing/AboutSection";
import ContactSection from "@/sections/landing/ContactSection";
import FaqSection from "@/sections/landing/FaqSection";
import LandingSection from "@/sections/landing/LandingSection";

export default function HomePage() {
  return (
    <>
      <LandingSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}


import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <AboutSection />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Index;

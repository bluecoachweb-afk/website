import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroPool from "@/assets/hero-pool.jpg";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroPool})` }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero-overlay)" }}
      />

      {/* Wave SVG at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60L48 55C96 50 192 40 288 42C384 44 480 58 576 65C672 72 768 72 864 65C960 58 1056 44 1152 40C1248 36 1344 42 1392 45L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
            fill="hsl(210 20% 98%)"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo */}
          <motion.div
            className="mb-8 inline-flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-5xl font-heading font-bold tracking-tight">
              <span className="text-primary-foreground">Blue</span>
              <span className="text-secondary">Coach</span>
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground leading-tight mb-6">
            Tutkuyla Kulaç At,{" "}
            <span className="text-gradient-cta">Sağlıkla Dönüş.</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Eski milli sporcuların tecrübesiyle, her seviyeye uygun profesyonel yüzme eğitimi. Bluecoach ile suyun iyileştirici gücünü keşfedin.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button variant="hero" size="lg" onClick={scrollToForm} className="px-10 py-6 text-lg">
              Hemen Başla
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

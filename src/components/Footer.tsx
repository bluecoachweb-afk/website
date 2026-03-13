import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-2xl font-heading font-semibold text-primary-foreground mb-2">
          Blue<span className="text-secondary">Coach</span>
        </p>
        <p className="text-primary-foreground/70 text-lg mb-8">
          Spor ve sağlık dolu günler 🙏
        </p>

        <div className="flex items-center justify-center gap-4 mb-8">
          <a
            href="https://www.instagram.com/_bluecoach?igsh=YnU1d3VxMHlsaHpr&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        <p className="text-primary-foreground/50 text-sm">
          © {new Date().getFullYear()} BlueCoach. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

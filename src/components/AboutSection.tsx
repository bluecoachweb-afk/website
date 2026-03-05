import { motion } from "framer-motion";
import { Heart, Dumbbell, Brain } from "lucide-react";

const benefits = [
  {
    icon: Dumbbell,
    title: "Tüm Vücut Egzersizi",
    description: "Yüzme, vücudunuzdaki tüm kas gruplarını eş zamanlı çalıştıran nadir sporlardan biridir.",
  },
  {
    icon: Heart,
    title: "Kardiyovasküler Sağlık",
    description: "Düzenli yüzme, kalp ve damar sağlığını güçlendirir, dayanıklılığı artırır.",
  },
  {
    icon: Brain,
    title: "Zihinsel Disiplin",
    description: "Su ile kurulan bağ, stresi azaltır ve zihinsel dayanıklılığı geliştirir.",
  },
];

const AboutSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Hikayemiz
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Bluecoach, yüzmeyi temel ve ileri seviyede öğretmeyi, sporcu yetiştirmeyi ve sporu yaşamın bir parçası haline getirmeyi amaçlar. Geçmişte bu branşta sporcu olmamız ve yüzmenin insan yaşamına sağladığı faydalara birebir tanıklık etmemiz nedeniyle bu yola çıktık.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="bg-card rounded-2xl p-8 shadow-card text-center group hover:shadow-cta transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "İsim gereklidir").max(100),
  phone: z.string().trim().min(7, "Geçerli bir telefon numarası girin").max(20),
  reason: z.string().min(1, "Lütfen bir seçenek belirleyin"),
});

const reasons = [
  "Temel seviyede yüzme öğrenmek veya çocuğumun öğrenmesi",
  "Sporu hayatıma yüzme ile katmak",
  "Sporcu olmak veya çocuğumun sporcu olması",
  "4 stil (kelebek, sırt, kurbağa, serbest) öğrenmek",
];

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse({ name, phone, reason });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, reason }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message =
          (data && (data.message as string)) ||
          "Form gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
        toast.error(message);
        return;
      }

      toast.success("Bilgileriniz başarıyla gönderildi! En kısa sürede sizi arayacağız.");
      setName("");
      setPhone("");
      setReason("");
    } catch (error) {
      console.error(error);
      toast.error("Sunucuya ulaşılamadı. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4 max-w-xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Sizi Arayalım
          </h2>
          <p className="text-muted-foreground text-lg">
            Spor ve sağlık dolu bir yaşam için ilk adımı atın.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-card rounded-3xl p-8 md:p-10 shadow-card space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">Ad Soyad</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adınızı ve soyadınızı girin"
              className="rounded-xl h-12 bg-background"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground font-medium">Telefon Numarası</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="05XX XXX XX XX"
              className="rounded-xl h-12 bg-background"
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-3">
            <Label className="text-foreground font-medium">
              Yüzmeye neden yazılmak istiyorsunuz?
            </Label>
            <RadioGroup value={reason} onValueChange={setReason} className="space-y-3">
              {reasons.map((r, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-3 bg-background rounded-xl p-4 cursor-pointer hover:bg-muted transition-colors"
                >
                  <RadioGroupItem value={r} id={`reason-${i}`} className="mt-0.5" />
                  <Label htmlFor={`reason-${i}`} className="cursor-pointer text-foreground leading-relaxed font-normal">
                    {r}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.reason && <p className="text-sm text-destructive">{errors.reason}</p>}
          </div>

          <Button
            variant="cta"
            size="lg"
            type="submit"
            className="w-full py-6 text-lg mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Gönderiliyor..." : "Bilgilerimi Gönder"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactForm;

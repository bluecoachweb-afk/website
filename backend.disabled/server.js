const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.FRONTEND_ORIGIN
  ? process.env.FRONTEND_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:8080"];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST", "OPTIONS"],
  }),
);

app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, phone, reason } = req.body || {};

  if (!name || !phone || !reason) {
    return res.status(400).json({ message: "Tüm alanlar zorunludur." });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({
      message: "E-posta yapılandırması eksik. Lütfen sunucu yöneticisine başvurun.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const to = process.env.EMAIL_TO || process.env.EMAIL_USER;

    const html = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0f172a;">
        <h1 style="font-size: 20px; margin-bottom: 16px;">Yeni İletişim Formu Başvurusu</h1>
        <p>Aşağıda BlueCoach web sitesinden gönderilen başvuru detayları yer almaktadır.</p>
        <hr style="margin: 16px 0; border: none; border-top: 1px solid #e2e8f0;" />
        <table style="width: 100%; max-width: 480px; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; width: 140px;">Ad Soyad</td>
            <td style="padding: 8px 0;">${String(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Telefon</td>
            <td style="padding: 8px 0;">${String(phone)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Yüzme Nedeni</td>
            <td style="padding: 8px 0; white-space: pre-line;">${String(reason)}</td>
          </tr>
        </table>
        <hr style="margin: 16px 0; border: none; border-top: 1px solid #e2e8f0;" />
        <p style="font-size: 12px; color: #64748b;">
          Bu e-posta BlueCoach web sitesindeki iletişim formu üzerinden otomatik olarak oluşturulmuştur.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"BlueCoach Website" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Yeni iletişim formu başvurusu",
      html,
    });

    return res.status(200).json({ message: "Form başarıyla gönderildi." });
  } catch (error) {
    console.error("E-posta gönderilirken hata:", error);
    return res.status(500).json({
      message: "Form gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    });
  }
});

app.use((err, req, res, next) => {
  if (err && err.message && err.message.includes("CORS")) {
    return res.status(403).json({ message: "Bu istemci için erişim izni yok." });
  }

  console.error("Beklenmeyen sunucu hatası:", err);
  return res.status(500).json({ message: "Beklenmeyen bir sunucu hatası oluştu." });
});

app.listen(PORT, () => {
  console.log(`Backend server ${PORT} portunda çalışıyor`);
});


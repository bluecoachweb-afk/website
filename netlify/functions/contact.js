import nodemailer from "nodemailer";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Geçersiz istek formatı." }),
    };
  }

  const { name, phone, reason } = body;

  if (!name || !phone || !reason) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Tüm alanlar zorunludur." }),
    };
  }

  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_TO = process.env.EMAIL_TO;

  const missing = [];
  if (!EMAIL_USER) missing.push("EMAIL_USER");
  if (!EMAIL_PASS) missing.push("EMAIL_PASS");

  if (missing.length > 0) {
    console.error(
      "Eksik ortam değişkenleri:",
      missing.join(", "),
      "| Toplam process.env anahtarları:",
      Object.keys(process.env).length
    );
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `E-posta yapılandırması eksik (${missing.join(", ")}). Netlify dashboard > Site configuration > Environment variables bölümünden bu değişkenlerin tanımlı olduğundan emin olun ve ardından yeni bir deploy tetikleyin.`,
      }),
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const to = EMAIL_TO || EMAIL_USER;

    const html = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0f172a;">
        <h1 style="font-size: 20px; margin-bottom: 16px;">Yeni İletişim Formu Başvurusu</h1>
        <p>Aşağıda BlueCoach web sitesinden gönderilen başvuru detayları yer almaktadır.</p>
        <hr style="margin: 16px 0; border: none; border-top: 1px solid #e2e8f0;" />
        <table style="width: 100%; max-width: 480px; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; width: 140px;">Ad Soyad</td>
            <td style="padding: 8px 0;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Telefon</td>
            <td style="padding: 8px 0;">${escapeHtml(phone)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Yüzme Nedeni</td>
            <td style="padding: 8px 0; white-space: pre-line;">${escapeHtml(reason)}</td>
          </tr>
        </table>
        <hr style="margin: 16px 0; border: none; border-top: 1px solid #e2e8f0;" />
        <p style="font-size: 12px; color: #64748b;">
          Bu e-posta BlueCoach web sitesindeki iletişim formu üzerinden otomatik olarak oluşturulmuştur.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"BlueCoach Website" <${EMAIL_USER}>`,
      to,
      subject: "Yeni iletişim formu başvurusu",
      html,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form başarıyla gönderildi." }),
    };
  } catch (error) {
    console.error("E-posta gönderilirken hata:", error.message || error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message:
          "Form gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
      }),
    };
  }
};

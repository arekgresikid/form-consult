import express from "express";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();
app.use(express.json());

app.post("/api/submit-consultation", async (req, res) => {
  try {
    const { hp_field, ...formData } = req.body;

    // Simple Anti-Bot: Honeypot field
    if (hp_field) {
      console.warn('Bot detected via honeypot field');
      return res.status(400).json({ success: false, message: "Aktivitas mencurigakan terdeteksi." });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_APP_PASSWORD;

    if (!emailUser || !emailPass) {
      return res.status(500).json({ success: false, message: "Email credentials not configured." });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const generateEmailHTML = (data: any) => {
      const rows = Object.entries(data)
        .map(([key, value]) => {
          if (!value || (Array.isArray(value) && value.length === 0)) return '';
          return `
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 35%; text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1')}</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee; color: #000;">${Array.isArray(value) ? value.join(', ') : value}</td>
            </tr>
          `;
        }).join('');

      return `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; background: #ffffff; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
          <div style="background: #000000; padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 1px; text-transform: uppercase;">Arif Tirtana | <span style="font-weight: 700;">Project Brief</span></h1>
            <p style="color: #94a3b8; margin-top: 10px; font-size: 13px; letter-spacing: 0.5px;">Formulir Konsultasi & Strategi Digital</p>
          </div>
          <div style="padding: 32px;">
            <h2 style="font-size: 18px; color: #1a202c; margin-bottom: 24px; border-bottom: 2px solid #000; padding-bottom: 8px; display: inline-block; font-weight: 600;">Data Klien & Proyek</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              ${rows}
            </table>
            <div style="margin-top: 40px; padding: 24px; background: #f8fafc; border-radius: 16px; text-align: center;">
              <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.6;">Email ini dikirim secara otomatis oleh Digital Project Brief System.<br/>Direkomendasikan untuk merespon dalam waktu 1x24 jam.</p>
            </div>
          </div>
        </div>
      `;
    };

    const mailOptions = {
      from: emailUser,
      to: 'ayicktigabelas@gmail.com',
      subject: `🚀 Proyek Baru: ${formData.clientName || 'Klien'} - ${formData.websiteType || 'Web'}`,
      text: `Data Konsultasi Website Baru:\n\n${JSON.stringify(formData, null, 2)}`,
      html: generateEmailHTML(formData)
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Berhasil terkirim!" });
  } catch (error: any) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: "Gagal mengirim email: " + error.message });
  }
});

export default app;

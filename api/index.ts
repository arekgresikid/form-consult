import express from "express";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();
app.use(express.json());

app.post("/api/submit-consultation", async (req, res) => {
  try {
    const { turnstileToken, ...formData } = req.body;
    
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    
    // Verify Turnstile Token (Bypass in development if needed, but Vercel is production)
    if (process.env.NODE_ENV === 'production' && turnstileSecret) {
      const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      });

      const verifyData: any = await verifyResponse.json();
      if (!verifyData.success) {
        return res.status(400).json({ success: false, message: "Gagal verifikasi keamanan (Turnstile)." });
      }
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

    const mailOptions = {
      from: emailUser,
      to: 'ayicktigabelas@gmail.com',
      subject: 'Form Konsultasi Website Baru',
      text: `Data Konsultasi Website Baru:\n\n${JSON.stringify(formData, null, 2)}`,
      html: `<h3>Data Konsultasi Website Baru</h3><pre>${JSON.stringify(formData, null, 2)}</pre>`
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Berhasil terkirim!" });
  } catch (error: any) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: "Gagal mengirim email: " + error.message });
  }
});

export default app;

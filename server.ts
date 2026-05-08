import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/submit-consultation", async (req, res) => {
    try {
      const { turnstileToken, ...formData } = req.body;
      
      const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
      if (!turnstileSecret) {
        console.error("TURNSTILE_SECRET_KEY is missing in environment");
        return res.status(500).json({ success: false, message: "Server security not configured." });
      }

      // Verify Turnstile Token (Bypass in development)
      if (process.env.NODE_ENV === 'production') {
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
      } else {
        console.log("Turnstile verification bypassed (Development Mode)");
      }

      const emailUser = process.env.EMAIL_USER;
      const emailPass = process.env.EMAIL_APP_PASSWORD;

      if (!emailUser || !emailPass) {
        return res.status(500).json({ success: false, message: "Server not configured with email credentials. Please set EMAIL_USER and EMAIL_APP_PASSWORD in environment." });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      // Verify connection configuration
      try {
        await transporter.verify();
        console.log("Transporter is ready to take our messages");
      } catch (verifyError) {
        console.error("Transporter verification failed:", verifyError);
        return res.status(500).json({ success: false, message: "Server email configuration is invalid." });
      }

      const mailOptions = {
        from: emailUser,
        to: 'ayicktigabelas@gmail.com',
        subject: 'Form Konsultasi Website Baru',
        text: `Data Konsultasi Website Baru:\n\n${JSON.stringify(formData, null, 2)}`,
        html: `<h3>Data Konsultasi Website Baru</h3><pre>${JSON.stringify(formData, null, 2)}</pre>`
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Berhasil terkirim!" });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: "Gagal mengirim email." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

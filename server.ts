import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

async function startServer() {
  const PORT = 3000;

  app.use(express.json());

  // Proxy for SMS Inbox API
  app.get("/api/sms/numbers", async (req, res) => {
    try {
      const token = process.env.SMS_INBOX_TOKEN || "98b164d371f877e037f472916c08fcce";
      // Assuming a correct endpoint structure for smsinbox.online
      // If the domain is unreachable, we will return a clear message.
      const response = await axios.get(`https://smsinbox.online/api/get-numbers?token=${token}`, {
        timeout: 5000
      });
      res.json(response.data);
    } catch (error: any) {
      console.error("SMS Numbers Proxy Error:", error.message);
      res.status(500).json({ 
        error: "فشل الاتصال بخدمة الأرقام", 
        message: error.message,
        tip: "تأكد من أن التوكن والرابط صحيحان"
      });
    }
  });

  app.get("/api/sms/messages/:number", async (req, res) => {
    try {
      const { number } = req.params;
      const token = process.env.SMS_INBOX_TOKEN || "98b164d371f877e037f472916c08fcce";
      const response = await axios.get(`https://smsinbox.online/api/get-messages?token=${token}&number=${number}`, {
        timeout: 5000
      });
      res.json(response.data);
    } catch (error: any) {
      console.error("SMS Messages Proxy Error:", error.message);
      res.status(500).json({ error: "فشل جلب الرسائل", message: error.message });
    }
  });

  // Mail.tm Proxy (to avoid CORS and handle headers)
  app.all("/api/mail-proxy/*", async (req, res) => {
    try {
      const targetPath = req.params[0];
      const url = `https://api.mail.tm/${targetPath}`;
      const response = await axios({
        method: req.method,
        url,
        data: req.body,
        headers: {
          ...req.headers,
          host: 'api.mail.tm',
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        params: req.query
      });
      res.json(response.data);
    } catch (error: any) {
      console.error("Mail Proxy Error:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Only listen if not on Vercel (Vercel handles the server)
  if (process.env.VERCEL !== "1") {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();

export default app;

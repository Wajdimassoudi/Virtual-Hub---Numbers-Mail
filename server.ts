import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Proxy for SMS Inbox API to keep token secret
  app.get("/api/sms/numbers", async (req, res) => {
    try {
      const token = process.env.SMS_INBOX_TOKEN || "98b164d371f877e037f472916c08fcce";
      // We'll try to fetch the numbers. If this fails, we might need the correct endpoint.
      // Many of these sites just have a public list of numbers on the homepage but an API for private ones.
      // We will try a common endpoint pattern.
      const response = await axios.get(`https://smsinbox.online/api/get-numbers?token=${token}`);
      res.json(response.data);
    } catch (error: any) {
      console.error("SMS Numbers Error:", error.message);
      res.status(500).json({ error: "Failed to fetch numbers", details: error.message });
    }
  });

  app.get("/api/sms/messages/:number", async (req, res) => {
    try {
      const { number } = req.params;
      const token = process.env.SMS_INBOX_TOKEN || "98b164d371f877e037f472916c08fcce";
      const response = await axios.get(`https://smsinbox.online/api/get-messages?token=${token}&number=${number}`);
      res.json(response.data);
    } catch (error: any) {
      console.error("SMS Messages Error:", error.message);
      res.status(500).json({ error: "Failed to fetch messages", details: error.message });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

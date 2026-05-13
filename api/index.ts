import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Proxy for SMS Inbox API
app.get("/api/sms/numbers", async (req, res) => {
  try {
    const token = process.env.SMS_INBOX_TOKEN || "98b164d371f877e037f472916c08fcce";
    const response = await axios.get(`https://smsinbox.online/api/get-numbers?token=${token}`, {
      timeout: 10000
    });
    res.json(response.data);
  } catch (error: any) {
    console.error("SMS Numbers Proxy Error:", error.message);
    res.status(500).json({ 
      error: "فشل الاتصال بخدمة الأرقام", 
      message: error.message
    });
  }
});

app.get("/api/sms/messages/:number", async (req, res) => {
  try {
    const { number } = req.params;
    const token = process.env.SMS_INBOX_TOKEN || "98b164d371f877e037f472916c08fcce";
    const response = await axios.get(`https://smsinbox.online/api/get-messages?token=${token}&number=${number}`, {
      timeout: 10000
    });
    res.json(response.data);
  } catch (error: any) {
    console.error("SMS Messages Proxy Error:", error.message);
    res.status(500).json({ error: "فشل جلب الرسائل", message: error.message });
  }
});

// Mail.tm Proxy
app.all("/api/mail-proxy/*", async (req, res) => {
  try {
    const targetPath = req.params[0];
    const url = `https://api.mail.tm/${targetPath}`;
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'authorization': req.headers.authorization || ''
      },
      params: req.query
    });
    res.json(response.data);
  } catch (error: any) {
    console.error("Mail Proxy Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", env: process.env.NODE_ENV, service: "Virtual Hub API" });
});

export default app;

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/proxy", async (req, res) => {
  const { url } = req.query;
  if (!url || !url.startsWith("https://models.com")) {
    return res.status(400).send("URL non autorisée");
  }
  try {
    const r = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0"
      }
    });
    const html = await r.text();
    res.send(html);
  } catch (e) {
    res.status(500).send("Erreur proxy");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Proxy lancé sur port " + PORT);
});

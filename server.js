{\rtf1\ansi\ansicpg1252\cocoartf2818
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import express from "express";\
import fetch from "node-fetch";\
import cors from "cors";\
\
const app = express();\
app.use(cors());\
\
app.get("/api/proxy", async (req, res) => \{\
  const \{ url \} = req.query;\
  if (!url || !url.startsWith("https://models.com")) \{\
    return res.status(400).send("URL non autoris\'e9e");\
  \}\
  try \{\
    const r = await fetch(url, \{\
      headers: \{\
        "user-agent": "Mozilla/5.0"\
      \}\
    \});\
    const html = await r.text();\
    res.send(html);\
  \} catch (e) \{\
    res.status(500).send("Erreur proxy");\
  \}\
\});\
\
const PORT = process.env.PORT || 10000;\
app.listen(PORT, () => \{\
  console.log("Proxy lanc\'e9 sur port " + PORT);\
\});\
}
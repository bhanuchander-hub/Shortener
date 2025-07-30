const express = require("express");
const Url = require("../modles/Url");
const { v4: uuid } = require("uuid");
const { logger } = require("../middleware/logger");
const router = express.Router();


router.post("/shorturls", async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;
    if (!url) return res.status(400).json({ error: "URL required" });

    const code = shortcode || uuid().slice(0, 6);
    const expiry = new Date(Date.now() + validity * 60000);

    const newUrl = await Url.create({
      originalUrl: url,
      shortcode: code,
      expiry
    });

    return res.status(201).json({
      shortLink: `http://localhost:5000/${code}`,
      expiry: expiry.toISOString()
    });
  } catch (err) {
    logger.error("Error creating short URL:", err);
    return res.status(500).json({ error: "Shortcode already exists or server error" });
  }
});


router.get("/:code", async (req, res) => {
  try {
    const entry = await Url.findOne({ shortcode: req.params.code });
    if (!entry) return res.status(404).json({ error: "Not found" });

    if (new Date() > entry.expiry) return res.status(410).json({ error: "Link expired" });

    entry.clicks.push({
      timestamp: new Date(),
      referrer: req.get("Referer") || "Direct",
      location: "India" 
    });
    await entry.save();

    return res.redirect(entry.originalUrl);
  } catch (err) {
    logger.error("Error redirecting short URL:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


router.get("/shorturls/:code", async (req, res) => {
  try {
    const entry = await Url.findOne({ shortcode: req.params.code });
    if (!entry) return res.status(404).json({ error: "Not found" });

    res.json({
      url: entry.originalUrl,
      createdAt: entry.createdAt,
      expiry: entry.expiry,
      totalClicks: entry.clicks.length,
      clickData: entry.clicks
    });
  } catch (err) {
    logger.error("Error fetching stats for short URL:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

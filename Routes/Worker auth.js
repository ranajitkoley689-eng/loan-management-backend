import express from "express";
import Worker from "../models/Worker.js";

const router = express.Router();

// Worker login by selecting name
router.post("/login", async (req, res) => {
  try {
    const { name } = req.body;
    const worker = await Worker.findOne({ name });
    if (!worker) return res.status(404).json({ msg: "Worker not found" });

    // Simple login (no password)
    res.json({ msg: "Login successful ✅", worker });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Add new worker
router.post("/add", async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Worker.findOne({ name });
    if (existing) return res.status(400).json({ msg: "Worker already exists" });

    const worker = await Worker.create({ name });
    res.json({ msg: "Worker added ✅", worker });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;

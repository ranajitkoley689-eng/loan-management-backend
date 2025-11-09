import express from "express";
import Worker from "../models/worker.js"; // make sure the file is lowercase

const router = express.Router();

// ---------------- Worker Login ----------------
router.post("/login", async (req, res) => {
  try {
    const { name } = req.body;
    const worker = await Worker.findOne({ name });
    if (!worker) return res.status(404).json({ msg: "Worker not found ❌" });

    // Simple login (no password)
    res.json({ msg: "Login successful ✅", worker });
  } catch (err) {
    console.error("Worker login error:", err);
    res.status(500).json({ msg: "Server error ⚠️", error: err.message });
  }
});

// ---------------- Add New Worker ----------------
router.post("/add", async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await Worker.findOne({ name });
    if (existing) return res.status(400).json({ msg: "Worker already exists ❌" });

    const worker = await Worker.create({ name });
    res.json({ msg: "Worker added ✅", worker });
  } catch (err) {
    console.error("Add worker error:", err);
    res.status(500).json({ msg: "Server error ⚠️", error: err.message });
  }
});

export default router;

import express from "express";
import Worker from "../models/worker.js";

const router = express.Router();

// Worker login by selecting name (simple login, no password)
router.post("/login", async (req, res) => {
  try {
    const { name } = req.body;
    const worker = await Worker.findOne({ name });
    if (!worker) return res.status(404).json({ msg: "Worker not found ❌" });

    res.json({ msg: "Login successful ✅", worker });
  } catch (err) {
    res.status(500).json({ msg: "Server error ⚠️", error: err.message });
  }
});

// Add new worker
router.post("/add", async (req, res) => {
  try {
    const { name } = req.body;
    const existing

import express from "express";
import Manager from "../models/Manager.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Manager login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const manager = await Manager.findOne({ username });
    if (!manager) return res.status(404).json({ msg: "Manager not found" });

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    // Generate JWT token valid for 7 days
    const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ msg: "Login successful ✅", token, manager });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;

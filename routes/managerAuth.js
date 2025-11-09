import express from "express";
import Manager from "../models/manager.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Manager login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const manager = await Manager.findOne({ email });
    if (!manager) return res.status(404).json({ msg: "Manager not found ❌" });

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials ❌" });

    // Generate JWT token
    const token = jwt.sign(
      { id: manager._id, email: manager.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ msg: "Login successful ✅", token, manager });
  } catch (err) {
    res.status(500).json({ msg: "Server error ⚠️", error: err.message });
  }
});

export default router;

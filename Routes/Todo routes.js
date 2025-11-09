import express from "express";
import ToDo from "../models/ToDo.js";

const router = express.Router();

// Get To-Do list for a worker
router.get("/:workerId", async (req, res) => {
  try {
    const todos = await ToDo.find()
      .populate({ path: "member", select: "name aadhaar" })
      .populate({ path: "loan", select: "emiAmount status" });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Mark To-Do as complete
router.put("/complete/:id", async (req, res) => {
  try {
    const todo = await ToDo.findByIdAndUpdate(req.params.id, { status: "completed" }, { new: true });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;

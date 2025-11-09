import express from "express";
import ToDo from "../models/todo.js"; // make sure the file is lowercase

const router = express.Router();

// Get To-Do list for a specific worker
router.get("/:workerId", async (req, res) => {
  try {
    const todos = await ToDo.find({ worker: req.params.workerId })
      .populate({ path: "member", select: "name aadhaar" })
      .populate({ path: "loan", select: "emiAmount status" });

    res.json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Mark To-Do as complete
router.put("/complete/:id", async (req, res) => {
  try {
    const todo = await ToDo.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ msg: "To-Do not found" });
    }

    res.json(todo);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;

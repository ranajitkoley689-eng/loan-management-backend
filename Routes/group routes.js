import express from "express";
import Group from "../models/group.js";   // ensure lowercase
import Worker from "../models/worker.js"; // ensure lowercase

const router = express.Router();

// ---------------- Create New Group ----------------
router.post("/add", async (req, res) => {
  try {
    const { name, leader, workerId } = req.body;

    // Ensure worker exists
    const worker = await Worker.findById(workerId);
    if (!worker) return res.status(404).json({ msg: "Worker not found ❌" });

    // Create group
    const newGroup = await Group.create({ name, leader, worker: workerId });

    // Push group ID to worker's groups array
    worker.groups.push(newGroup._id);
    await worker.save();

    res.json({ msg: "Group created ✅", group: newGroup });
  } catch (err) {
    console.error("Create group error:", err);
    res.status(500).json({ msg: "Server error ⚠️", error: err.message });
  }
});

// ---------------- Get All Groups for a Worker ----------------
router.get("/:workerId", async (req, res) => {
  try {
    const groups = await Group.find({ worker: req.params.workerId }).populate("members", "name aadhaar");
    res.json(groups);
  } catch (err) {
    console.error("Fetch groups error:", err);
    res.status(500).json({ msg: "Server error ⚠️", error: err.message });
  }
});

export default router;

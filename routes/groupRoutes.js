import express from "express";
import Group from "../models/group.js";
import Worker from "../models/worker.js";

const router = express.Router();

// Create new group
router.post("/add", async (req, res) => {
  try {
    const { name, leader, workerId } = req.body;

    const newGroup = await Group.create({
      name,
      leader,
      worker: workerId
    });

    // Add group reference to worker
    await Worker.findByIdAndUpdate(workerId, { $push: { groups: newGroup._id } });

    res.json({ msg: "Group created ✅", group: newGroup });
  } catch (err) {
    res.status(500).json({ msg: "Server error ⚠️", error: err.message });
  }
});

// Get all groups for a worker
router.get("/:workerId", async (req, res) => {
  try {
    const groups = await Group.find({ worker: req.params.workerId }).populate("members");
    res.json(groups);
  } catch (err) {
    res.status(500).json({ msg: "Server error ⚠️", error: err.message });
  }
});

export default router;

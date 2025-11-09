import express from "express";
import Member from "../models/member.js";
import Group from "../models/group.js";

const router = express.Router();

// Add new member
router.post("/add", async (req, res) => {
  try {
    const { name, aadhaar, groupId } = req.body;

    const existing = await Member.findOne({ aadhaar });
    if (existing) return res.status(400).json({ msg: "Member already exists ❌" });

    const member = await Member.create({ name, aadhaar, group: groupId });

    // Add member to group
    await Group.findByIdAndUpdate(groupId, { $push: { members: member._id } });

    res.json({ msg: "Member added ✅", member });
  } catch (err) {
    res.status(500).json({ msg: "Server error ⚠️", error: err.message });
  }
});

// Get all members for a group
router.get("/:groupId", async (req, res) => {
  try {
    const members = await Member.find({ group: req.params.groupId }).populate("loans");
    res.json(members);
  } catch (err) {
    res.status(500).json({ msg: "Server error ⚠️", error: err.message });
  }
});

export default router;

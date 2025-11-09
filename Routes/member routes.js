import express from "express";
import Member from "../models/Member.js";
import Group from "../models/Group.js";

const router = express.Router();

// Add new member
router.post("/add", async (req, res) => {
  try {
    const { name, aadhaar, address, contact, loanDate, groupId } = req.body;

    // Check if old member exists
    const existing = await Member.findOne({ aadhaar });
    if (existing) return res.json({ msg: "Old member detected ✅", old: existing });

    const newMember = await Member.create({ name, aadhaar, address, contact, loanDate, group: groupId });
    await Group.findByIdAndUpdate(groupId, { $push: { members: newMember._id } });

    res.json({ msg: "New member added ✅", member: newMember });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get all members in a group
router.get("/group/:groupId", async (req, res) => {
  try {
    const members = await Member.find({ group: req.params.groupId }).populate("loans");
    res.json(members);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;

import express from "express";
import Loan from "../models/loan.js";
import Member from "../models/member.js";
import ToDo from "../models/todo.js";

const router = express.Router();

// Issue a new loan
router.post("/issue", async (req, res) => {
  try {
    const { memberId, amount, emiCount, startDate } = req.body;
    const interestRate = 0.5; // 50% flat
    const interestAmount = amount * interestRate;
    const totalAmount = amount + interestAmount;
    const emiAmount = totalAmount / emiCount;

    // Create loan
    const newLoan = await Loan.create({
      member: memberId,
      amount,
      interestRate,
      interestAmount,
      totalAmount,
      emiCount,
      emiAmount,
      startDate,
      status: "ongoing"
    });

    // Add loan to member
    await Member.findByIdAndUpdate(memberId, { $push: { loans: newLoan._id } });

    // Generate To-Dos (EMIs every 14 days)
    const todos = [];
    const start = new Date(startDate);
    for (let i = 1; i <= emiCount; i++) {
      const dueDate = new Date(start);
      dueDate.setDate(start.getDate() + i * 14);
      todos.push({ member: memberId, loan: newLoan._id, dueDate });
    }
    await ToDo.insertMany(todos);

    res.json({ msg: "Loan issued ✅", loan: newLoan });
  } catch (err) {
    res.status(500).json({ msg: "Server error ⚠️", error: err.message });
  }
});

// Get all loans for a member
router.get("/:memberId", async (req, res) => {
  try {
    const loans = await Loan.find({ member: req.params.memberId });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ msg: "Server error ⚠️", error: err.message });
  }
});

export default router;

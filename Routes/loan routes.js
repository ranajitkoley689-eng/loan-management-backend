import express from "express";
import Loan from "../models/Loan.js";
import Member from "../models/Member.js";
import ToDo from "../models/ToDo.js";

const router = express.Router();

// Issue a new loan
router.post("/issue", async (req, res) => {
  try {
    const { memberId, amount, emiCount, startDate } = req.body;
    const interestRate = 0.5; // 50% flat
    const totalAmount = amount + amount * interestRate;
    const emiAmount = totalAmount / emiCount;

    const newLoan = await Loan.create({
      member: memberId,
      amount,
      interest: 50,
      totalAmount,
      emiCount,
      emiAmount,
      startDate
    });

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
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get all loans
router.get("/", async (req, res) => {
  const loans = await Loan.find().populate("member");
  res.json(loans);
});

export default router;

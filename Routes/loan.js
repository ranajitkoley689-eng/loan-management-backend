import express from "express";
import Loan from "../models/loan.js";
import Member from "../models/member.js";
import ToDo from "../models/todo.js";

const router = express.Router();

// ---------------- Issue a New Loan ----------------
router.post("/issue", async (req, res) => {
  try {
    const { memberId, amount, emiCount, startDate } = req.body;

    // Validate member exists
    const member = await Member.findById(memberId);
    if (!member) return res.status(404).json({ msg: "Member not found ❌" });

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
      startDate
    });

    // Push loan to member
    member.loans.push(newLoan._id);
    await member.save();

    // Generate To-Dos (EMIs every 14 days)
    const todos = [];
    let dueDate = new Date(startDate);

    for (let i = 1; i <= emiCount; i++) {
      dueDate = new Date(dueDate.getTime() + 14 * 24 * 60 * 60 * 1000); // add 14 days
      todos.push({ member: memberId, loan: newLoan._id, dueDate });
    }

    await ToDo.insertMany(todos);

    res.json({ msg: "Loan issued ✅", loan: newLoan });
  } catch (err) {
    console.error("Issue loan error:", err);
    res.status(500).json({ msg: "Server error ⚠️", error: err.message });
  }
});

export default router;

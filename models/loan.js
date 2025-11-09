import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },    // e.g., 0.5 for 50%
  interestAmount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  emiCount: { type: Number, required: true },       // number of EMI payments
  emiAmount: { type: Number, required: true },      // amount per EMI
  startDate: { type: Date, required: true },
  status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" }
}, { timestamps: true });

const Loan = mongoose.model("Loan", loanSchema);
export default Loan;

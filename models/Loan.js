import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
  amount: { type: Number, required: true },          // Principal
  interest: { type: Number, default: 50 },           // 50% flat
  totalAmount: { type: Number },                     // Principal + Interest
  emiCount: { type: Number, required: true },        // 20, 40, 60
  emiAmount: { type: Number },                       // Calculated per EMI
  startDate: { type: Date, required: true },
  paymentsMade: { type: Number, default: 0 },
  status: { type: String, default: "ongoing" }      // ongoing, completed
}, { timestamps: true });

export default mongoose.model("Loan", loanSchema);

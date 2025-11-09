import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aadhaar: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  loanDate: { type: Date, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Loan" }]
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);

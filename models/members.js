import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aadhaar: { type: String, required: true, unique: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Loan" }],
}, { timestamps: true });

const Member = mongoose.model("Member", memberSchema);
export default Member;

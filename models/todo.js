import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  loan: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" }
}, { timestamps: true });

const ToDo = mongoose.model("ToDo", todoSchema);
export default ToDo;

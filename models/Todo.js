import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  worker: { type: mongoose.Schema.Types.ObjectId, ref: "Worker" },
  loan: { type: mongoose.Schema.Types.ObjectId, ref: "Loan" },
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
  dueDate: { type: Date, required: true },
  status: { type: String, default: "pending" } // pending, completed
}, { timestamps: true });

export default mongoose.model("ToDo", todoSchema);

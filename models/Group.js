import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  leader: { type: String, required: true },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: "Worker" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }]
}, { timestamps: true });

export default mongoose.model("Group", groupSchema);

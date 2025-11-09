import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
}, { timestamps: true });

const Worker = mongoose.model("Worker", workerSchema);
export default Worker;

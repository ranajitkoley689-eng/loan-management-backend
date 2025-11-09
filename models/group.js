import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  leader: { type: String, required: true },   // Name of the group leader
  worker: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);
export default Group;

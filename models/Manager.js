import mongoose from "mongoose";

const managerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // hashed password
}, { timestamps: true });

export default mongoose.model("Manager", managerSchema);

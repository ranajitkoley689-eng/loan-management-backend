import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Manager from "./models/Manager.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createManager = async () => {
  const username = "admin";
  const password = "123123"; // manager password

  const hashedPassword = await bcrypt.hash(password, 10);
  const manager = new Manager({ username, password: hashedPassword });
  await manager.save();
  console.log("✅ Manager account created!");
  mongoose.disconnect();
};

createManager();

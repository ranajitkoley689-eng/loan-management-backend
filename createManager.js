import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Manager from "./models/manager.js";

dotenv.config();

const createManager = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    // Check if manager already exists
    const existingManager = await Manager.findOne({ email: "manager@example.com" });
    if (existingManager) {
      console.log("⚠️ Manager already exists");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("123123", 10); // default password

    // Create new manager
    const manager = await Manager.create({
      name: "Admin Manager",
      email: "manager@example.com",
      password: hashedPassword,
    });

    console.log("✅ Manager created:", manager);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating manager:", err);
    process.exit(1);
  }
};

createManager();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import Routes
import workerAuth from "./routes/workerAuth.js";
import managerAuth from "./routes/managerAuth.js";
import groupRoutes from "./routes/groupRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
const app = express();

// ---------------- Middlewares ----------------
app.use(cors());              // Enable cross-origin requests
app.use(express.json());      // Parse JSON bodies

// ---------------- MongoDB Connection ----------------
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ---------------- Routes ----------------
app.use("/api/worker", workerAuth);
app.use("/api/manager", managerAuth);
app.use("/api/groups", groupRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/todo", todoRoutes);

// ---------------- Test API ----------------
app.get("/", (req, res) => res.send("Loan Management API is running ✅"));

// ---------------- 404 Error Handling ----------------
app.use((req, res, next) => {
    res.status(404).json({ msg: "Endpoint not found ❌" });
});

// ---------------- Global Error Handler ----------------
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: "Server error ⚠️", error: err.message });
});

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

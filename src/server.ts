import mongoose from "mongoose";
import app from "./app";
import { config } from "./config/env";

const startServer = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    app.listen(config.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

startServer();

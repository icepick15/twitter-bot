"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const startServer = async () => {
    try {
        await mongoose_1.default.connect(env_1.config.MONGO_URI);
        console.log("✅ Connected to MongoDB");
        app_1.default.listen(env_1.config.PORT, () => {
            console.log(`🚀 Server running on http://localhost:${env_1.config.PORT}`);
        });
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
startServer();

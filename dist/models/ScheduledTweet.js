"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ScheduledTweetSchema = new mongoose_1.default.Schema({
    text: { type: String, required: true },
    scheduledTime: { type: Date, required: true },
    posted: { type: Boolean, default: false }, // To track if it's already posted
});
exports.default = mongoose_1.default.model("ScheduledTweet", ScheduledTweetSchema);

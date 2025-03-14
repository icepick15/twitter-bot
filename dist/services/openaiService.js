"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReply = exports.generateTweet = void 0;
const env_1 = require("../config/env");
const openai_1 = __importDefault(require("openai")); // Ensure default import
const openai = new openai_1.default({ apiKey: env_1.config.OPENAI_API_KEY });
const generateTweet = async () => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "Generate an engaging tweet about tech trends." }
            ],
        });
        return response.choices[0]?.message?.content?.trim() || "Failed to generate tweet.";
    }
    catch (error) {
        console.error("Error generating tweet:", error);
        throw new Error("Tweet generation failed.");
    }
};
exports.generateTweet = generateTweet;
const generateReply = async (keyword) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: `Generate a smart reply for: ${keyword}` }
            ],
        });
        return response.choices[0]?.message?.content?.trim() || "Failed to generate reply.";
    }
    catch (error) {
        console.error("Error generating reply:", error);
        throw new Error("Reply generation failed.");
    }
};
exports.generateReply = generateReply;

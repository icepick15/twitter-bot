"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeScheduledTweet = exports.getScheduledTweets = exports.scheduleTweet = exports.postTweet = void 0;
const twitterClient_1 = require("../config/twitterClient");
const ScheduledTweet_1 = __importDefault(require("../models/ScheduledTweet"));
// Post a tweet immediately
const postTweet = async (text) => {
    try {
        const tweet = await twitterClient_1.twitterClient.tweets.createTweet({ text });
        console.log("✅ Tweet posted successfully:", tweet);
        return tweet;
    }
    catch (error) {
        console.error("❌ Error posting tweet:", error);
        throw error;
    }
};
exports.postTweet = postTweet;
// Schedule a tweet (store it in MongoDB)
const scheduleTweet = async (text, scheduledTime) => {
    try {
        const scheduledTweet = new ScheduledTweet_1.default({ text, scheduledTime });
        await scheduledTweet.save();
        console.log("📅 Tweet scheduled successfully:", scheduledTweet);
        return scheduledTweet;
    }
    catch (error) {
        console.error("❌ Error scheduling tweet:", error);
        throw error;
    }
};
exports.scheduleTweet = scheduleTweet;
// Fetch scheduled tweets from MongoDB
const getScheduledTweets = async () => {
    try {
        const tweets = await ScheduledTweet_1.default.find();
        console.log(`📋 Found ${tweets.length} scheduled tweets`);
        return tweets;
    }
    catch (error) {
        console.error("❌ Error fetching scheduled tweets:", error);
        throw error;
    }
};
exports.getScheduledTweets = getScheduledTweets;
// Remove a scheduled tweet from MongoDB after posting
const removeScheduledTweet = async (id) => {
    try {
        await ScheduledTweet_1.default.findByIdAndDelete(id);
        console.log(`🗑️ Scheduled tweet with ID ${id} removed`);
    }
    catch (error) {
        console.error("❌ Error removing scheduled tweet:", error);
        throw error;
    }
};
exports.removeScheduledTweet = removeScheduledTweet;

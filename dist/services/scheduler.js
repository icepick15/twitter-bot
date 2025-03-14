"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const tweetService_1 = require("./tweetService");
const openaiService_1 = require("./openaiService");
const tweetService_2 = require("./tweetService"); // Fetch scheduled tweets
// Runs every 7 hours for AI-generated tweets
node_cron_1.default.schedule("0 */7 * * *", async () => {
    console.log("⏳ Running scheduled AI tweet job...");
    try {
        const aiTweet = await (0, openaiService_1.generateTweet)();
        if (!aiTweet) {
            console.warn("⚠️ Generated tweet is empty, skipping post.");
            return;
        }
        await (0, tweetService_1.postTweet)(aiTweet);
        console.log("✅ Auto-tweet posted:", aiTweet);
    }
    catch (error) {
        console.error("❌ Error posting AI-generated tweet:", error);
    }
});
// Runs every minute to check and post scheduled tweets
node_cron_1.default.schedule("* * * * *", async () => {
    console.log("⏳ Checking for scheduled tweets...");
    try {
        const scheduledTweets = await (0, tweetService_2.getScheduledTweets)();
        for (const tweet of scheduledTweets) {
            const { text, scheduledTime, _id } = tweet;
            const now = new Date();
            const tweetTime = new Date(scheduledTime);
            if (tweetTime <= now) {
                await (0, tweetService_1.postTweet)(text);
                console.log("✅ Scheduled tweet posted:", text);
                await (0, tweetService_2.removeScheduledTweet)(_id); // Remove tweet from DB after posting
            }
        }
    }
    catch (error) {
        console.error("❌ Error processing scheduled tweets:", error);
    }
});

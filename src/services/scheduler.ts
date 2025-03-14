import cron from "node-cron";
import { postTweet, getScheduledTweets, removeScheduledTweet } from "./tweetService";
import { generateTweet } from "./huggingfaceService";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN!;

// 🕖 Runs every 7 hours to post AI-generated tweets
cron.schedule("0 */7 * * *", async () => {
  console.log("⏳ Running scheduled AI tweet job...");

  try {
    const aiTweet = await generateTweet();

    if (!aiTweet?.trim()) {
      console.warn("⚠️ Generated tweet is empty, skipping post.");
      return;
    }

    await postTweet(aiTweet, ACCESS_TOKEN);
    console.log("✅ Auto-tweet posted:", aiTweet);
  } catch (error) {
    console.error("❌ Error posting AI-generated tweet:", error);
  }
});

// ⏳ Runs every minute to check and post scheduled tweets
cron.schedule("* * * * *", async () => {
  console.log("⏳ Checking for scheduled tweets...");

  try {
    const scheduledTweets = await getScheduledTweets();

    if (!scheduledTweets.length) {
      console.log("📭 No scheduled tweets to post.");
      return;
    }

    const now = new Date();

    for (const tweet of scheduledTweets) {
      const { text, scheduledTime, _id } = tweet;
      const tweetTime = new Date(scheduledTime);

      if (tweetTime <= now) {
        await postTweet(text, ACCESS_TOKEN);
        console.log("✅ Scheduled tweet posted:", text);

        // ✅ Convert ObjectId to string before deleting
        await removeScheduledTweet(_id.toString());
      }
    }
  } catch (error) {
    console.error("❌ Error processing scheduled tweets:", error);
  }
});

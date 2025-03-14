import client from "../config/twitterClient";
import ScheduledTweet from "../models/ScheduledTweet";
import { TwitterApi } from "twitter-api-v2";

// ✅ Post a tweet immediately using OAuth 2.0
export const postTweet = async (text: string, accessToken: string) => {
  try {
    const loggedClient = new TwitterApi(accessToken);
    const tweet = await loggedClient.v2.tweet(text);
    console.log("✅ Tweet posted successfully:", tweet);
    return tweet;
  } catch (error) {
    console.error("❌ Error posting tweet:", error);
    throw error;
  }
};

// 📅 Schedule a tweet (store it in MongoDB)
export const scheduleTweet = async (text: string, scheduledTime: string) => {
  try {
    const scheduledTweet = new ScheduledTweet({ text, scheduledTime });
    await scheduledTweet.save();
    console.log("📅 Tweet scheduled successfully:", scheduledTweet);
    return scheduledTweet;
  } catch (error) {
    console.error("❌ Error scheduling tweet:", error);
    throw error;
  }
};

// 📋 Fetch scheduled tweets from MongoDB
export const getScheduledTweets = async () => {
  try {
    const tweets = await ScheduledTweet.find();
    console.log(`📋 Found ${tweets.length} scheduled tweets`);
    return tweets;
  } catch (error) {
    console.error("❌ Error fetching scheduled tweets:", error);
    throw error;
  }
};

// 🗑️ Remove a scheduled tweet from MongoDB after posting
export const removeScheduledTweet = async (id: string) => {
  try {
    await ScheduledTweet.findByIdAndDelete(id);
    console.log(`🗑️ Scheduled tweet with ID ${id} removed`);
  } catch (error) {
    console.error("❌ Error removing scheduled tweet:", error);
    throw error;
  }
};

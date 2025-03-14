import { generateTweet } from "./services/huggingfaceService";
import { postTweet } from "./services/tweetService";

(async () => {
  try {
    console.log("🔍 Generating AI tweet...");
    
    const aiTweet = await generateTweet();
    
    if (!aiTweet || !aiTweet.trim()) {
      console.warn("⚠️ AI Tweet is empty, skipping...");
      return;
    }

    console.log("🤖 AI Tweet:", aiTweet);
    
    // Use a test access token from the environment
    const accessToken = process.env.TWITTER_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("❌ No valid access token found, skipping tweet.");
      return;
    }

    const postedTweet = await postTweet(aiTweet, accessToken);
    console.log("✅ Tweet posted successfully!", postedTweet);
  } catch (error: any) {
    console.error("❌ Error:", error.response?.data || error.message || error);
  }
})();

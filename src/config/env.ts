import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5600,
  TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN || "",
  MONGO_URI: process.env.MONGO_URI || "mongodb+srv://icepick15:Workhard101@icecluster.8zi6p.mongodb.net/X-autopost",
  HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY || "",
  SESSION_SECRET: process.env.SESSION_SECRET || "supersecret",
};

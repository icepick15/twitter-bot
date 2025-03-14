import mongoose from "mongoose";

const ScheduledTweetSchema = new mongoose.Schema({
  text: { type: String, required: true },
  scheduledTime: { type: Date, required: true },
  posted: { type: Boolean, default: false }, // To track if it's already posted
});

export default mongoose.model("ScheduledTweet", ScheduledTweetSchema);

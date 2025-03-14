import { Request, Response, NextFunction } from "express";
import { generateReply } from "../services/openaiService";
import { twitterClient } from "../config/twitterClient";

export const autoReply = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tweetId, keyword } = req.body;
    
    const generatedReply = await generateReply(keyword);
    const reply = await twitterClient.tweets.createTweet({
      text: generatedReply,
      reply: { in_reply_to_tweet_id: tweetId },
    });

    res.status(201).json({ message: "Reply posted", reply });
  } catch (error) {
    next(error);
  }
};

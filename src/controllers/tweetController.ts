import { Request, Response, NextFunction } from "express";
import { scheduleTweet, postTweet } from "../services/tweetService";

export const createTweet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { text, scheduledTime } = req.body;

    if (!text) {
      res.status(400).json({ error: "Tweet text is required" });
      return;
    }

    if (scheduledTime) {
      const tweet = await scheduleTweet(text, scheduledTime);
      res.status(201).json({ message: "Tweet scheduled", tweet });
    } else {
      const tweet = await postTweet(text);
      res.status(201).json({ message: "Tweet posted", tweet });
    }
  } catch (error) {
    next(error);
  }
};

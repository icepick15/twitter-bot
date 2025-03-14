"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTweet = void 0;
const tweetService_1 = require("../services/tweetService");
const createTweet = async (req, res, next) => {
    try {
        const { text, scheduledTime } = req.body;
        if (!text) {
            res.status(400).json({ error: "Tweet text is required" });
            return;
        }
        if (scheduledTime) {
            const tweet = await (0, tweetService_1.scheduleTweet)(text, scheduledTime);
            res.status(201).json({ message: "Tweet scheduled", tweet });
        }
        else {
            const tweet = await (0, tweetService_1.postTweet)(text);
            res.status(201).json({ message: "Tweet posted", tweet });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.createTweet = createTweet;

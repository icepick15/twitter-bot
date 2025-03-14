"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoReply = void 0;
const openaiService_1 = require("../services/openaiService");
const twitterClient_1 = require("../config/twitterClient");
const autoReply = async (req, res, next) => {
    try {
        const { tweetId, keyword } = req.body;
        const generatedReply = await (0, openaiService_1.generateReply)(keyword);
        const reply = await twitterClient_1.twitterClient.tweets.createTweet({
            text: generatedReply,
            reply: { in_reply_to_tweet_id: tweetId },
        });
        res.status(201).json({ message: "Reply posted", reply });
    }
    catch (error) {
        next(error);
    }
};
exports.autoReply = autoReply;

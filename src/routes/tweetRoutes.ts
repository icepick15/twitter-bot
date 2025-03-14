import express from "express";
import { createTweet } from "../controllers/tweetController";

const router = express.Router();

router.post("/tweet", createTweet);

export default router;

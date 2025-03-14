import express, { Request, Response, NextFunction } from "express";
import client from "../config/twitterClient";
import dotenv from "dotenv";
import session from "express-session";
import asyncHandler from "express-async-handler";

dotenv.config();

const router = express.Router();

// Ensure session middleware is used
router.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// Extend TypeScript's SessionData type
declare module "express-session" {
  interface SessionData {
    state?: string;
    codeVerifier?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

// Step 1: Redirect user to Twitter for authentication
router.get(
  "/twitter",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!process.env.TWITTER_CALLBACK_URL) {
      res.status(500).json({ error: "Missing callback URL" });
      return;
    }

    const { url, codeVerifier, state } = await client.generateOAuth2AuthLink(
      process.env.TWITTER_CALLBACK_URL,
      { scope: ["tweet.read", "tweet.write", "users.read", "offline.access"] }
    );

    if (!req.session) {
      res.status(500).json({ error: "Session is not available" });
      return;
    }

    req.session.state = state;
    req.session.codeVerifier = codeVerifier;

    res.redirect(url);
  })
);

// Step 2: Twitter redirects back to this route after authentication
router.get(
  "/twitter/callback",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { state, code } = req.query;

    if (!req.session) {
      res.status(500).json({ error: "Session is not available" });
      return;
    }

    if (!state || !code || state !== req.session.state) {
      res.status(400).json({ error: "Invalid state or authorization code" });
      return;
    }

    if (!req.session.codeVerifier) {
      res.status(400).json({ error: "Missing code verifier in session" });
      return;
    }

    try {
      const { accessToken, refreshToken } = await client.loginWithOAuth2({
        code: code as string,
        codeVerifier: req.session.codeVerifier,
        redirectUri: process.env.TWITTER_CALLBACK_URL!,
      });

      req.session.accessToken = accessToken;
      req.session.refreshToken = refreshToken;

      res.send("✅ Authentication successful!");
    } catch (error: any) {
      console.error("❌ OAuth 2.0 Error:", error);
      res.status(500).json({
        error: "Authentication failed",
        details: error.message || "Unknown error",
      });
    }
  })
);

export default router;

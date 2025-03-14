import express from "express";
import session from "express-session";
import cors from "cors";
import tweetRoutes from "./routes/tweetRoutes";
import authRoutes from "./routes/authRoutes";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 🛑 CORS Configuration (Allow requests from frontend)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// 🛑 Session Middleware (Must Be Before Routes)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(express.json());
app.use(logger);

// 🛑 Routes
app.use("/api", tweetRoutes);
app.use("/api/auth", authRoutes);

// 🛑 Global Error Handler
app.use(errorHandler);

export default app;

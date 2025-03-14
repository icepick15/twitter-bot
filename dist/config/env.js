"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    PORT: process.env.PORT || 5600,
    TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN,
    MONGO_URI: process.env.MONGO_URI || "mongodb+srv://icepick15:Workhard101@icecluster.8zi6p.mongodb.net/X-autopost",
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

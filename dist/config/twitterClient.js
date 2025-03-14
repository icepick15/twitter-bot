"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitterClient = void 0;
const twitter_api_sdk_1 = require("twitter-api-sdk");
const env_1 = require("./env");
exports.twitterClient = new twitter_api_sdk_1.Client(env_1.config.TWITTER_BEARER_TOKEN);

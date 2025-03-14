"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tweetController_1 = require("../controllers/tweetController");
const router = express_1.default.Router();
router.post("/tweet", tweetController_1.createTweet);
exports.default = router;

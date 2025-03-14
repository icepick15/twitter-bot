import { config } from "../config/env";
import OpenAI from "openai"; // Ensure default import

const openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });


export const generateTweet = async (): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Generate an engaging tweet about tech trends." }
      ],
    });

    return response.choices[0]?.message?.content?.trim() || "Failed to generate tweet.";
  } catch (error) {
    console.error("Error generating tweet:", error);
    throw new Error("Tweet generation failed.");
  }
};

export const generateReply = async (keyword: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: `Generate a smart reply for: ${keyword}` }
      ],
    });

    return response.choices[0]?.message?.content?.trim() || "Failed to generate reply.";
  } catch (error) {
    console.error("Error generating reply:", error);
    throw new Error("Reply generation failed.");
  }
};

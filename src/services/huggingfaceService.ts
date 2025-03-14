import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY; // Stored in .env

export const generateTweet = async (): Promise<string | null> => {
  if (!HUGGINGFACE_API_KEY) {
    console.error("❌ Error: Missing Hugging Face API key. Set HUGGINGFACE_API_KEY in .env");
    return null;
  }

  try {
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      { inputs: "Generate a short, engaging tweet about technology and AI." },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle different response formats
    const responseData = response.data;

    if (Array.isArray(responseData) && responseData.length > 0) {
      return responseData[0]?.generated_text?.trim() || null;
    } else if (typeof responseData === "object" && responseData.generated_text) {
      return responseData.generated_text.trim();
    } else {
      console.error("❌ Unexpected API response format:", responseData);
      return null;
    }
  } catch (error: any) {
    console.error("❌ Error generating tweet:", error.response?.data || error.message);
    return null;
  }
};

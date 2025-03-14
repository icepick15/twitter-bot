import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // Load API key from .env file

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function listModels() {
  try {
    const models = await openai.models.list();
    console.log("Available Models:", models.data.map((model) => model.id));
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

listModels();

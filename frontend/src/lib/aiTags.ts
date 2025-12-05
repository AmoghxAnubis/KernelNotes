import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateTags(text: string): Promise<string[]> {
  try {
    const key = process.env.NEXT_PUBLIC_GEMINI_KEY;
    if (!key) return [];

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Extract 3 short comma-separated tags for the following journal entry:\n\n "${text}"`;

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    return output.split(",").map((t) => t.trim());
  } catch (e) {
    console.error("AI tag error:", e);
    return [];
  }
}

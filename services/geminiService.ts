import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates romantic phrases using the Gemini API.
 * @param theme - A theme to inspire the phrases (e.g., "the ocean", "stars").
 * @returns A promise that resolves to an object containing a main title and an array of phrases.
 */
export const generateRomanticPhrases = async (theme: string): Promise<{ mainText: string; phrases: string[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a list of short, romantic, and poetic phrases about "${theme}". Also create a beautiful, short main title for the page based on this theme. The phrases should be very short, like 2-3 words. The title should be 3-4 words.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A short, beautiful, and romantic title based on the theme. Maximum 4 words."
            },
            phrases: {
              type: Type.ARRAY,
              description: "An array of 20-30 very short (2-3 words) romantic phrases related to the theme.",
              items: {
                type: Type.STRING
              }
            }
          }
        },
      }
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);

    if (!data.title || !Array.isArray(data.phrases) || data.phrases.length === 0) {
      throw new Error("Invalid data structure received from API.");
    }

    return {
      mainText: data.title,
      phrases: data.phrases,
    };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Provide a fallback response in case of an API error
    return {
      mainText: "Endless Love",
      phrases: [
        "An error occurred.", "Please try again.", "Still love you.", "Forever yours.",
        "My darling.", "Sweetheart.", "My love.", "Always.", "Be mine.", "True love.",
        "You & me.", "My soulmate."
      ]
    };
  }
};

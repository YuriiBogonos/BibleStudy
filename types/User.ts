import {
  GenerateSessionPayload,
  Message,
  Question,
  createChatCompletion,
  questionGenerationPrompt,
} from "@/api/openaiApi";

export interface User {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL?: string;
  emailVerified: boolean;
  [key: string]: any;
}

// Генерація запитань
export const generateQuestions = async (
  sessionInfo: GenerateSessionPayload["sessionInfo"],
  messages: Message[],
  model: string,
  maxTokens: number = 4000
): Promise<Question[]> => {
  const questionsResponse = await createChatCompletion({
    model,
    messages: [
      ...messages,
      { role: "user", content: questionGenerationPrompt(sessionInfo) },
    ],
    max_tokens: maxTokens,
  });

  const content = questionsResponse.choices?.[0]?.message?.content;
  if (content) {
    const jsonMatch = content.match(/({.*})/s);

    if (jsonMatch && jsonMatch[1]) {
      try {
        const jsonResponse = JSON.parse(jsonMatch[1]);
        return jsonResponse.questions;
      } catch (error) {
        console.error("Error parsing questions JSON:", error);
        throw new Error("Failed to parse JSON response for questions");
      }
    } else {
      console.error("No valid JSON found in response");
      throw new Error("No valid JSON found in response");
    }
  }

  throw new Error("Failed to generate questions");
};

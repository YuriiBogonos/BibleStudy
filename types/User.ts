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

// Генерація відповіді на питання
// const generateAnswer = async (
//   question: string,
//   verses: number,
//   preferredBible: string,
//   complexity: string,
//   messages: Message[],
//   model: string
// ): Promise<AnswerResponse> => {
//   const response = await createChatCompletion({
//     model,
//     messages: [
//       ...messages,
//       {
//         role: "user",
//         content: answerPrompt(question, verses, preferredBible, complexity),
//       },
//     ],
//     max_tokens: 1000,
//   });

//   console.log("response in generateAnswer ====>", response);
//   console.log("response.object in generateAnswer ====>", response.choices);

//   const content = response.choices?.[0]?.message?.content;

//   console.log("CONTENT ====>", response.choices);

//   if (content) {
//     const jsonMatch = content.match(/({.*})/s); // Match JSON-like structure

//     console.log("jsonMatch ===>", jsonMatch);

//     if (jsonMatch && jsonMatch[1]) {
//       try {
//         const jsonResponse = JSON.parse(jsonMatch[1]);

//         // Check if "verses" exists and is a non-empty array
//         if (
//           jsonResponse.verses &&
//           Array.isArray(jsonResponse.verses) &&
//           jsonResponse.verses.length > 0
//         ) {
//           return jsonResponse; // Valid response
//         } else {
//           throw new Error("Response JSON is missing valid 'verses' data");
//         }
//       } catch (error) {
//         console.error("Error parsing answer JSON:", error);
//         throw new Error("Failed to parse JSON response for answer");
//       }
//     } else {
//       console.error("error in generateAnswer. No valid JSON found in response");
//       throw new Error("Failed to generate answer");
//     }
//   }

//   console.log("Failed to generate answer");

//   throw new Error("Failed to generate answer");
// };

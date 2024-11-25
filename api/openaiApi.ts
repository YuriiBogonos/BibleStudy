import OpenAI from "openai";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { generateQuestions } from "@/types/User";

export type Role = "user" | "system" | "assistant";
export type FinishReason =
  | "stop"
  | "length"
  | "tool_calls"
  | "content_filter"
  | "function_call";

export interface Message {
  role: Role;
  content: string;
}

interface GenerateResponsePayload {
  model: string;
  messages: Message[];
  max_tokens?: number;
}

export interface GenerateSessionPayload extends GenerateResponsePayload {
  sessionInfo: {
    sessionName: string;
    focusTopics: string;
    numberOfQuestions: number;
    numberOfVerses: number;
    preferredBible: string;
    complexity: string;
  };
}

interface ChatCompletionChoice {
  index: number;
  message: { role: "assistant"; content: string | null };
  finish_reason: FinishReason;
}

interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatCompletionChoice[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface BibleVerse {
  book: string;
  chapter: number;
  verses: string;
  full_verse: string;
}

export interface Question {
  content: string;
  bible_verse: BibleVerse[];
}

export interface AnswerResponse {
  answer: string;
  verses: BibleVerse[];
}

interface SessionCompletion {
  id: string;
  sessionName: string;
  focusTopic: string;
  preferredBible: string;
  complexity: string;
  questions: Question[];
}

// Ініціалізація OpenAI клієнта
const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

// Функція для створення чат-комплітацій
export const createChatCompletion = async (
  payload: GenerateResponsePayload
): Promise<ChatCompletion> => {
  return openai.chat.completions.create({
    model: payload.model,
    messages: payload.messages,
    max_tokens: payload.max_tokens || 100,
  });
};

// Функція для обробки відповіді OpenAI
const mapResponseToCompletion = (response: ChatCompletion): ChatCompletion => ({
  id: response.id,
  object: response.object,
  created: response.created,
  model: response.model,
  choices: response.choices.map((choice) => ({
    index: choice.index,
    message: {
      role: choice.message.role as "assistant",
      content: choice.message.content,
    },
    finish_reason: choice.finish_reason as FinishReason,
  })),
  usage: response.usage,
});

// Функція для обробки помилок
const handleError = (error: unknown): FetchBaseQueryError => {
  return {
    status: error instanceof OpenAI.APIError ? error.status : "CUSTOM_ERROR",
    data: error instanceof Error ? error.message : "Unknown error",
  } as FetchBaseQueryError;
};

// Промти
export const questionGenerationPrompt = (
  sessionInfo: GenerateSessionPayload["sessionInfo"]
) => `
You are an experienced Christian pastor. Please provide exactly ${
  sessionInfo.numberOfQuestions
} study questions about ${sessionInfo.focusTopics} that are appropriate for a ${
  sessionInfo.complexity
} level Bible study.

Each question should include exactly ${
  sessionInfo.numberOfVerses
} relevant Bible verses. 

Please format the response as valid JSON without any extra text. The JSON should look like this:
{
  "questions": [
    {
      "content": "Question text",
      "bible_verse": [
        {
          "book": "Book name",
          "chapter": 1,
          "verses": "Verse numbers",
          "full_verse": "Full text of the verse"
        }
        ${
          sessionInfo.numberOfVerses > 1
            ? `, {
          "book": "Book name 2",
          "chapter": 2,
          "verses": "Verse numbers",
          "full_verse": "Full text of the verse"
        }`
            : ""
        }
      ]
    }
  ]
}
`;

const answerPrompt = (
  question: string,
  verses: number,
  preferredBible: string,
  complexity: string
) => `
You are an experienced Christian pastor. Please provide exactly ${verses} relevant Bible verses from the ${preferredBible} to answer the question: "${question}". 

Format the response as valid JSON without any extra text. The JSON should look like this:
{
  "verses": [
    {
      "book": "Book name",
      "chapter": 1,
      "verses": "Verse numbers",
      "full_verse": "Full text of the verse"
    }
    ${
      verses > 1
        ? `, {
      "book": "Book name 2",
      "chapter": 2,
      "verses": "Verse numbers",
      "full_verse": "Full text of the verse"
    }`
        : ""
    }
  ]
}
`;

// Генерація відповіді на питання
const generateAnswer = async (
  question: string,
  verses: number,
  preferredBible: string,
  complexity: string,
  messages: Message[],
  model: string
): Promise<AnswerResponse> => {
  const response = await createChatCompletion({
    model,
    messages: [
      ...messages,
      {
        role: "user",
        content: answerPrompt(question, verses, preferredBible, complexity),
      },
    ],
    max_tokens: 1000,
  });

  const content = response.choices?.[0]?.message?.content;

  if (content) {
    const jsonMatch = content.match(/({.*})/s);

    if (jsonMatch && jsonMatch[1]) {
      try {
        const jsonResponse = JSON.parse(jsonMatch[1]);
        return jsonResponse;
      } catch (error) {
        console.error("Error parsing answer JSON:", error);
        throw new Error("Failed to parse JSON response for answer");
      }
    } else {
      console.error("error in generateAnswer. No valid JSON found in response");
      throw new Error("No valid JSON found in response");
    }
  }

  throw new Error("Failed to generate answer");
};

// Основна функція запиту OpenAI
const openAiBaseQuery: BaseQueryFn<
  GenerateResponsePayload | GenerateSessionPayload,
  ChatCompletion | SessionCompletion | AnswerResponse,
  FetchBaseQueryError
> = async (payload) => {
  try {
    console.log("Base query payload:", payload);

    if ("sessionInfo" in payload) {
      console.log("Generating session...");
      const sessionPayload = payload as GenerateSessionPayload;
      const questions = await generateQuestions(
        sessionPayload.sessionInfo,
        sessionPayload.messages,
        sessionPayload.model,
        4000
      );

      return {
        data: {
          id: `session_${new Date().getTime()}`,
          sessionName: sessionPayload.sessionInfo.sessionName,
          focusTopic: sessionPayload.sessionInfo.focusTopics,
          preferredBible: sessionPayload.sessionInfo.preferredBible,
          complexity: sessionPayload.sessionInfo.complexity,
          questions,
        },
      } as { data: SessionCompletion };
    }

    const { question, verses, preferredBible, complexity, messages, model } =
      payload as GenerateResponsePayload & {
        question: string;
        verses: number;
        preferredBible: string;
        complexity: string;
      };

    const answerResponse = await generateAnswer(
      question,
      verses,
      preferredBible,
      complexity,
      messages,
      model
    );

    return { data: answerResponse };
  } catch (error) {
    console.error("Error in openAiBaseQuery:", error);
    return { error: handleError(error) };
  }
};

export default openAiBaseQuery;

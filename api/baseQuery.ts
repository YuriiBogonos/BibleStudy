import { BaseQueryFn } from "@reduxjs/toolkit/query";
import OpenAI from "openai";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

type Role = "user" | "system" | "assistant";
type FinishReason =
  | "stop"
  | "length"
  | "tool_calls"
  | "content_filter"
  | "function_call";

interface Message {
  role: Role;
  content: string;
}

interface GenerateResponsePayload {
  model: string;
  messages: Message[];
  max_tokens?: number;
}

interface ChatCompletionChoice {
  index: number;
  message: {
    role: "assistant";
    content: string | null;
  };
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

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

const createChatCompletion = async (
  payload: GenerateResponsePayload,
): Promise<OpenAI.Chat.Completions.ChatCompletion> => {
  return openai.chat.completions.create({
    model: payload.model,
    messages: payload.messages,
    max_tokens: payload.max_tokens || 100,
  });
};

const mapResponseToCompletion = (
  response: OpenAI.Chat.Completions.ChatCompletion,
): ChatCompletion => ({
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

const handleError = (error: unknown): FetchBaseQueryError => {
  if (error instanceof OpenAI.APIError) {
    return {
      status: error.status,
      data: error.message,
    } as FetchBaseQueryError;
  }
  return {
    status: "CUSTOM_ERROR",
    data: error instanceof Error ? error.message : "Unknown error",
  } as FetchBaseQueryError;
};

const openAiBaseQuery: BaseQueryFn<
  GenerateResponsePayload,
  ChatCompletion,
  FetchBaseQueryError
> = async (payload) => {
  try {
    const response = await createChatCompletion(payload);
    const chatCompletion = mapResponseToCompletion(response);
    return { data: chatCompletion };
  } catch (error: unknown) {
    return { error: handleError(error) };
  }
};

export default openAiBaseQuery;

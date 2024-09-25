import { createApi } from "@reduxjs/toolkit/query/react";
import openAiBaseQuery from "./baseQuery";

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

export const openAiApi = createApi({
  reducerPath: "openAiApi",
  baseQuery: openAiBaseQuery,
  endpoints: (builder) => ({
    generateResponse: builder.mutation<ChatCompletion, GenerateResponsePayload>(
      {
        query: ({ model, messages, max_tokens }) => ({
          model,
          messages,
          max_tokens,
        }),
      },
    ),
  }),
});

export const { useGenerateResponseMutation } = openAiApi;

import { createApi } from '@reduxjs/toolkit/query/react';
import openAiBaseQuery, { FinishReason, Role } from '@/api/openaiApi';

interface Message {
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
    preferredBible: string;
    complexity: string;
  };
}

interface ChatCompletionChoice {
  index: number;
  message: {
    role: 'assistant';
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

interface SessionCompletion {
  id: string;
  sessionName: string;
  focusTopics: string[];
  preferredBible: string;
  complexity: string;
  questions: string[];
  answers: string[];
}

export const openAiApi = createApi({
  reducerPath: 'openAiApi',
  baseQuery: openAiBaseQuery,
  endpoints: (builder) => ({
    generateResponse: builder.mutation<ChatCompletion, GenerateResponsePayload>(
      {
        query: (payload) => payload,
      }
    ),
    generateSession: builder.mutation<
      SessionCompletion,
      GenerateSessionPayload
    >({
      query: (payload) => payload,
    }),
  }),
});

export const { useGenerateResponseMutation, useGenerateSessionMutation } =
  openAiApi;

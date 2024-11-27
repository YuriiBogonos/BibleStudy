import { Question } from "@/api/openaiApi";

import { StackNavigationProp } from "@react-navigation/stack";
import { IQuestionNavigationData } from "./QuestionsTypes";

export interface ISessionsFormValues {
  sessionName: string;
  numberOfQuestions: number;
  verses: number;
  focusTopic: string;
  preferredBible: string;
  complexity: string;
}

export interface INavigationData {
  id: string;
  focusTopic: string;
  createdAt: number;
  sessionName: string;
  preferredBible: string;
  complexity: string;
  questions: Question[];
  answers: string[];
}

export type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "(sessions)"
>;

export interface GenerateSessionResponse {
  id: string;
  sessionName: string;
  focusTopic: string;
  preferredBible: string;
  complexity: string;
  questions: Question[];
}

export interface FirestoreSession {
  id: string;
  userId: string;
  sessionName: string;
  focusTopic: string;
  preferredBible: string;
  complexity: string;
  questions: Question[];
  createdAt: number;
  updatedAt: number;
}

export interface CreateSessionDTO {
  sessionName: string;
  focusTopic: string;
  preferredBible: string;
  complexity: string;
  questions: Question[];
}

export type RootStackParamList = {
  "(tabs)": undefined;
  "(sessions)": {
    screen: keyof SessionsStackParamList;
    params?: SessionsStackParamList[keyof SessionsStackParamList];
  };
  "(auth)": undefined;
};

export type SessionsStackParamList = {
  answersSession: { sessionData: INavigationData };
  questionResult: {
    questionsData: IQuestionNavigationData;
  };
};

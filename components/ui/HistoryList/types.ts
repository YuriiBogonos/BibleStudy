export interface BaseHistoryItem {
  title: string;
  verses: number;
  version: string;
  status: string;
  date: string;
}

export interface Session extends BaseHistoryItem {
  questions: number;
  topic: string;
}

export interface Question extends BaseHistoryItem {
  id: string;
  complexity: string;
}
export enum HistoryType {
  SESSION = "session",
  QUESTION = "question",
}

export type HistoryTypeEnum = HistoryType.SESSION | HistoryType.QUESTION;

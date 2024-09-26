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
  id: string; // Unique identifier for each question
  complexity: string; // Additional complexity field (e.g., 'Study', 'Devotional')
}

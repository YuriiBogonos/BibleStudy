export interface IVerses {
  book: string;
  chapter: number;
  verse: number;
  full_verse: string;
}

export type IQuestionsData = Omit<IQuestionNavigationData, "verses"> & {
  verses: IVerses[] | [];
};

export interface IQuestionsFormValues {
  question: string;
  verses: number;
  preferredBible: string;
  complexity: string;
}

export interface IQuestionNavigationData {
  verses: string;
  question: string;
  preferredBible: string;
  complexity: string;
}

export interface IFirestoreQuestion extends IQuestionsData {
  createdAt: number;
  updatedAt: number;
  id: string;
  userId: string;
}

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  questions: IConvertedQuestions[] | null;
  sessions: IConvertedSessions[] | null;
  error: string | null;
}

const initialState: IInitialState = {
  questions: null,
  sessions: null,
  error: null,
};

export interface IConvertedSessions {
  id: string;
  title: string;
  verses: number;
  version: string;
  topic: string;
  status: string;
  date: string;
  questions: number;
}

export interface IConvertedQuestions {
  id: string;
  title: string;
  version: string;
  verses: number;
  date: string;
  status: string;
}

const historySlice = createSlice({
  name: "history",
  initialState: initialState,
  reducers: {
    setSessions(state, action: PayloadAction<IConvertedSessions[]>) {
      state.sessions = action.payload;
    },
    setQuestions(state, action: PayloadAction<IConvertedQuestions[]>) {
      state.questions = action.payload;
    },
  },
});

export const { setSessions, setQuestions } = historySlice.actions;

export default historySlice.reducer;

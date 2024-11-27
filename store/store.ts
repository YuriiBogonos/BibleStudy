import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import historyReducer from "./slices/historySlice";
import { openAiApi } from "@/api/baseQuery";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    history: historyReducer,
    [openAiApi.reducerPath]: openAiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(openAiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

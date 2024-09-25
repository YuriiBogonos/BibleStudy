import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auhtSlice";
import { openAiApi } from "@/api/openaiApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [openAiApi.reducerPath]: openAiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(openAiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

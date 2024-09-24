import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sanitizeUser } from "@/services/authServices/SignUpServive";

interface AuthState {
  user: any | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpSuccess(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.error = null;
    },
    signUpFailure(state, action: PayloadAction<string>) {
      state.user = null;
      state.error = action.payload;
    },
    signInSuccess(state, action: PayloadAction<any>) {
      state.user = sanitizeUser(action.payload);
      state.error = null;
    },
    signInFailure(state, action: PayloadAction<string>) {
      state.user = null;
      state.error = action.payload;
    },
    signOutSuccess(state) {
      state.user = null;
      state.error = null;
    },
    signOutFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
} = authSlice.actions;

export default authSlice.reducer;

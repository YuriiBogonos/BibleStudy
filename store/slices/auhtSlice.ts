import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/User";

interface AuthState {
  user: User | null;
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
      state.user = action.payload;
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
    changeFullName(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.displayName = action.payload;
      }
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
  changeFullName,
} = authSlice.actions;

export default authSlice.reducer;

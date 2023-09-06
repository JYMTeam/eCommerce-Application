import { AuthErrorResponse } from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatAuthErrorMessage } from "../../commercetools-sdk/errors/errors";

interface IUserSignupState {
  loading: boolean;
  isSignedUp: boolean;
  errorMessage: string;
}

const initialState: IUserSignupState = {
  loading: false,
  isSignedUp: false,
  errorMessage: "",
};

export const userSignupSlice = createSlice({
  name: "userSignup",
  initialState,
  reducers: {
    userSignupFetching(state) {
      state.loading = true;
    },
    userSignupFetchSuccess(state) {
      state.loading = false;
      state.isSignedUp = true;
      state.errorMessage = "";
    },
    userSignupFetchError(state, action: PayloadAction<AuthErrorResponse>) {
      state.loading = false;
      state.errorMessage = formatAuthErrorMessage(action.payload);
    },
    userSignupClearErrorMessage(state) {
      state.errorMessage = "";
    },
  },
});

export const {
  userSignupFetching,
  userSignupFetchSuccess,
  userSignupFetchError,
  userSignupClearErrorMessage,
} = userSignupSlice.actions;

export default userSignupSlice.reducer;

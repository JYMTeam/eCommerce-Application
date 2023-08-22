import {
  AuthErrorResponse,
  CustomerSignInResult,
} from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatErrorMessage } from "../../commercetools-sdk/errors/errors";

interface IUserSignupState {
  loading: boolean;
  isSignedUp: boolean;
  error: AuthErrorResponse | null;
  errorMessage: string;
  signupData: CustomerSignInResult | null;
}

const initialState: IUserSignupState = {
  loading: false,
  isSignedUp: false,
  error: null,
  errorMessage: "",
  signupData: null,
};

export const userSignupSlice = createSlice({
  name: "userSignup",
  initialState,
  reducers: {
    userSignupFetching(state) {
      state.loading = true;
    },
    userSignupFetchSuccess(state, action: PayloadAction<CustomerSignInResult>) {
      state.loading = false;
      state.isSignedUp = true;
      state.error = null;
      state.errorMessage = "";
      state.signupData = action.payload;
    },
    userSignupFetchError(state, action: PayloadAction<AuthErrorResponse>) {
      state.loading = false;
      state.error = action.payload;
      state.errorMessage = formatErrorMessage(action.payload);
      state.signupData = null;
    },
    userSignupClearErrorMessage(state) {
      state.errorMessage = "";
    },
  },
});

// Export actions
export const {
  userSignupFetching,
  userSignupFetchSuccess,
  userSignupFetchError,
  userSignupClearErrorMessage,
} = userSignupSlice.actions;

export default userSignupSlice.reducer;

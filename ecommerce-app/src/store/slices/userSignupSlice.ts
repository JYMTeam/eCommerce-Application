import { CustomerSignInResult } from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HttpErrorType } from "@commercetools/sdk-client-v2";

interface IUserSignupState {
  loading: boolean;
  isSignup: boolean;
  error: HttpErrorType | null;
  signupData: CustomerSignInResult | null;
}

const initialState: IUserSignupState = {
  loading: false,
  isSignup: false,
  error: null,
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
      state.isSignup = true;
      state.error = null;
      state.signupData = action.payload;
    },
    userSignupFetchError(state, action: PayloadAction<HttpErrorType>) {
      state.loading = false;
      state.error = action.payload;
      state.signupData = null;
    },
  },
});

// Export actions
export const {
  userSignupFetching,
  userSignupFetchSuccess,
  userSignupFetchError,
} = userSignupSlice.actions;

export default userSignupSlice.reducer;

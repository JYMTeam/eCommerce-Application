import { AuthErrorResponse, Customer } from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TokenStore } from "@commercetools/sdk-client-v2";
import { formatErrorMessage } from "../../commercetools-sdk/errors/errors";
import { passToken } from "../../commercetools-sdk/PassTokenCache";

export interface IUserLoginState {
  loading: boolean;
  isLogged: boolean;
  error: AuthErrorResponse | null;
  errorMessage: string;
  loginData: Customer | null;
  tokenData: TokenStore | null;
}

const initialState: IUserLoginState = {
  loading: false,
  isLogged: false,
  error: null,
  errorMessage: "",
  loginData: null,
  tokenData: null,
};

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    userLoginFetching(state) {
      state.loading = true;
    },
    userLoginReset(state) {
      state.loading = false;
      state.isLogged = false;
      state.error = null;
      state.errorMessage = "";
      state.loginData = null;
      state.tokenData = null;
    },
    userLoginFetchSuccess(state, action: PayloadAction<Customer>) {
      state.loading = false;
      state.isLogged = true;
      state.error = null;
      state.errorMessage = "";
      state.loginData = action.payload;
    },
    userLoginFetchError(state, action: PayloadAction<AuthErrorResponse>) {
      state.loading = false;
      state.error = action.payload;
      state.errorMessage = formatErrorMessage(action.payload);
      state.loginData = null;
    },
    userLoginClearErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = "";
    },
    setUserToken(state, action: PayloadAction<TokenStore>) {
      state.tokenData = action.payload;
      passToken.set(action.payload);
    },
  },
});

// Export actions
export const {
  userLoginFetching,
  userLoginReset,
  userLoginFetchSuccess,
  userLoginFetchError,
  userLoginClearErrorMessage,
  setUserToken,
} = userLoginSlice.actions;

export default userLoginSlice.reducer;

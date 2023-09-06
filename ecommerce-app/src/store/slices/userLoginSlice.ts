import { AuthErrorResponse, Customer } from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TokenStore } from "@commercetools/sdk-client-v2";
import { formatAuthErrorMessage } from "../../commercetools-sdk/errors/errors";
import { passToken } from "../../commercetools-sdk/PassTokenCache/PassTokenCache";

export interface IUserLoginState {
  loading: boolean;
  isLogged: boolean;
  errorMessage: string;
  loginData: Customer | null;
  tokenData: TokenStore | null;
  isSuccessMessage: boolean;
}

const initialState: IUserLoginState = {
  loading: false,
  isLogged: false,
  errorMessage: "",
  loginData: null,
  tokenData: null,
  isSuccessMessage: false,
};

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    userLoginFetching(state) {
      state.loading = true;
    },
    userLoginReset() {
      const cache: TokenStore = {
        token: "",
        expirationTime: 0,
        refreshToken: undefined,
      };
      passToken.set(cache);
      return { ...initialState };
    },
    userLoginFetchSuccess(state, action: PayloadAction<Customer>) {
      state.loading = false;
      state.errorMessage = "";
      state.isSuccessMessage = false;

      state.isLogged = true;
      state.loginData = action.payload;
    },
    userLoginFetchError(state, action: PayloadAction<AuthErrorResponse>) {
      state.loading = false;
      state.errorMessage = formatAuthErrorMessage(action.payload);
      state.loginData = null;
    },
    userLoginClearErrorMessage(state) {
      state.errorMessage = "";
    },
    setUserToken(state, action: PayloadAction<TokenStore>) {
      state.tokenData = action.payload;
    },
    setIsSuccess(state) {
      state.isSuccessMessage = true;
    },
  },
});

export const {
  userLoginFetching,
  userLoginReset,
  userLoginFetchSuccess,
  userLoginFetchError,
  userLoginClearErrorMessage,
  setUserToken,
  setIsSuccess,
} = userLoginSlice.actions;

export default userLoginSlice.reducer;

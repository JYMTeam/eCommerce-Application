import { AuthErrorResponse, Customer } from "@commercetools/platform-sdk";
import { createSlice } from "@reduxjs/toolkit";
import { TokenStore } from "@commercetools/sdk-client-v2";
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

export const userLogoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    logout(state) {
      state.loading = false;
      state.isLogged = false;
      state.error = null;
      state.errorMessage = "";
    },
  },
});

// Export actions
export const { logout } = userLogoutSlice.actions;

export default userLogoutSlice.reducer;

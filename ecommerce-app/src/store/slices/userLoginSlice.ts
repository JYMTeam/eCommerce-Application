import { Customer } from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HttpErrorType } from "@commercetools/sdk-client-v2";

interface IUserLoginState {
  loading: boolean;
  isLogged: boolean;
  error: HttpErrorType | null;
  loginData: Customer | null;
}

const initialState: IUserLoginState = {
  loading: false,
  isLogged: false,
  error: null,
  loginData: null,
};

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    userLoginFetching(state) {
      state.loading = true;
    },
    userLoginFetchSuccess(state, action: PayloadAction<Customer>) {
      state.loading = false;
      state.isLogged = true;
      state.error = null;
      state.loginData = action.payload;
    },
    userLoginFetchError(state, action: PayloadAction<HttpErrorType>) {
      state.loading = false;
      state.error = action.payload;
      state.loginData = null;
    },
  },
});

// Export actions
export const { userLoginFetching, userLoginFetchSuccess, userLoginFetchError } =
  userLoginSlice.actions;

export default userLoginSlice.reducer;

import { Customer } from "@commercetools/platform-sdk";
import { IErrorResponse } from "../../models/errorModels";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUserLoginState {
  loading: boolean;
  error: IErrorResponse | null;
  loginData: Customer | null;
}

const initialState: IUserLoginState = {
  loading: false,
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
      state.loginData = action.payload;
    },
    userLoginFetchError(state, action: PayloadAction<IErrorResponse>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { userLoginFetching, userLoginFetchSuccess, userLoginFetchError } =
  userLoginSlice.actions; // Export actions
export default userLoginSlice.reducer;

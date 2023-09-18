import {
  //DiscountCode,
  DiscountCodePagedQueryResponse,
  ErrorResponse,
} from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";

const STR_PLACEHOLDER = "";
export interface PromocodeState {
  loading: boolean;
  error: ErrorResponse | null;
  errorMessage: string;
  promocodes: DiscountCodePagedQueryResponse | null;
}

const initialState: PromocodeState = {
  loading: false,
  error: null,
  errorMessage: STR_PLACEHOLDER,
  promocodes: null,
};

export const promocodeSlice = createSlice({
  name: "promocodes",
  initialState,
  reducers: {
    promocodeFetching(state) {
      state.loading = true;
    },
    promocodeReset(state) {
      return { ...initialState };
    },
    promocodeFetchSuccess(
      state,
      action: PayloadAction<DiscountCodePagedQueryResponse>,
    ) {
      state.loading = false;
      state.error = null;
      state.errorMessage = "";
      state.promocodes = action.payload;
    },
    promocodeFetchError(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.error = action.payload;
      state.errorMessage = formatProductsErrorMessage(action.payload);
      state.promocodes = null;
    },
    promocodeErrorMessage(state) {
      state.error = null;
      state.errorMessage = STR_PLACEHOLDER;
    },
  },
});

export const {
  promocodeFetching,
  promocodeFetchSuccess,
  promocodeFetchError,
  promocodeErrorMessage,
} = promocodeSlice.actions;

export default promocodeSlice.reducer;

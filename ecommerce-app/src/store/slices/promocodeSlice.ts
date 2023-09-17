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
  promocode: DiscountCodePagedQueryResponse | null;
}

const initialState: PromocodeState = {
  loading: false,
  error: null,
  errorMessage: STR_PLACEHOLDER,
  promocode: null,
};

export const promocodeSlice = createSlice({
  name: "promocode",
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
      state.promocode = action.payload;
    },
    promocodeFetchError(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.error = action.payload;
      state.errorMessage = formatProductsErrorMessage(action.payload);
      state.promocode = null;
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

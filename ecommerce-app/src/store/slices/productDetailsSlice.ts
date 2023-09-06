import { ErrorResponse, ProductProjection } from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";

const STR_PLACEHOLDER = "";
export interface ProductDetailsState {
  loading: boolean;
  error: ErrorResponse | null;
  errorMessage: string;
  product: ProductProjection | null;
}

const initialState: ProductDetailsState = {
  loading: false,
  error: null,
  errorMessage: STR_PLACEHOLDER,
  product: null,
};

export const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    productDetailsFetching(state) {
      state.loading = true;
    },
    productDetailsReset(state) {
      return { ...initialState };
    },
    productDetailsFetchSuccess(
      state,
      action: PayloadAction<ProductProjection>,
    ) {
      state.loading = false;
      state.error = null;
      state.errorMessage = "";
      state.product = action.payload;
    },
    productDetailsFetchError(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.error = action.payload;
      state.errorMessage = formatProductsErrorMessage(action.payload);
      state.product = null;
    },
    productDetailsErrorMessage(state) {
      state.error = null;
      state.errorMessage = STR_PLACEHOLDER;
    },
  },
});

export const {
  productDetailsFetching,
  productDetailsFetchSuccess,
  productDetailsFetchError,
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;

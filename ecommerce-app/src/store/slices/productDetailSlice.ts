import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorResponse, ProductProjection } from "@commercetools/platform-sdk";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";

interface ProductDetailState {
  loading: boolean;
  product: ProductProjection | null;
  error: ErrorResponse | null;
  errorMessage: string;
}

const initialState: ProductDetailState = {
  product: null,
  loading: false,
  error: null,
  errorMessage: "",
};

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    productDetailFetching(state) {
      state.loading = true;
    },
    productDetailFetchSuccess(state, action: PayloadAction<ProductProjection>) {
      state.loading = false;
      state.error = null;
      state.product = action.payload;
    },
    productDetailFetchError(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.errorMessage = formatProductsErrorMessage(action.payload);
    },
  },
});
export const {
  productDetailFetching,
  productDetailFetchSuccess,
  productDetailFetchError,
} = productDetailSlice.actions;
export default productDetailSlice.reducer;

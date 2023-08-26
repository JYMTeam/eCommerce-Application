import { ErrorResponse, ProductType } from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";

export interface IFilterProductsState {
  loading: boolean;
  isSuccess: boolean;
  error: ErrorResponse | null;
  errorMessage: string;
  attributesData: ProductType | null;
  isSuccessMessage: boolean;
}

const initialState: IFilterProductsState = {
  loading: false,
  isSuccess: false,
  error: null,
  errorMessage: "",
  attributesData: null,
  isSuccessMessage: false,
};

export const filterProductsSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {
    attributesFetching(state) {
      state.loading = true;
    },
    attributesReset(state) {
      state.loading = false;
      state.isSuccess = false;
      state.error = null;
      state.errorMessage = "";
      state.attributesData = null;
      state.isSuccessMessage = false;
    },
    attributesFetchSuccess(state, action: PayloadAction<ProductType>) {
      state.loading = false;
      state.isSuccess = false;
      state.error = null;
      state.errorMessage = "";
      state.attributesData = action.payload;
      state.isSuccessMessage = false;
    },
    attributesFetchError(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.error = action.payload;
      state.errorMessage = formatProductsErrorMessage(action.payload);
      state.attributesData = null;
    },
    attributesClearErrorMessage(state) {
      state.errorMessage = "";
    },
    setIsSuccess(state) {
      state.isSuccessMessage = true;
    },
  },
});

// Export actions
export const {
  attributesFetching,
  attributesReset,
  attributesFetchSuccess,
  attributesFetchError,
  attributesClearErrorMessage,
  setIsSuccess,
} = filterProductsSlice.actions;

export default filterProductsSlice.reducer;

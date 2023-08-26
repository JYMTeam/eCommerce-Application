import {
  AuthErrorResponse,
  ProductProjectionPagedQueryResponse,
} from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatErrorMessage } from "../../commercetools-sdk/errors/errors";

export interface IFilterProductsState {
  loading: boolean;
  isFiltered: boolean;
  error: AuthErrorResponse | null;
  errorMessage: string;
  filterData: ProductProjectionPagedQueryResponse | null;
  isSuccessMessage: boolean;
}

const initialState: IFilterProductsState = {
  loading: false,
  isFiltered: false,
  error: null,
  errorMessage: "",
  filterData: null,
  isSuccessMessage: false,
};

export const filterProductsSlice = createSlice({
  name: "filterProducts",
  initialState,
  reducers: {
    filterProductsFetching(state) {
      state.loading = true;
    },
    filterProductsReset(state) {
      state.loading = false;
      state.isFiltered = false;
      state.error = null;
      state.errorMessage = "";
      state.filterData = null;
      state.isSuccessMessage = false;
    },
    filterProductsFetchSuccess(
      state,
      action: PayloadAction<ProductProjectionPagedQueryResponse>,
    ) {
      state.loading = false;
      state.isFiltered = false;
      state.error = null;
      state.errorMessage = "";
      state.filterData = action.payload;
      state.isSuccessMessage = false;
    },
    filterProductsFetchError(state, action: PayloadAction<AuthErrorResponse>) {
      state.loading = false;
      state.error = action.payload;
      state.errorMessage = formatErrorMessage(action.payload);
      state.filterData = null;
    },
    filterProductsClearErrorMessage(state) {
      state.errorMessage = "";
    },
    setIsSuccess(state) {
      state.isSuccessMessage = true;
    },
  },
});

// Export actions
export const {
  filterProductsFetching,
  filterProductsReset,
  filterProductsFetchSuccess,
  filterProductsFetchError,
  filterProductsClearErrorMessage,
  setIsSuccess,
} = filterProductsSlice.actions;

export default filterProductsSlice.reducer;
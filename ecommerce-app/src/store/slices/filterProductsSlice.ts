import {
  AuthErrorResponse,
  ProductProjectionPagedQueryResponse,
} from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatAuthErrorMessage } from "../../commercetools-sdk/errors/errors";

export interface IFilterProductsState {
  loading: boolean;
  isFiltered: boolean;
  errorMessage: string;
  filterData: ProductProjectionPagedQueryResponse | null;
  isSuccessMessage: boolean;
}

const initialState: IFilterProductsState = {
  loading: false,
  isFiltered: false,
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
    filterProductsReset() {
      return { ...initialState };
    },
    // filterProductsFetchSuccess(
    //   state,
    //   action: PayloadAction<ProductProjectionPagedQueryResponse>,
    // ) {
    //   state.loading = false;
    //   state.isFiltered = false;
    //   state.errorMessage = "";
    //   state.filterData = action.payload;
    //   state.isSuccessMessage = false;
    // },
    filterProductsFetchError(state, action: PayloadAction<AuthErrorResponse>) {
      state.loading = false;
      state.errorMessage = formatAuthErrorMessage(action.payload);
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
  // filterProductsFetchSuccess,
  filterProductsFetchError,
  filterProductsClearErrorMessage,
  setIsSuccess,
} = filterProductsSlice.actions;

export default filterProductsSlice.reducer;

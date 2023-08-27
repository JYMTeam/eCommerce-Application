import {
  AttributeDefinition,
  ErrorResponse,
} from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";

export interface IFilterProductsState {
  loading: boolean;
  isSuccess: boolean;
  errorMessage: string;
  attributesData: AttributeDefinition[] | undefined;
  isSuccessMessage: boolean;
}

const initialState: IFilterProductsState = {
  loading: false,
  isSuccess: false,
  errorMessage: "",
  attributesData: undefined,
  isSuccessMessage: false,
};

export const filterProductsSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {
    attributesFetching(state) {
      state.loading = true;
    },
    attributesReset() {
      return { ...initialState };
    },
    attributesFetchSuccess(
      state,
      action: PayloadAction<AttributeDefinition[] | undefined>,
    ) {
      state.loading = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.attributesData = action.payload;
      state.isSuccessMessage = false;
    },
    attributesFetchError(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.attributesData = undefined;
      state.errorMessage = formatProductsErrorMessage(action.payload);
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

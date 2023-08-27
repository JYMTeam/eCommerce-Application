import {
  AttributeDefinition,
  ErrorResponse,
} from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";
import { parseAttributes } from "../../utils/dataParsers";
import { IProductsFormattedAttribute } from "../../types";

export interface IFilterProductsState {
  loading: boolean;
  isSuccess: boolean;
  errorMessage: string;
  attributesData: IProductsFormattedAttribute[];
}

const initialState: IFilterProductsState = {
  loading: false,
  isSuccess: false,
  errorMessage: "",
  attributesData: [],
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
      if (action.payload) {
        state.attributesData = parseAttributes(action.payload);
      }
    },
    attributesFetchError(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.attributesData = [];
      state.errorMessage = formatProductsErrorMessage(action.payload);
    },
    attributesClearErrorMessage(state) {
      state.errorMessage = "";
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
} = filterProductsSlice.actions;

export default filterProductsSlice.reducer;

import {
  ErrorResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";
import { DEFAULT_PRODUCTS_LIMIT } from "../../constants/constants";

const STR_PLACEHOLDER = "";
export interface IProductsState {
  loading: boolean;
  isFiltered: boolean;
  errorMessage: string;
  products: ProductProjection[];
  page: number;
  limit: number;
  total?: number | undefined;
  offset: number;
}

const initialState: IProductsState = {
  loading: false,
  isFiltered: false,
  errorMessage: STR_PLACEHOLDER,
  products: [],
  page: 1,
  limit: DEFAULT_PRODUCTS_LIMIT,
  total: 0,
  offset: 0,
};

type pagePayload = {
  page: number;
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsFetching(state) {
      state.loading = true;
    },
    productsReset() {
      return { ...initialState };
    },
    productsFetchSuccess(
      state,
      action: PayloadAction<ProductProjectionPagedQueryResponse>,
    ) {
      state.loading = false;
      state.errorMessage = "";
      state.products = action.payload.results;
      state.total = action.payload.total;
      state.limit = action.payload.limit;
      state.offset = action.payload.offset;
    },
    productsFetchError(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.errorMessage = formatProductsErrorMessage(action.payload);
      state.products = [];
    },
    productsClearErrorMessage(state) {
      state.errorMessage = STR_PLACEHOLDER;
    },
    productsPage(state, action: PayloadAction<pagePayload>) {
      state.page = action.payload.page;
    },
    filterProductsFetching(state) {
      state.loading = true;
    },
    filterProductsFetchSuccess(
      state,
      action: PayloadAction<ProductProjectionPagedQueryResponse>,
    ) {
      state.loading = false;
      state.errorMessage = "";
      state.products = action.payload.results;
      state.total = action.payload.total;
    },
  },
});

export const {
  productsFetching,
  productsFetchSuccess,
  productsFetchError,
  productsPage,
} = productsSlice.actions;

export default productsSlice.reducer;

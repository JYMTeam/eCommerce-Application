import {
  ErrorResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";

const STR_PLACEHOLDER = "";
const DEFAULT_LIMIT = 20;

export interface IProductsState {
  loading: boolean;
  isFiltered: boolean;
  error: ErrorResponse | null; //type?
  errorMessage: string;
  products: ProductProjection[];
  page: number;
  limit: number;
  count: number; //Actual number of results returned
  total?: number | undefined; //Total number of results matching the query
}

const initialState: IProductsState = {
  loading: false,
  isFiltered: false,
  error: null,
  errorMessage: STR_PLACEHOLDER,
  products: [],
  page: 1,
  limit: DEFAULT_LIMIT,
  count: 0,
  total: 0,
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
    productsReset(state) {
      Object.assign(state, initialState);
    },
    productsFetchSuccess(
      state,
      action: PayloadAction<ProductProjectionPagedQueryResponse>,
    ) {
      state.loading = false;
      state.error = null;
      state.errorMessage = "";
      state.products = action.payload.results;
      state.count = action.payload.count;
      state.total = action.payload.total;
    },
    productsFetchError(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.error = action.payload;
      state.errorMessage = formatProductsErrorMessage(action.payload);
      state.products = [];
    },
    productsClearErrorMessage(state) {
      state.error = null;
      state.errorMessage = STR_PLACEHOLDER;
    },
    productPage(state, action: PayloadAction<pagePayload>) {
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
      state.error = null;
      state.errorMessage = "";
      state.products = action.payload.results;
      state.count = action.payload.count;
      state.total = action.payload.total;
    },
  },
});

// Export actions
export const { productsFetching, productsFetchSuccess, productsFetchError } =
  productsSlice.actions;

export default productsSlice.reducer;

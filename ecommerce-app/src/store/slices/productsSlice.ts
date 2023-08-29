import {
  ErrorResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";
import { DEFAULT_PRODUCTS_LIMIT } from "../../constants/constants";
import { SelectedFilterValues } from "../../components/ProductsList/ProductsAttributes";

const STR_PLACEHOLDER = "";
export interface IProductsState {
  loading: boolean;
  errorMessage: string;
  products: ProductProjection[];
  page: number;
  limit: number;
  total?: number | undefined;
  offset: number;
  filterParams: SelectedFilterValues | null;
}

const initialState: IProductsState = {
  loading: false,
  errorMessage: STR_PLACEHOLDER,
  products: [],
  page: 1,
  limit: DEFAULT_PRODUCTS_LIMIT,
  total: 0,
  offset: 0,
  filterParams: null,
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
    filterProductsFetchSuccess(
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
    filterParams(state, action: PayloadAction<SelectedFilterValues>) {
      state.page = 1;
      state.limit = DEFAULT_PRODUCTS_LIMIT;
      state.total = 0;
      state.offset = 0;
      state.filterParams = action.payload;
    },
    filterEmpty(state) {
      state.filterParams = null;
    },
  },
});

export const {
  productsFetching,
  productsFetchSuccess,
  productsFetchError,
  productsPage,
  productsReset,
  filterProductsFetchSuccess,
  filterParams,
  filterEmpty,
} = productsSlice.actions;

export default productsSlice.reducer;

import {
  ErrorResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";
import { DEFAULT_PRODUCTS_LIMIT } from "../../constants/constants";
import { SelectedFilterAndSortValues } from "../../types";

const STR_PLACEHOLDER = "";
export interface IProductsState {
  loading: boolean;
  errorMessage: string;
  products: ProductProjection[];
  page: number;
  limit: number;
  total?: number | undefined;
  offset: number;
  filterParams: SelectedFilterAndSortValues | null;
  filterCount: number;
  categoryId: string | null;
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
  filterCount: 0,
  categoryId: null,
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
      state.errorMessage = STR_PLACEHOLDER;
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
      state.errorMessage = STR_PLACEHOLDER;
      state.products = action.payload.results;
      state.total = action.payload.total;
      state.limit = action.payload.limit;
      state.offset = action.payload.offset;
    },
    filterParams(state, action: PayloadAction<SelectedFilterAndSortValues>) {
      state.page = 1;
      state.limit = DEFAULT_PRODUCTS_LIMIT;
      state.total = 0;
      state.offset = 0;
      state.filterParams = action.payload;
    },
    filterEmpty(state) {
      state.filterParams = null;
      state.filterCount = 0;
    },
    filterCount(state, action: PayloadAction<number>) {
      state.filterCount = action.payload;
    },
    // categorySet(state, action: PayloadAction<string>){
    //   state.page = 1;
    //   //state.offset = 0;
    //   state.categoryId = action.payload;
    // },
    // categoryReset(state){
    //   state.categoryId = null;
    // }
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
  filterCount,
  // categorySet,
  // categoryReset,
} = productsSlice.actions;

export default productsSlice.reducer;

import { Category, ErrorResponse } from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";

const STR_PLACEHOLDER = "";

export interface ICategoriesState {
  loading: boolean;
  errorMessage: string;
  categories: Category[];
}

const initialState: ICategoriesState = {
  loading: false,
  errorMessage: STR_PLACEHOLDER,
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesFetching(state) {
      state.loading = true;
    },
    categoriesReset() {
      return { ...initialState };
    },
    categoriesFetchSuccess(state, action: PayloadAction<Category[]>) {
      state.loading = false;
      state.errorMessage = STR_PLACEHOLDER;
      state.categories = action.payload;
    },
    categoriesFetchError(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.categories = [];
      state.errorMessage = formatProductsErrorMessage(action.payload);
    },
  },
});

export const {
  categoriesFetching,
  categoriesReset,
  categoriesFetchSuccess,
  categoriesFetchError,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;

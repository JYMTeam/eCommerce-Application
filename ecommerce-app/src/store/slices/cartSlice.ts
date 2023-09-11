import { Cart, ErrorResponse } from "@commercetools/platform-sdk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";
import { TokenStore } from "@commercetools/sdk-client-v2";

const STR_PLACEHOLDER = "";

export interface ICartState {
  loading: boolean;
  errorMessage: string;
  cart: Cart | null;
  tokenAnonymData: TokenStore | null;
}

const initialState: ICartState = {
  loading: false,
  errorMessage: STR_PLACEHOLDER,
  cart: null,
  tokenAnonymData: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartFetching(state) {
      state.loading = true;
    },
    cartReset() {
      return { ...initialState };
    },
    cartFetchSuccess(state, action: PayloadAction<Cart>) {
      state.loading = false;
      state.errorMessage = STR_PLACEHOLDER;
      state.cart = action.payload;
    },
    cartFetchError(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.cart = null;
      state.errorMessage = formatProductsErrorMessage(action.payload);
    },

    setAnonymToken(state, action: PayloadAction<TokenStore>) {
      state.tokenAnonymData = action.payload;
    },
  },
});

export const {
  cartFetching,
  cartReset,
  cartFetchSuccess,
  cartFetchError,
  setAnonymToken,
} = cartSlice.actions;

export default cartSlice.reducer;

import { ClientResponse } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import {
  Cart,
  ErrorResponse,
  ProductProjection,
} from "@commercetools/platform-sdk";
import {
  cartFetchError,
  cartFetchSuccess,
  cartFetching,
  setAnonymToken,
} from "../slices/cartSlice";
import { anonymTokenCache } from "../../commercetools-sdk/PassTokenCache/PassTokenCache";
import { getApiTokenRoot } from "../../commercetools-sdk/builders/ClientBuilderWithExistingToken";
import { getApiAnonymRoot } from "../../commercetools-sdk/builders/ClientBuilderAnonym";

export const fetchCreateCart = (existingToken?: string) => {
  console.log("fetch create cart out");
  return async (dispatch: AppDispatch) => {
    try {
      console.log("fetch create cart in");
      dispatch(cartFetching());
      const apiRoot = existingToken
        ? getApiTokenRoot(existingToken)
        : getApiAnonymRoot();
      const answer = await apiRoot
        .me()
        .carts()
        .post({
          body: {
            currency: "USD",
            country: "US",
          },
        })
        .execute();
      console.log("answer cart added");
      console.log(answer);

      dispatch(cartFetchSuccess(answer.body));
      dispatch(setAnonymToken(anonymTokenCache.get()));
    } catch (e) {
      const error = e as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(cartFetchError(body));
      }
    }
  };
};

export const fetchAddProductsCart = (
  existingToken: string,
  cart: Cart,
  product: ProductProjection,
  quantity: number,
) => {
  console.log("fetchAddProductsCart out");
  return async (dispatch: AppDispatch) => {
    try {
      console.log("fetchAddProductsCart in");
      dispatch(cartFetching());
      const answer = await getApiTokenRoot(existingToken)
        .me()
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: {
            version: cart.version,
            actions: [
              {
                action: "addLineItem",
                productId: product.id,
                quantity,
              },
            ],
          },
        })
        .execute();
      console.log("answer products added");
      console.log(answer);
      dispatch(cartFetchSuccess(answer.body));
    } catch (e) {
      const error = e as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(cartFetchError(body));
      }
    }
  };
};

export const fetchGetCart = (existingToken: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(cartFetching());
      const answer = await getApiTokenRoot(existingToken)
        .me()
        .activeCart()
        .get()
        .execute();
      console.log("answer active cart");
      console.log(answer);
      dispatch(cartFetchSuccess(answer.body));
    } catch (e) {
      const error = e as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(cartFetchError(body));
      }

      throw e;
    }
  };
};

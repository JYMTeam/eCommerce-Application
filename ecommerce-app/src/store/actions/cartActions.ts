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
  return async (dispatch: AppDispatch) => {
    try {
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
  return async (dispatch: AppDispatch) => {
    try {
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

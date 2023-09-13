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
import { INotification, notificationActive } from "../slices/notificationSlice";
import {
  DEFAULT_CURRENCY,
  DEFAULT_PRICE_COUNTRY,
  NOTIFICATION_MESSAGES,
} from "../../constants/constants";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";

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
            currency: DEFAULT_CURRENCY,
            country: DEFAULT_PRICE_COUNTRY,
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
        if (body) {
          dispatch(cartFetchError(body));

          const message = formatProductsErrorMessage(body);
          const errorMessage: INotification = {
            message,
            type: "error",
          };

          dispatch(notificationActive(errorMessage));
        }
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
      const successMessage: INotification = {
        message: NOTIFICATION_MESSAGES.SUCCESS_PRODUCT_ADD,
        type: "success",
      };
      dispatch(cartFetchSuccess(answer.body));
      dispatch(notificationActive(successMessage));
    } catch (e) {
      const error = e as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(cartFetchError(body));

        const message = formatProductsErrorMessage(body);
        const errorMessage: INotification = {
          message,
          type: "error",
        };

        dispatch(notificationActive(errorMessage));
      }
    }
  };
};

export const fetchRemoveProductFromCart = (
  existingToken: string,
  cart: Cart,
  lineItemId: string,
  quantity?: number,
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
                action: "removeLineItem",
                lineItemId,
                quantity,
              },
            ],
          },
        })
        .execute();
      const successLoginMessage: INotification = {
        message: NOTIFICATION_MESSAGES.SUCCESS_PRODUCT_REMOVE,
        type: "success",
      };
      dispatch(cartFetchSuccess(answer.body));
      dispatch(notificationActive(successLoginMessage));
    } catch (e) {
      const error = e as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(cartFetchError(body));

        if (body) {
          dispatch(cartFetchError(body));

          const message = formatProductsErrorMessage(body);
          const errorMessage: INotification = {
            message,
            type: "error",
          };

          dispatch(notificationActive(errorMessage));
        }
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
        // if (body.statusCode === 404) {
        //   dispatch(fetchCreateCart())
        // } else {
        dispatch(cartFetchError(body));
        throw e;
        // }
      }
    }
  };
};

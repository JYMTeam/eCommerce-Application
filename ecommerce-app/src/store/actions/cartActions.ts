import { ClientResponse } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import {
  Cart,
  ErrorResponse,
  MyCartUpdateAction,
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
import { statusCode } from "../../types";

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

const fetchRemoveProductFromCart = (
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

const fetchRemoveAllProductsFromCart = (existingToken: string, cart: Cart) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(cartFetching());

      const removeActions = cart.lineItems.map((item) => {
        const removeAction: MyCartUpdateAction = {
          action: "removeLineItem",
          lineItemId: item.id,
        };
        return removeAction;
      });

      const answer = await getApiTokenRoot(existingToken)
        .me()
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: {
            version: cart.version,
            actions: removeActions,
          },
        })
        .execute();

      const successLoginMessage: INotification = {
        message: NOTIFICATION_MESSAGES.SUCCESS_ALL_PRODUCTS_REMOVE,
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

const fetchRemoveCart = (existingToken: string, cart: Cart) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(cartFetching());

      const answer = await getApiTokenRoot(existingToken)
        .me()
        .carts()
        .withId({ ID: cart.id })
        .delete({
          queryArgs: {
            version: cart.version,
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

// ATTENTION: Throw ERROR!!
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
        throw e;
      }
    }
  };
};

export const fetchCheckCartAndRemoveProduct = (
  existingToken: string,
  cart: Cart,
  lineItemId: string,
  quantity?: number,
) => {
  return async (dispatch: AppDispatch) => {
    try {
      await dispatch(fetchGetCart(existingToken));
      await dispatch(
        fetchRemoveProductFromCart(existingToken, cart, lineItemId, quantity),
      );
    } catch (e) {
      const error = e as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(cartFetchError(body));
      }
    }
  };
};

export const fetchCheckCartAndRemoveAll = (
  existingToken: string,
  cart: Cart,
) => {
  return async (dispatch: AppDispatch) => {
    try {
      await dispatch(fetchGetCart(existingToken));
      await dispatch(fetchRemoveAllProductsFromCart(existingToken, cart));
    } catch (e) {
      const error = e as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(cartFetchError(body));
      }
    }
  };
};

export const fetchCheckCartAndRemoveCart = (
  existingToken: string,
  cart: Cart,
) => {
  return async (dispatch: AppDispatch) => {
    try {
      await dispatch(fetchGetCart(existingToken));
      await dispatch(fetchRemoveCart(existingToken, cart));
    } catch (e) {
      const error = e as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(cartFetchError(body));
      }
    }
  };
};

export const fetchGetOrCreateCart = (existingToken?: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      if (existingToken) {
        try {
          await dispatch(fetchGetCart(existingToken));
        } catch (errorGetCart) {
          const error = errorGetCart as ClientResponse<ErrorResponse>;
          const body = error.body;
          if (body) {
            if (body.statusCode === statusCode.NOT_FOUND) {
              dispatch(fetchCreateCart(existingToken));
            } else {
              dispatch(cartFetchError(body));
            }
          }
        }
      } else {
        dispatch(fetchCreateCart());
      }
    } catch (e) {
      const error = e as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(cartFetchError(body));
      }
    }
  };
};

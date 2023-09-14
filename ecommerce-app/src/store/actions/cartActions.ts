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
import { INotification, notificationActive } from "../slices/notificationSlice";
import {
  DEFAULT_CURRENCY,
  DEFAULT_PRICE_COUNTRY,
  NOTIFICATION_MESSAGES,
} from "../../constants/constants";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";
import { statusCode } from "../../types";
import { clientBuilderManager } from "../../commercetools-sdk/builders/ClientbuilderManager";

export const fetchCreateCart = (existingToken?: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(cartFetching());
      if (existingToken) {
        await clientBuilderManager.switchToRefreshTokenFlow(existingToken);
      } else {
        await clientBuilderManager.switchToAnonymFlow();
      }
      // const apiRoot = existingToken
      //   ? getApiTokenRoot(existingToken)
      //   : getApiAnonymRoot();
      const answer = await clientBuilderManager.requestCurrentBuilder
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
  cart: Cart,
  product: ProductProjection,
  quantity: number,
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(cartFetching());
      const answer = await clientBuilderManager.requestCurrentBuilder
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
  cart: Cart,
  lineItemId: string,
  quantity?: number,
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(cartFetching());
      const answer = await clientBuilderManager.requestCurrentBuilder
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

const fetchRemoveAllProductsFromCart = (cart: Cart) => {
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

      const answer = await clientBuilderManager.requestCurrentBuilder
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

const fetchRemoveCart = (cart: Cart) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(cartFetching());

      const answer = await clientBuilderManager.requestCurrentBuilder
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
export const fetchGetCart = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(cartFetching());
      const answer = await clientBuilderManager.requestCurrentBuilder
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
  cart: Cart,
  lineItemId: string,
  quantity?: number,
) => {
  return async (dispatch: AppDispatch) => {
    try {
      await dispatch(fetchGetCart());
      await dispatch(fetchRemoveProductFromCart(cart, lineItemId, quantity));
    } catch (e) {
      const error = e as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(cartFetchError(body));
      }
    }
  };
};

export const fetchCheckCartAndRemoveAll = (cart: Cart) => {
  return async (dispatch: AppDispatch) => {
    try {
      await dispatch(fetchGetCart());
      await dispatch(fetchRemoveAllProductsFromCart(cart));
    } catch (e) {
      const error = e as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(cartFetchError(body));
      }
    }
  };
};

export const fetchCheckCartAndRemoveCart = (cart: Cart) => {
  return async (dispatch: AppDispatch) => {
    try {
      await dispatch(fetchGetCart());
      await dispatch(fetchRemoveCart(cart));
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
          await dispatch(fetchGetCart());
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

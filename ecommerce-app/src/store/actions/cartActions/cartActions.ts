import { ClientResponse } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "../..";
import { Cart, ErrorResponse, DiscountCode } from "@commercetools/platform-sdk";
import {
  cartFetchError,
  cartFetchSuccess,
  cartFetching,
  setAnonymToken,
} from "../../slices/cartSlice";
import { passTokenManager } from "../../../commercetools-sdk/PassTokenCache/PassTokenCache";
import {
  INotification,
  notificationActive,
} from "../../slices/notificationSlice";
import {
  DEFAULT_CURRENCY,
  DEFAULT_PRICE_COUNTRY,
  NOTIFICATION_MESSAGES,
} from "../../../constants/constants";
import { formatProductsErrorMessage } from "../../../commercetools-sdk/errors/errors";
import { statusCode } from "../../../types";
import { clientBuilderManager } from "../../../commercetools-sdk/builders/ClientBuilderManager";

export const fetchCreateCart = (existingToken?: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(cartFetching());
      if (existingToken) {
        await clientBuilderManager.switchToRefreshTokenFlow(existingToken);
      } else {
        await clientBuilderManager.switchToAnonymFlow();
      }

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
      dispatch(setAnonymToken(passTokenManager.get()));
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
  productId: string,
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
                productId,
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

export const fetchRemoveProductsCart = (
  cart: Cart,
  lineItemId: string,
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
                action: "removeLineItem",
                lineItemId,
                quantity,
              },
            ],
          },
        })
        .execute();
      const successMessage: INotification = {
        message: NOTIFICATION_MESSAGES.SUCCESS_PRODUCT_REMOVE,
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

export const fetchAddPromocodeToCart = (
  cart: Cart,
  promocode: DiscountCode,
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
                action: "addDiscountCode",
                code: promocode.code,
              },
            ],
          },
        })
        .execute();
      const successMessage: INotification = {
        message: NOTIFICATION_MESSAGES.SUCCESS_PROMOCODE_APPLY,
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
export const fetchRemovePromocodeFromCart = (
  cart: Cart,
  promocode: DiscountCode,
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
                action: "removeDiscountCode",
                discountCode: {
                  typeId: "discount-code",
                  id: promocode.id,
                },
              },
            ],
          },
        })
        .execute();
      const successMessage: INotification = {
        message: NOTIFICATION_MESSAGES.SUCCESS_PROMOCODE_REMOVE,
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

import { ClientResponse } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "../..";
import {
  Cart,
  ErrorResponse,
  MyCartUpdateAction,
} from "@commercetools/platform-sdk";
import {
  cartFetchError,
  cartFetchSuccess,
  cartFetching,
} from "../../slices/cartSlice";
import {
  INotification,
  notificationActive,
} from "../../slices/notificationSlice";
import { NOTIFICATION_MESSAGES } from "../../../constants/constants";
import { formatProductsErrorMessage } from "../../../commercetools-sdk/errors/errors";
import { clientBuilderManager } from "../../../commercetools-sdk/builders/ClientBuilderManager";
import { fetchGetCart } from "./cartActions";

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

export const fetchCheckCartAndRemoveProduct = (
  cart: Cart,
  lineItemId: string,
  quantity?: number,
) => {
  return async (dispatch: AppDispatch) => {
    try {
      // await dispatch(fetchGetCart());
      dispatch(cartFetching());
      const answer = await clientBuilderManager.requestCurrentBuilder
        .me()
        .activeCart()
        .get()
        .execute();
      dispatch(cartFetchSuccess(answer.body));
      await dispatch(
        fetchRemoveProductFromCart(answer.body, lineItemId, quantity),
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

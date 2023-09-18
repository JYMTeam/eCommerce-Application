import { AppDispatch } from "..";
import {
  ErrorResponse,
  ClientResponse,
  Cart,
  DiscountCode,
} from "@commercetools/platform-sdk";
import {
  promocodeFetching,
  promocodeFetchSuccess,
  promocodeFetchError,
} from "../slices/promocodeSlice";
// import { getApiEntryRoot } from "../../commercetools-sdk/builders/ClientBuilderEntry";
import { clientBuilderManager } from "../../commercetools-sdk/builders/ClientBuilderManager";
import {
  cartFetchError,
  cartFetchSuccess,
  cartFetching,
} from "../slices/cartSlice";
import { NOTIFICATION_MESSAGES } from "../../constants/constants";
import { INotification, notificationActive } from "../slices/notificationSlice";
import { formatProductsErrorMessage } from "../../commercetools-sdk/errors/errors";

export const fetchPromocode = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(promocodeFetching());

      const answer = await clientBuilderManager.requestCurrentBuilder
        .discountCodes()
        //.withId({ ID: id })
        .get()
        .execute();

      dispatch(promocodeFetchSuccess(answer.body));
      console.log(answer.body);
    } catch (err) {
      const error = err as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(promocodeFetchError(body));
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
                code: promocode as unknown as string,
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

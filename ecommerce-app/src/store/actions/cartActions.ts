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
import { anonymRoot } from "../../commercetools-sdk/builders/ClientBuilderAnonym";
import { getApiAnonymTokenRoot } from "../../commercetools-sdk/builders/ClientBuilderAnonymWithExistingToken";
import { anonymTokenCache } from "../../commercetools-sdk/PassTokenCache/PassTokenCache";
import { getApiTokenRoot } from "../../commercetools-sdk/builders/ClientBuilderWithExistingToken";

export const fetchCreateCart = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(cartFetching());
      const answer = await anonymRoot
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
      // console.log(anonymTokenCache);
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

// export const fetchCreateLoginCart = (existingToken: string, cart?: Cart) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       dispatch(cartFetching());
//       const answer = await getApiTokenRoot(existingToken)
//       .me()
//       .carts()
//       .post({
//         body: {
//           currency: "USD",
//           country: "US"
//         }
//       })
//       .execute();
//       console.log('answer cart added');
//       console.log(answer);
//       dispatch(
//         cartFetchSuccess(
//           answer.body,
//         ),
//       );
//     } catch (e) {
//       const error = e as ClientResponse<ErrorResponse>;
//       const body = error.body;
//       if (body) {
//         dispatch(cartFetchError(body));
//       }
//     }
//   };
// };

export const fetchAddProductsCart = (
  cart: Cart,
  product: ProductProjection,
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(cartFetching());
      if (anonymTokenCache) {
        const answer = await getApiAnonymTokenRoot(anonymTokenCache.get().token)
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
                  quantity: 2,
                },
              ],
            },
          })
          .execute();
        console.log("answer products added");
        console.log(answer);
        dispatch(cartFetchSuccess(answer.body));
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

export const fetchGetCart = (existingToken: string) => {
  // console.log('get cart with Token');
  // console.log(existingToken);
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
    }
  };
};

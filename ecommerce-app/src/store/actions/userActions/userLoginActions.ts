import {
  ClientResponse,
  TokenStore,
  UserAuthOptions,
} from "@commercetools/sdk-client-v2";
import { AppDispatch } from "../..";
import {
  userLoginFetchError,
  userLoginFetchSuccess,
  userLoginFetching,
  setUserToken,
  userLoginReset,
  setIsSuccess,
} from "../../slices/userLoginSlice";
import {
  anonymTokenCache,
  passToken,
} from "../../../commercetools-sdk/PassTokenCache/PassTokenCache";
import { AuthErrorResponse, ErrorResponse } from "@commercetools/platform-sdk";
import {
  INotification,
  notificationActive,
} from "../../slices/notificationSlice";
import {
  cartFetchError,
  cartReset,
  setAnonymToken,
} from "../../slices/cartSlice";
import { fetchGetCart } from "../cartActions/cartActions";
import { NOTIFICATION_MESSAGES } from "../../../constants/constants";
import { clientBuilderManager } from "../../../commercetools-sdk/builders/ClientbuilderManager";

export const fetchUserLogin = (
  userAuthOptions: UserAuthOptions,
  existingAnonymToken?: string,
  signupMode?: boolean,
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userLoginFetching());
      if (existingAnonymToken) {
        const cache: TokenStore = {
          token: "",
          expirationTime: 0,
          refreshToken: undefined,
        };
        passToken.set({ ...cache });
        await dispatch(setUserToken(cache));

        if (existingAnonymToken && signupMode) {
          await clientBuilderManager.switchToRefreshTokenFlow(
            existingAnonymToken,
          );
        }
        await clientBuilderManager.requestCurrentBuilder
          .me()
          .login()
          .post({
            body: {
              email: userAuthOptions.username,
              password: userAuthOptions.password,
              activeCartSignInMode: "MergeWithExistingCustomerCart",
            },
          })
          .execute();

        anonymTokenCache.set({ ...cache });
        await dispatch(setAnonymToken(cache));
        await clientBuilderManager.switchToPasswordFlow(userAuthOptions);
        const answer2 = await clientBuilderManager.requestCurrentBuilder
          .me()
          .get()
          .execute();
        const refreshToken = passToken.get().refreshToken;

        if (refreshToken) {
          await clientBuilderManager.switchToRefreshTokenFlow(refreshToken);
        }
        dispatch(setIsSuccess());

        const successLoginMessage: INotification = {
          message: NOTIFICATION_MESSAGES.SUCCESS_LOGIN,
          type: "success",
        };
        dispatch(userLoginFetchSuccess(answer2.body));
        dispatch(setUserToken(passToken.get()));
        dispatch(notificationActive(successLoginMessage));
      } else {
        dispatch(userLoginFetching());
        const cache: TokenStore = {
          token: "",
          expirationTime: 0,
          refreshToken: undefined,
        };
        passToken.set({ ...cache });
        await dispatch(setUserToken(cache));

        await clientBuilderManager.switchToPasswordFlow(userAuthOptions);
        const answer = await clientBuilderManager.requestCurrentBuilder
          .me()
          .login()
          .post({
            body: {
              email: userAuthOptions.username,
              password: userAuthOptions.password,
            },
          })
          .execute();
        dispatch(setIsSuccess());
        const refreshToken = passToken.get().refreshToken;
        if (refreshToken) {
          await clientBuilderManager.switchToRefreshTokenFlow(refreshToken);
        }

        const successLoginMessage: INotification = {
          message: "You have successfully logged in!",
          type: "success",
        };

        dispatch(userLoginFetchSuccess(answer.body.customer));
        dispatch(setUserToken(passToken.get()));
        dispatch(notificationActive(successLoginMessage));
      }

      try {
        await dispatch(fetchGetCart());
      } catch (cartError) {
        const error = cartError as ClientResponse<ErrorResponse>;
        const body = error.body;
        if (body) {
          dispatch(cartFetchError(body));
        }
      }
    } catch (loginError) {
      const error = loginError as ClientResponse<AuthErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(userLoginFetchError(body));
      }
    }
  };
};

export const fetchLoginWithToken = (existingRefreshToken: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userLoginFetching());
      await clientBuilderManager.switchToRefreshTokenFlow(existingRefreshToken);
      const answer = await clientBuilderManager.requestCurrentBuilder
        .me()
        .get()
        .execute();
      dispatch(userLoginFetchSuccess(answer.body));
      // dispatch(fetchGetCart(existingToken.token));
    } catch (e) {
      const error = e as ClientResponse<AuthErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(userLoginReset());
      }
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoginReset());
    dispatch(cartReset());
  };
};

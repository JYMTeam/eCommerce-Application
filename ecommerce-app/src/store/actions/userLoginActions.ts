import {
  ClientResponse,
  TokenStore,
  // HttpErrorType,
  UserAuthOptions,
} from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import {
  userLoginFetchError,
  userLoginFetchSuccess,
  userLoginFetching,
  setUserToken,
  userLoginReset,
} from "../slices/userLoginSlice";
import { getApiPassRoot } from "../../commercetools-sdk/builders/ClientBuilderWithPass";
import { passToken } from "../../commercetools-sdk/PassTokenCache";
import { AuthErrorResponse } from "@commercetools/platform-sdk";
import { getApiTokenRoot } from "../../commercetools-sdk/builders/ClinetBuilderWithExistingToken";

export const fetchUserLogin = (userAuthOptions: UserAuthOptions) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userLoginFetching());

      const answer = await getApiPassRoot(userAuthOptions)
        .me()
        .login()
        .post({
          body: {
            email: userAuthOptions.username,
            password: userAuthOptions.password,
          },
        })
        .execute();

      dispatch(userLoginFetchSuccess(answer.body.customer));
      dispatch(setUserToken(passToken.get()));
    } catch (e) {
      const error = e as ClientResponse<AuthErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(userLoginFetchError(body));
      }
    }
  };
};

export const fetchUserLoginToken = (existingToken: TokenStore) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userLoginFetching());

      const answer = await getApiTokenRoot(existingToken.token)
        .me()
        .get()
        .execute();

      dispatch(userLoginFetchSuccess(answer.body));
      dispatch(setUserToken(existingToken));
    } catch (e) {
      const error = e as ClientResponse<AuthErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(userLoginReset());
        // dispatch(userLoginFetchError(body));
      }
    }
  };
};

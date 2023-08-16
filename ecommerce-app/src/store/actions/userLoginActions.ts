import {
  ClientResponse,
  HttpErrorType,
  UserAuthOptions,
} from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import {
  userLoginFetchError,
  userLoginFetchSuccess,
  userLoginFetching,
  setUserToken,
} from "../slices/userLoginSlice";
import { getApiPassRoot } from "../../commercetools-sdk/clientBuilders/ClientBuilderWithPass";
import { passToken } from "../../commercetools-sdk/PassTokenCache";

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
      const error = e as ClientResponse<HttpErrorType>;
      const body = error.body;
      if (body) {
        dispatch(userLoginFetchError(body));
      }
    }
  };
};

import { getApiRoot, projectKey } from "../../commercetools-sdk/ClientBuilder";
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
} from "../slices/userLoginSlice";
import { getApiPassRoot } from "../../commercetools-sdk/ClientBuilderWithPass";

export const fetchUserLogin = (userAuthOptions: UserAuthOptions) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userLoginFetching());

      const answer = await getApiRoot()
        .withProjectKey({ projectKey })
        .me()
        .login()
        .post({
          body: {
            email: userAuthOptions.username,
            password: userAuthOptions.password,
          },
        })
        .execute();
      getApiPassRoot(userAuthOptions);
      dispatch(userLoginFetchSuccess(answer.body.customer));
    } catch (e) {
      const error = e as ClientResponse<HttpErrorType>;
      const body = error.body;
      if (body) {
        dispatch(userLoginFetchError(body));
      }
    }
  };
};

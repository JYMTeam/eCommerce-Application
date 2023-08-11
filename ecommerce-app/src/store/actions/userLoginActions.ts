import { projectKey } from "../../commercetools-sdk/ClientBuilder";
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
import { getApiTokenRoot } from "../../commercetools-sdk/ClinetBuilderWithRefreshToken";
import { myToken } from "../../commercetools-sdk/MyTokenCache";

export const fetchUserLogin = (userAuthOptions: UserAuthOptions) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userLoginFetching());

      const answer = await getApiPassRoot(userAuthOptions)
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

      console.log("myToken");
      console.log(myToken.get().token);
      const answer2 = await getApiTokenRoot()
        .withProjectKey({ projectKey })
        .me()
        .get()
        .execute();
      const answer3 = await getApiTokenRoot()
        .withProjectKey({ projectKey })
        .me()
        .get()
        .execute();
      console.log("next responses with token");
      console.log(answer2, answer3);
      dispatch(userLoginFetchSuccess(answer.body.customer));
    } catch (e) {
      const error = e as ClientResponse<HttpErrorType>;
      const body = error.body;
      console.log(e);
      if (body) {
        dispatch(userLoginFetchError(body));
      }
    }
  };
};

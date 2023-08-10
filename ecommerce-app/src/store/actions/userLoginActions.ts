import { projectKey } from "../../commercetools-sdk/ClientBuilder";
import { ClientResponse, UserAuthOptions } from "@commercetools/sdk-client-v2";
import { IErrorResponse } from "../../models/errorModels";
import { AppDispatch } from "..";
import {
  userLoginFetchError,
  userLoginFetchSuccess,
  userLoginFetching,
} from "../slices/userLoginSlice";
import { getApiPassRoot } from "../../commercetools-sdk/ClientBuilderWithPass";

export const fetchUserLogin = (existingUser: UserAuthOptions) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userLoginFetching());
      // const answer = await getApiRoot()
      //   .withProjectKey({projectKey})
      //   .me()
      //   .login()
      //   // .post({
      //   //   body: existingUser
      //   // })
      //   .execute();

      // const apiPassRoot = getApiPassRoot(existingUser);
      const answer2 = await getApiPassRoot(existingUser)
        .withProjectKey({ projectKey })
        .me()
        .get()
        .execute();
      dispatch(userLoginFetchSuccess(answer2.body));
    } catch (e) {
      const error = e as ClientResponse<IErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(userLoginFetchError(body));
      }
    }
  };
};

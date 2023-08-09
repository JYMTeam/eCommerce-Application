import { MyCustomerDraft } from "@commercetools/platform-sdk";
import { getApiRoot, projectKey } from "../../commercetools-sdk/ClientBuilder";
import { ClientResponse } from "@commercetools/sdk-client-v2";
import { IErrorResponse } from "../../models/errorModels";
import { AppDispatch } from "..";
import {
  userLoginFetchError,
  userLoginFetchSuccess,
  userLoginFetching,
} from "../slices/userLoginSlice";

export const fetchUserLogin = (existingUser: MyCustomerDraft) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userLoginFetching());
      const answer = await getApiRoot()
        .withProjectKey({ projectKey })
        .me()
        .login()
        .post({
          body: existingUser,
        })
        .execute();
      dispatch(userLoginFetchSuccess(answer.body));
    } catch (e) {
      const error = e as ClientResponse<IErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(userLoginFetchError(body));
      }
    }
  };
};

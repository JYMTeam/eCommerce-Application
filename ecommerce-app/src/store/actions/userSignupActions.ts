import { ClientResponse, HttpErrorType } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import { getApiAnonymRoot } from "../../commercetools-sdk/ClientBuilderAnonym";
import { MyCustomerDraft } from "@commercetools/platform-sdk";
import {
  userSignupFetchError,
  userSignupFetchSuccess,
  userSignupFetching,
} from "../slices/userSignupSlice";

export const fetchUserSignup = (userSignupOptions: MyCustomerDraft) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userSignupFetching());

      const answer = await getApiAnonymRoot()
        .me()
        .signup()
        .post({
          body: userSignupOptions,
        })
        .execute();

      dispatch(userSignupFetchSuccess(answer.body));
    } catch (e) {
      const error = e as ClientResponse<HttpErrorType>;
      const body = error.body;
      if (body) {
        dispatch(userSignupFetchError(body));
      }
    }
  };
};

import {
  ClientResponse,
  HttpErrorType,
  UserAuthOptions,
} from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import { CustomerDraft } from "@commercetools/platform-sdk";
import {
  userSignupFetchError,
  userSignupFetchSuccess,
  userSignupFetching,
} from "../slices/userSignupSlice";
import { fetchUserLogin } from "./userLoginActions";
import { getApiSignupRoot } from "../../commercetools-sdk/builders/ClientBuilderSignup";

export const fetchUserSignup = (userSignupOptions: CustomerDraft) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userSignupFetching());

      const answer = await getApiSignupRoot()
        .customers()
        .post({
          body: userSignupOptions,
        })
        .execute();

      dispatch(userSignupFetchSuccess(answer.body));

      const { email, password } = userSignupOptions;
      if (email && password) {
        const existingUser: UserAuthOptions = {
          username: userSignupOptions.email,
          password,
        };
        dispatch(fetchUserLogin(existingUser));
      }
    } catch (e) {
      const error = e as ClientResponse<HttpErrorType>;
      const body = error.body;
      if (body) {
        dispatch(userSignupFetchError(body));
      }
    }
  };
};

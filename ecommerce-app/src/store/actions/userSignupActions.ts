import { ClientResponse } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import { AuthErrorResponse, CustomerDraft } from "@commercetools/platform-sdk";
import {
  userSignupFetchError,
  userSignupFetchSuccess,
  userSignupFetching,
} from "../slices/userSignupSlice";
import { fetchUserLogin } from "./userLoginActions";
import { getApiSignupRoot } from "../../commercetools-sdk/builders/ClientBuilderSignup";
import { convertCustomerDraftToUserAuthOptions } from "../../utils/utils";

export const fetchUserSignup = (userSignupOptions: CustomerDraft) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userSignupFetching());

      //signup
      await getApiSignupRoot()
        .customers()
        .post({
          body: userSignupOptions,
        })
        .execute();
      dispatch(userSignupFetchSuccess());

      //login
      const existingUser =
        convertCustomerDraftToUserAuthOptions(userSignupOptions);
      if (existingUser) {
        dispatch(fetchUserLogin(existingUser));
      }
    } catch (e) {
      const error = e as ClientResponse<AuthErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(userSignupFetchError(body));
      }
    }
  };
};

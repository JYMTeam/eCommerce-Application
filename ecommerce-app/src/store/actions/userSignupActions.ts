import { ClientResponse } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import { AuthErrorResponse, CustomerDraft } from "@commercetools/platform-sdk";
import {
  userSignupFetchError,
  userSignupFetchSuccess,
  userSignupFetching,
} from "../slices/userSignupSlice";
import { fetchUserLogin } from "./userLoginActions";
import { apiSignupRoot } from "../../commercetools-sdk/builders/ClientBuilderSignup";
import { convertCustomerDraftToUserAuthOptions } from "../../utils/utils";
import { INotification, notificationActive } from "../slices/notificationSlice";

export const fetchUserSignup = (userSignupOptions: CustomerDraft) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userSignupFetching());

      //signup
      await apiSignupRoot
        .customers()
        .post({
          body: userSignupOptions,
        })
        .execute();
      dispatch(userSignupFetchSuccess());
      const successMessage: INotification = {
        message: "You have successfully signed up",
        type: "success",
      };
      // setTimeout(() => {
      dispatch(notificationActive(successMessage));
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

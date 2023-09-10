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
import { INotification, notificationActive } from "../slices/notificationSlice";
import { NOTIFICATION_MESSAGES } from "../../constants/constants";

export const fetchUserSignup = (
  userSignupOptions: CustomerDraft,
  existingAnonymToken?: string,
) => {
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
      const successMessage: INotification = {
        message: NOTIFICATION_MESSAGES.SUCCESS_SIGNUP,
        type: "success",
      };
      dispatch(notificationActive(successMessage));
      const existingUser =
        convertCustomerDraftToUserAuthOptions(userSignupOptions);
      if (existingUser) {
        if (existingAnonymToken) {
          dispatch(fetchUserLogin(existingUser, existingAnonymToken));
        } else {
          dispatch(fetchUserLogin(existingUser));
        }
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

import { ClientResponse } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "../..";
import { AuthErrorResponse, CustomerDraft } from "@commercetools/platform-sdk";
import {
  userSignupFetchError,
  userSignupFetchSuccess,
  userSignupFetching,
} from "../../slices/userSignupSlice";
import { fetchUserLogin } from "./userLoginActions";
import { convertCustomerDraftToUserAuthOptions } from "../../../utils/utils";
import {
  INotification,
  notificationActive,
} from "../../slices/notificationSlice";
import { NOTIFICATION_MESSAGES } from "../../../constants/constants";
import { clientBuilderManager } from "../../../commercetools-sdk/builders/ClientBuilderManager";

export const fetchUserSignup = (
  userSignupOptions: CustomerDraft,
  existingAnonymToken?: string,
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userSignupFetching());
      const userAuthOptions =
        convertCustomerDraftToUserAuthOptions(userSignupOptions);

      await clientBuilderManager.switchToSignupFlow();
      //signup
      await clientBuilderManager.requestCurrentBuilder
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
      if (userAuthOptions) {
        if (existingAnonymToken) {
          console.log("anonym token after sign up");
          console.log(existingAnonymToken);
          dispatch(fetchUserLogin(userAuthOptions, existingAnonymToken, true));
        } else {
          dispatch(fetchUserLogin(userAuthOptions));
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

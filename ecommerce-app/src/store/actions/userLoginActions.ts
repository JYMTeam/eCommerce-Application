import {
  ClientResponse,
  TokenStore,
  UserAuthOptions,
} from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import {
  userLoginFetchError,
  userLoginFetchSuccess,
  userLoginFetching,
  setUserToken,
  userLoginReset,
  setIsSuccess,
} from "../slices/userLoginSlice";
import { getApiPassRoot } from "../../commercetools-sdk/builders/ClientBuilderWithPass";
import { passToken } from "../../commercetools-sdk/PassTokenCache/PassTokenCache";
import {
  AuthErrorResponse,
  Customer,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from "@commercetools/platform-sdk";
import { getApiTokenRoot } from "../../commercetools-sdk/builders/ClientBuilderWithExistingToken";
import { IUpdatePersonalValues } from "../../types";

export const fetchUserLogin = (userAuthOptions: UserAuthOptions) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userLoginFetching());
      const answer = await getApiPassRoot(userAuthOptions)
        .me()
        .login()
        .post({
          body: {
            email: userAuthOptions.username,
            password: userAuthOptions.password,
          },
        })
        .execute();
      dispatch(setIsSuccess());
      setTimeout(() => {
        dispatch(userLoginFetchSuccess(answer.body.customer));
        dispatch(setUserToken(passToken.get()));
      }, 1500);
    } catch (e) {
      const error = e as ClientResponse<AuthErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(userLoginFetchError(body));
      }
    }
  };
};

export const fetchLoginWithToken = (existingToken: TokenStore) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userLoginFetching());

      const answer = await getApiTokenRoot(existingToken.token)
        .me()
        .get()
        .execute();

      dispatch(userLoginFetchSuccess(answer.body));
    } catch (e) {
      const error = e as ClientResponse<AuthErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(userLoginReset());
      }
    }
  };
};

export const fetchUpdateUserPersonalInfo = (
  existingToken: TokenStore,
  userCurrentData: Customer,
  userUpdatedData: IUpdatePersonalValues,
) => {
  const { email, firstName, lastName, dateOfBirth } = userUpdatedData;

  const actions: MyCustomerUpdateAction[] = [
    { action: "changeEmail", email },
    { action: "setDateOfBirth", dateOfBirth },
    { action: "setFirstName", firstName },
    { action: "setLastName", lastName },
  ];
  const updateCustomer: MyCustomerUpdate = {
    version: userCurrentData.version,
    actions,
  };
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userLoginFetching());
      const answer = await getApiTokenRoot(existingToken.token)
        .me()
        .post({
          body: updateCustomer,
        })
        .execute();
      dispatch(setIsSuccess());
      // setTimeout(() => {
      dispatch(userLoginFetchSuccess(answer.body));
      // }, 1500);
    } catch (e) {
      const error = e as ClientResponse<AuthErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(userLoginFetchError(body));
      }
    }
  };
};

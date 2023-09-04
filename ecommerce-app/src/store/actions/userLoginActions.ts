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
import {
  IUpdateAddressInitialValues,
  IUpdatePersonalValues,
} from "../../types";
import { INotification, notificationActive } from "../slices/notificationSlice";

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

      const successLoginMessage: INotification = {
        message: "You have successfully logged in!",
        type: "success",
      };

      dispatch(userLoginFetchSuccess(answer.body.customer));
      dispatch(setUserToken(passToken.get()));
      dispatch(notificationActive(successLoginMessage));
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
      dispatch(userLoginFetchSuccess(answer.body));
      const successUpdateMessage: INotification = {
        message: "Your data has been successfully updated",
        type: "success",
      };
      dispatch(notificationActive(successUpdateMessage));
    } catch (e) {
      const error = e as ClientResponse<AuthErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(userLoginFetchError(body));
      }
    }
  };
};

export const fetchUpdateUserAddress = (
  existingToken: TokenStore,
  userCurrentData: Customer,
  addressArrIndex: number,
  values: IUpdateAddressInitialValues,
) => {
  const {
    streetName,
    city,
    country,
    postalCode,
    isBilling,
    isShipping,
    isDefaultBilling,
    isDefaultShipping,
  } = values;
  const actions: MyCustomerUpdateAction[] = [
    {
      action: "changeAddress",
      addressId: userCurrentData.addresses[addressArrIndex].id,
      address: {
        country,
        streetName,
        postalCode,
        city,
        // state: "NEWSTATE"
      },
    },
  ];
  if (isDefaultBilling) {
    actions.push({
      action: "setDefaultBillingAddress",
      addressId: userCurrentData.addresses[addressArrIndex].id,
    });
  } else if (
    userCurrentData.addresses[addressArrIndex].id ===
    userCurrentData.defaultBillingAddressId
  ) {
    actions.push({
      action: "setDefaultBillingAddress",
      addressId: undefined,
    });
  }

  if (isDefaultShipping) {
    actions.push({
      action: "setDefaultShippingAddress",
      addressId: userCurrentData.addresses[addressArrIndex].id,
    });
  } else if (
    userCurrentData.addresses[addressArrIndex].id ===
    userCurrentData.defaultShippingAddressId
  ) {
    actions.push({
      action: "setDefaultShippingAddress",
      addressId: undefined,
    });
  }

  if (isBilling) {
    actions.push({
      action: "addBillingAddressId",
      addressId: userCurrentData.addresses[addressArrIndex].id,
    });
  } else {
    actions.push({
      action: "removeBillingAddressId",
      addressId: userCurrentData.addresses[addressArrIndex].id,
    });
  }

  if (isShipping) {
    actions.push({
      action: "addShippingAddressId",
      addressId: userCurrentData.addresses[addressArrIndex].id,
    });
  } else {
    actions.push({
      action: "removeShippingAddressId",
      addressId: userCurrentData.addresses[addressArrIndex].id,
    });
  }
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
      dispatch(userLoginFetchSuccess(answer.body));
      const successUpdateMessage: INotification = {
        message: "Your data has been successfully updated",
        type: "success",
      };
      dispatch(notificationActive(successUpdateMessage));
    } catch (e) {
      const error = e as ClientResponse<AuthErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(userLoginFetchError(body));
      }
    }
  };
};

export const fetchDeleteUserAddress = (
  existingToken: TokenStore,
  userCurrentData: Customer,
  addressArrIndex: number,
) => {
  const actions: MyCustomerUpdateAction[] = [
    {
      action: "removeAddress",
      addressId: userCurrentData.addresses[addressArrIndex].id,
    },
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
      dispatch(userLoginFetchSuccess(answer.body));
      const successUpdateMessage: INotification = {
        message: "Your address has been successfully deleted",
        type: "success",
      };
      dispatch(notificationActive(successUpdateMessage));
    } catch (e) {
      const error = e as ClientResponse<AuthErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(userLoginFetchError(body));
      }
    }
  };
};

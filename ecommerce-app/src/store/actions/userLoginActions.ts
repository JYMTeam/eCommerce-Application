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
import {
  anonymTokenCache,
  passToken,
} from "../../commercetools-sdk/PassTokenCache/PassTokenCache";
import {
  AuthErrorResponse,
  Customer,
  ErrorResponse,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from "@commercetools/platform-sdk";
import { getApiTokenRoot } from "../../commercetools-sdk/builders/ClientBuilderWithExistingToken";
import {
  IUpdateAddressInitialValues,
  IUpdatePersonalValues,
} from "../../types";
import { INotification, notificationActive } from "../slices/notificationSlice";
import { cartFetchError, cartReset } from "../slices/cartSlice";
import { fetchGetCart } from "./cartActions";
import { NOTIFICATION_MESSAGES } from "../../constants/constants";
import { getApiRefreshTokenRoot } from "../../commercetools-sdk/builders/ClientBuilderWithRefreshToken";

export const fetchUserLogin = (
  userAuthOptions: UserAuthOptions,
  existingAnonymToken?: string,
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userLoginFetching());
      if (existingAnonymToken) {
        const cache: TokenStore = {
          token: "",
          expirationTime: 0,
          refreshToken: undefined,
        };
        passToken.set({ ...cache });

        const apiRoot = getApiTokenRoot(existingAnonymToken);
        const bodyParams = {
          activeCartSignInMode: "MergeWithExistingCustomerCart",
          // updateProductData: true,
        };

        const answer = await apiRoot
          .me()
          .login()
          .post({
            body: {
              email: userAuthOptions.username,
              password: userAuthOptions.password,
              ...bodyParams,
            },
          })
          .execute();
        console.log(answer);
        // dispatch(setIsSuccess());

        anonymTokenCache.set({ ...cache });
        const answer2 = await getApiPassRoot(userAuthOptions)
          .me()
          .get()
          .execute();
        dispatch(setIsSuccess());

        const successLoginMessage: INotification = {
          message: NOTIFICATION_MESSAGES.SUCCESS_LOGIN,
          type: "success",
        };
        dispatch(userLoginFetchSuccess(answer2.body));
        // if (!existingAnonymToken) {
        dispatch(setUserToken(passToken.get()));
        // dispatch(fetchGetCart(passToken.get().token));
        // } else {
        // dispatch(fetchGetCart(existingAnonymToken));

        // }
        console.log("token after login");
        // console.log(passToken.get());
        console.log(anonymTokenCache.get());
        console.log(passToken.get());
        dispatch(notificationActive(successLoginMessage));
      } else {
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
      }

      try {
        await dispatch(fetchGetCart(passToken.get().token));
      } catch (cartError) {
        const error = cartError as ClientResponse<ErrorResponse>;
        const body = error.body;
        if (body) {
          dispatch(cartFetchError(body));
        }
      }
    } catch (loginError) {
      const error = loginError as ClientResponse<AuthErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(userLoginFetchError(body));
      }
    }
  };
};

export const fetchLoginWithToken = (existingRefreshToken: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userLoginFetching());

      const answer = await getApiRefreshTokenRoot(existingRefreshToken)
        .me()
        .get()
        .execute();
      const answer2 = await getApiRefreshTokenRoot(existingRefreshToken)
        .me()
        .get()
        .execute();
      const answer3 = await getApiRefreshTokenRoot(existingRefreshToken)
        .me()
        .get()
        .execute();
      dispatch(userLoginFetchSuccess(answer.body));
      console.log(answer, answer2, answer3);
      // dispatch(fetchGetCart(existingToken.token));
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
        message: NOTIFICATION_MESSAGES.SUCCESS_DATA_UPDATE,
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
    state,
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
        state,
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
  } else if (
    userCurrentData.billingAddressIds?.includes(
      userCurrentData.addresses[addressArrIndex].id || "",
    )
  ) {
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
  } else if (
    userCurrentData.shippingAddressIds?.includes(
      userCurrentData.addresses[addressArrIndex].id || "",
    )
  ) {
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
        message: NOTIFICATION_MESSAGES.SUCCESS_DATA_UPDATE,
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

export const fetchCreateUserAddress = (
  existingToken: TokenStore,
  userCurrentData: Customer,
  values: IUpdateAddressInitialValues,
) => {
  const {
    streetName,
    city,
    state,
    country,
    postalCode,
    isBilling,
    isShipping,
    isDefaultBilling,
    isDefaultShipping,
  } = values;
  const actions: MyCustomerUpdateAction[] = [
    {
      action: "addAddress",
      address: {
        country,
        streetName,
        postalCode,
        city,
        state,
      },
    },
  ];
  const createAddressCustomer: MyCustomerUpdate = {
    version: userCurrentData.version,
    actions,
  };

  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userLoginFetching());
      const answerAddress = await getApiTokenRoot(existingToken.token)
        .me()
        .post({
          body: createAddressCustomer,
        })
        .execute();
      if (isBilling || isShipping || isDefaultBilling || isDefaultShipping) {
        const updateFlagsCustomer = updateShippingBillingFlags(
          answerAddress.body,
          values,
        );
        const answerFlags = await getApiTokenRoot(existingToken.token)
          .me()
          .post({
            body: updateFlagsCustomer,
          })
          .execute();
        dispatch(userLoginFetchSuccess(answerFlags.body));
      } else {
        dispatch(userLoginFetchSuccess(answerAddress.body));
      }

      const successUpdateMessage: INotification = {
        message: NOTIFICATION_MESSAGES.SUCCESS_ADDRESS_CREATE,
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

const updateShippingBillingFlags = (
  userCurrentData: Customer,
  values: IUpdateAddressInitialValues,
) => {
  const { isBilling, isShipping, isDefaultBilling, isDefaultShipping } = values;
  const actions: MyCustomerUpdateAction[] = [];
  const addressArrIndex = userCurrentData.addresses.length - 1;

  if (isDefaultBilling) {
    actions.push({
      action: "setDefaultBillingAddress",
      addressId: userCurrentData.addresses[addressArrIndex].id,
    });
  }

  if (isDefaultShipping) {
    actions.push({
      action: "setDefaultShippingAddress",
      addressId: userCurrentData.addresses[addressArrIndex].id,
    });
  }

  if (isBilling) {
    actions.push({
      action: "addBillingAddressId",
      addressId: userCurrentData.addresses[addressArrIndex].id,
    });
  }

  if (isShipping) {
    actions.push({
      action: "addShippingAddressId",
      addressId: userCurrentData.addresses[addressArrIndex].id,
    });
  }
  const updateFlagsCustomer: MyCustomerUpdate = {
    version: userCurrentData.version,
    actions,
  };

  return updateFlagsCustomer;
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
        message: NOTIFICATION_MESSAGES.SUCCESS_ADDRESS_REMOVE,
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

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoginReset());
    dispatch(cartReset());
  };
};

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
import {
  IUpdateAddressInitialValues,
  IUpdatePersonalValues,
} from "../../types";
import { INotification, notificationActive } from "../slices/notificationSlice";
import { cartFetchError, cartReset, setAnonymToken } from "../slices/cartSlice";
import { fetchGetCart } from "./cartActions";
import { NOTIFICATION_MESSAGES } from "../../constants/constants";
import { clientBuilderManager } from "../../commercetools-sdk/builders/ClientbuilderManager";

export const fetchUserLogin = (
  userAuthOptions: UserAuthOptions,
  existingAnonymToken?: string,
  signupMode?: boolean,
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
        await dispatch(setUserToken(cache));

        if (existingAnonymToken && signupMode) {
          await clientBuilderManager.switchToRefreshTokenFlow(
            existingAnonymToken,
          );
        }
        await clientBuilderManager.requestCurrentBuilder
          .me()
          .login()
          .post({
            body: {
              email: userAuthOptions.username,
              password: userAuthOptions.password,
              activeCartSignInMode: "MergeWithExistingCustomerCart",
            },
          })
          .execute();

        anonymTokenCache.set({ ...cache });
        await dispatch(setAnonymToken(cache));
        await clientBuilderManager.switchToPasswordFlow(userAuthOptions);
        const answer2 = await clientBuilderManager.requestCurrentBuilder
          .me()
          .get()
          .execute();
        const refreshToken = passToken.get().refreshToken;

        if (refreshToken) {
          await clientBuilderManager.switchToRefreshTokenFlow(refreshToken);
        }
        dispatch(setIsSuccess());

        const successLoginMessage: INotification = {
          message: NOTIFICATION_MESSAGES.SUCCESS_LOGIN,
          type: "success",
        };
        dispatch(userLoginFetchSuccess(answer2.body));
        dispatch(setUserToken(passToken.get()));
        dispatch(notificationActive(successLoginMessage));
      } else {
        dispatch(userLoginFetching());
        const cache: TokenStore = {
          token: "",
          expirationTime: 0,
          refreshToken: undefined,
        };
        passToken.set({ ...cache });
        await dispatch(setUserToken(cache));

        await clientBuilderManager.switchToPasswordFlow(userAuthOptions);
        const answer = await clientBuilderManager.requestCurrentBuilder
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
        const refreshToken = passToken.get().refreshToken;
        if (refreshToken) {
          await clientBuilderManager.switchToRefreshTokenFlow(refreshToken);
        }

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
      await clientBuilderManager.switchToRefreshTokenFlow(existingRefreshToken);
      const answer = await clientBuilderManager.requestCurrentBuilder
        .me()
        .get()
        .execute();
      dispatch(userLoginFetchSuccess(answer.body));
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
      const answer = await clientBuilderManager.requestCurrentBuilder
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
      const answer = await clientBuilderManager.requestCurrentBuilder
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
      const answerAddress = await clientBuilderManager.requestCurrentBuilder
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
        const answerFlags = await clientBuilderManager.requestCurrentBuilder
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
      const answer = await clientBuilderManager.requestCurrentBuilder
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

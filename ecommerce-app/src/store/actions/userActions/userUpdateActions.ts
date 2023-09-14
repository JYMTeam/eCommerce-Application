import { ClientResponse } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "../..";
import {
  userLoginFetchError,
  userLoginFetchSuccess,
  userLoginFetching,
} from "../../slices/userLoginSlice";
import {
  AuthErrorResponse,
  Customer,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from "@commercetools/platform-sdk";
import {
  IUpdateAddressInitialValues,
  IUpdatePersonalValues,
} from "../../../types";
import {
  INotification,
  notificationActive,
} from "../../slices/notificationSlice";
import { NOTIFICATION_MESSAGES } from "../../../constants/constants";
import { clientBuilderManager } from "../../../commercetools-sdk/builders/ClientBuilderManager";

export const fetchUpdateUserPersonalInfo = (
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

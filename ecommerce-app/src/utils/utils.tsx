import { BaseAddress, CustomerDraft } from "@commercetools/platform-sdk";
import { IFormInitialValues, IRegistrationInitialValues } from "../types";
import { UserAuthOptions } from "@commercetools/sdk-client-v2";

export const subtractYears = (date: Date, years: number) => {
  date.setFullYear(date.getFullYear() - years);
  return date;
};

export const convertToUserAuthOptions = (values: IFormInitialValues) => {
  const { email, password } = values;

  const userAuthOptions: UserAuthOptions = {
    username: email,
    password,
  };

  return userAuthOptions;
};

export const convertToCustomerDraft = (values: IRegistrationInitialValues) => {
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    streetNameShipping,
    cityShipping,
    countryShipping,
    postalCodeShipping,
    streetNameBilling,
    cityBilling,
    countryBilling,
    postalCodeBilling,
    commonAddressCheck,
    defaultShippingCheck,
    defaultBillingCheck,
  } = values;

  const isCommonAddress = commonAddressCheck?.length !== 0;
  const isDefaultBilling = defaultBillingCheck?.length !== 0;
  const isDefaultShipping = defaultShippingCheck?.length !== 0;

  const addresses: BaseAddress[] = [];
  const shippingAddress: BaseAddress = convertToBaseAddress(
    countryShipping,
    cityShipping,
    streetNameShipping,
    postalCodeShipping,
  );
  const billingAddress: BaseAddress = convertToBaseAddress(
    countryBilling,
    cityBilling,
    streetNameBilling,
    postalCodeBilling,
  );

  let indexDefaultShipping = -1;
  let indexDefaultBilling = -1;

  const shippingAddresses: number[] = [];
  const billingAddresses: number[] = [];

  let newUser: CustomerDraft | null = null;

  // set shipping address
  addresses.push(shippingAddress);
  shippingAddresses.push(0);

  // set billing address
  if (!isCommonAddress) {
    addresses.push(billingAddress);
    billingAddresses.push(1);
  }
  if (isCommonAddress) billingAddresses.push(0);

  //set default addresses
  if (isDefaultShipping) indexDefaultShipping = 0;
  if (isCommonAddress && isDefaultShipping) indexDefaultBilling = 0;
  if (!isCommonAddress && isDefaultBilling) indexDefaultBilling = 1;

  if (indexDefaultShipping !== -1 && indexDefaultBilling !== -1) {
    newUser = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      shippingAddresses,
      billingAddresses,
      defaultShippingAddress: indexDefaultShipping,
      defaultBillingAddress: indexDefaultBilling,
    };
  } else if (indexDefaultShipping !== -1) {
    newUser = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      shippingAddresses,
      billingAddresses,
      defaultShippingAddress: indexDefaultShipping,
    };
  } else if (indexDefaultBilling !== -1) {
    newUser = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      shippingAddresses,
      billingAddresses,
      defaultBillingAddress: indexDefaultBilling,
    };
  } else {
    newUser = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      shippingAddresses,
      billingAddresses,
    };
  }

  return newUser;
};

const convertToBaseAddress = (
  country: string,
  city: string,
  streetName: string,
  postalCode: string,
) => {
  const address: BaseAddress = {
    country,
    city,
    streetName,
    postalCode,
  };

  return address;
};

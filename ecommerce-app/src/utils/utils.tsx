import { BaseAddress, CustomerDraft } from "@commercetools/platform-sdk";
import { IFormInitialValues, ISignupInitialValues } from "../types";
import { UserAuthOptions } from "@commercetools/sdk-client-v2";
import { DEFAULT_LOCALE } from "../constants/constants";

export const subtractYears = (date: Date, years: number) => {
  date.setFullYear(date.getFullYear() - years);
  return date;
};

export const convertCentsToUSD = (centAmount: number) => {
  return centAmount / 100;
};

export const convertUSDToCents = (usdAmount: number) => {
  return usdAmount * 100;
};

export const CURRENCY_CONVERTER = {
  USD: convertCentsToUSD,
};

export const CURRENCY_SIGN = {
  USD: "$",
  EUR: "€",
};

export const formatPrice = (centAmount: number, currencyCode: string) => {
  const convertedPrice =
    CURRENCY_CONVERTER[currencyCode as keyof typeof CURRENCY_CONVERTER](
      centAmount,
    );
  const formatedPrice = new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "currency",
    currency: currencyCode,
  }).format(convertedPrice);
  return formatedPrice;
};

// "YYYY-MM-DD" -> "MM/DD/YYYY"
export function formatDateYYYYMMDDToMMDDYYYY(dateString: string) {
  const parts = dateString.split("-");
  if (parts.length !== 3) return "";
  const [year, month, day] = parts;
  return `${month}/${day}/${year}`;
}

// "MM/DD/YYYY" -> "YYYY-MM-DD"
export function formatDateMMDDYYYYToYYYYMMDD(dateString: string) {
  const parts = dateString.split("/");
  if (parts.length !== 3) return "";
  const [month, day, year] = parts;
  return `${year}-${month}-${day}`;
}

export const convertCustomerDraftToUserAuthOptions = (
  customerDraft: CustomerDraft,
) => {
  const { email, password } = customerDraft;
  if (email && password) {
    const userAuthOptions: UserAuthOptions = {
      username: email,
      password,
    };
    return userAuthOptions;
  }

  return;
};

export const convertToUserAuthOptions = (values: IFormInitialValues) => {
  const { email, password } = values;

  const userAuthOptions: UserAuthOptions = {
    username: email,
    password,
  };

  return userAuthOptions;
};

export const convertToCustomerDraft = (values: ISignupInitialValues) => {
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

  //set newUser
  const newUserMainData: CustomerDraft = {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    addresses,
    shippingAddresses,
    billingAddresses,
  };

  newUser = getNewUser(
    newUserMainData,
    indexDefaultShipping,
    indexDefaultBilling,
  );

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

const getNewUser = (
  newUserMainData: CustomerDraft,
  indexDefaultShipping: number,
  indexDefaultBilling: number,
) => {
  let newUser: CustomerDraft = {
    ...newUserMainData,
  };

  if (indexDefaultShipping !== -1 && indexDefaultBilling !== -1) {
    newUser = {
      ...newUserMainData,
      defaultShippingAddress: indexDefaultShipping,
      defaultBillingAddress: indexDefaultBilling,
    };
  } else if (indexDefaultShipping !== -1) {
    newUser = {
      ...newUserMainData,
      defaultShippingAddress: indexDefaultShipping,
    };
  } else if (indexDefaultBilling !== -1) {
    newUser = {
      ...newUserMainData,
      defaultBillingAddress: indexDefaultBilling,
    };
  }

  return newUser;
};

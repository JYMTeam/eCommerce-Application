import { Image } from "@commercetools/platform-sdk";

export interface IFormInitialValues {
  email: string;
  password: string;
  passwordCheck?: string[];
}
export interface ISignupInitialValues extends IFormInitialValues {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  streetNameShipping: string;
  streetNameBilling: string;
  cityShipping: string;
  cityBilling: string;
  countryShipping: string;
  countryBilling: string;
  postalCodeShipping: string;
  postalCodeBilling: string;
  commonAddressCheck?: string[];
  defaultShippingCheck?: string[];
  defaultBillingCheck?: string[];
}
export interface IPostalCodes {
  validate: (countryCode: string, value: string) => {};
}
export interface ISignedUpSchemaOptions {
  countryCodeShipping: string;
  countryCodeBilling: string;
  postalCodeFormatShipping: string;
  postalCodeFormatBilling: string;
  isCommonAddressChecked: boolean;
}

export enum statusCode {
  "OK" = 200,
  "BAD_REQUEST" = 400,
  "UNATHORIZED" = 401,
  "NOT_FOUND" = 404,
  "TOO_MANY_REQUESTS" = 429,
  "SERVER_ERROR" = 500,
}
export interface ICountriesOptions {
  label: string;
  countryCode: string;
  postalCodeFormat: string;
}

export interface IProductsFormattedAttribute {
  name: string;
  values: string[];
}

export interface IParcedProduct {
  id: string;
  name: string;
  description: string;
  images: Image[];
  price: string;
}

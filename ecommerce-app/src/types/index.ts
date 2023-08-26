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
export interface ICountriesOptions {
  label: string;
  countryCode: string;
  postalCodeFormat: string;
}

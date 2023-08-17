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
  commonAdressCheck?: string[];
  defaultShippingCheck?: string[];
  defaultBillingCheck?: string[];
}

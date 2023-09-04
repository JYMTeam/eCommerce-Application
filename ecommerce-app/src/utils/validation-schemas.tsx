import { object, string } from "yup";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateStreetName,
  validateCity,
  validateDateOfBirth,
  validatePostalCode,
} from "./validation-rules";
import { ISignedUpSchemaOptions, IUpdateAddressSchemaOptions } from "../types";

const setSignupSchema = ({
  isCommonAddressChecked,
  countryCodeShipping,
  postalCodeFormatShipping,
  countryCodeBilling,
  postalCodeFormatBilling,
}: ISignedUpSchemaOptions) =>
  object().shape({
    email: validateEmail(),
    password: validatePassword(),
    firstName: validateName("First name"),
    lastName: validateName("Last name"),
    dateOfBirth: validateDateOfBirth(),
    cityShipping: validateCity(),
    streetNameShipping: validateStreetName(),
    countryShipping: string().required("Country is required"),

    streetNameBilling: isCommonAddressChecked
      ? string().notRequired()
      : validateStreetName(),

    cityBilling: isCommonAddressChecked
      ? string().notRequired()
      : validateCity(),

    countryBilling: isCommonAddressChecked
      ? string().notRequired()
      : string().required("Country is required"),

    postalCodeShipping: validatePostalCode(
      countryCodeShipping,
      postalCodeFormatShipping,
    ),
    postalCodeBilling: isCommonAddressChecked
      ? string().notRequired()
      : validatePostalCode(countryCodeBilling, postalCodeFormatBilling),
  });

const setLoginSchema = () => {
  return object().shape({
    email: validateEmail(),
    password: validatePassword(),
  });
};

const setUpdateUserInfoSchema = () => {
  return object().shape({
    firstName: validateName("First name"),
    lastName: validateName("Last name"),
    email: validateEmail(),
    dateOfBirth: validateDateOfBirth(),
  });
};

const setUpdateUserAddressSchema = ({
  countryCode,
  postalCodeFormat,
  isBillingAddress = false,
  isShippingAddress = false,
  isDefaultAddress = false,
}: IUpdateAddressSchemaOptions) => {
  console.log(isBillingAddress, isShippingAddress, isDefaultAddress);
  return object().shape({
    city: validateCity(),
    streetName: validateStreetName(),
    country: string().required("Country is required"),
    postalCode: validatePostalCode(countryCode, postalCodeFormat),
  });
};

export {
  setSignupSchema,
  setLoginSchema,
  setUpdateUserInfoSchema,
  setUpdateUserAddressSchema,
};

import { object, string } from "yup";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateStreetName,
  validateCity,
  validateDateOfBirth,
  validatePostalCode,
  validateState,
} from "./validation-rules";
import { ISignedUpSchemaOptions, IUpdateAddressSchemaOptions } from "../types";
import { USER_AGE_ALLOWED } from "../constants/constants";

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
    dateOfBirth: validateDateOfBirth(
      `You must be ${USER_AGE_ALLOWED} years old or above to register`,
    ),
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
    dateOfBirth: validateDateOfBirth(
      `You must be ${USER_AGE_ALLOWED} years old or above`,
    ),
  });
};

const setUpdateUserPasswordSchema = () => {
  return object().shape({
    currentPassword: validatePassword(),
    newPassword: validatePassword(),
  });
};

const setUpdateUserAddressSchema = ({
  countryCode,
  postalCodeFormat,
}: IUpdateAddressSchemaOptions) => {
  return object().shape({
    city: validateCity(),
    streetName: validateStreetName(),
    state: validateState(),
    country: string().required("Country is required"),
    postalCode: validatePostalCode(countryCode, postalCodeFormat),
  });
};

export {
  setSignupSchema,
  setLoginSchema,
  setUpdateUserInfoSchema,
  setUpdateUserPasswordSchema,
  setUpdateUserAddressSchema,
};

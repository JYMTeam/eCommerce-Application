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
import { ISignedUpSchemaOptions } from "../types";

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

export { setSignupSchema, setLoginSchema };

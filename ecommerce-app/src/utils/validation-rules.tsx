import {
  AT_SIGN_DOMAIN_REGEX,
  DIGIT_REGEX,
  LOWERCASE_LETTER_REGEX,
  MAX_HUMAN_AGE,
  NO_DIGIT_REGEX,
  NO_SPACE_REGEX,
  NO_SPECIAL_CHARS_REGEX,
  UPPERCASE_LETTER_REGEX,
  USER_AGE_ALLOWED,
  NO_END_HYPHEN_SIGN,
} from "../constants/constants";
import { string, lazy } from "yup";
import { subtractYears } from "./utils";
import { IPostalCodes } from "../types";
const postalCodes: IPostalCodes = require("postal-codes-js");

const validateEmail = () => {
  return string()
    .required("Email is required")
    .trim("Email must not contain leading or trailing whitespace")
    .strict(true)
    .matches(NO_SPACE_REGEX, {
      message: "Email must not contain middle whitespace",
    })
    .matches(AT_SIGN_DOMAIN_REGEX, {
      message: "Email must contain an '@' sign followed by domain in latin",
    })
    .email("Email must be properly formatted e.g., user@example.com");
};

const validatePassword = () => {
  return string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum")
    .trim("Password must not contain leading or trailing whitespace")
    .strict(true)
    .matches(UPPERCASE_LETTER_REGEX, {
      message: "Password must contain at least one latin uppercase letter",
    })
    .matches(LOWERCASE_LETTER_REGEX, {
      message: "Password must contain at least one latin lowercase letter",
    })
    .matches(DIGIT_REGEX, {
      message: "Password must contain at least one digit ",
    })
    .matches(NO_SPACE_REGEX, {
      message: "Password must not contain middle whitespace",
    });
};

const validateName = (field: string) => {
  return string()
    .required(`${field} is required`)
    .trim(`${field} must not contain leading or trailing whitespace`)
    .strict(true)
    .matches(NO_SPECIAL_CHARS_REGEX, {
      message: `${field} must not contain special charachers`,
    })
    .matches(NO_DIGIT_REGEX, {
      message: `${field} must not contain numbers`,
    });
};

const validateStreetName = () => {
  return string()
    .required("Street is required")
    .trim("Street must not contain leading or trailing whitespace")
    .strict(true);
};

const validateCity = () => {
  return string()
    .required("City is required")
    .trim("City must not contain leading or trailing whitespace")
    .strict(true)
    .matches(NO_SPECIAL_CHARS_REGEX, {
      message: "City must not contain special characters",
    })
    .matches(NO_DIGIT_REGEX, {
      message: "City must not contain numbers",
    });
};

const validateDateOfBirth = (message: string) => {
  return lazy(() =>
    string()
      .required("Birthday is required")
      .test(
        "is-allowed-age",
        () => message,
        (value) => {
          if (!value) return false;
          return new Date(value) < subtractYears(new Date(), USER_AGE_ALLOWED);
        },
      )
      .test(
        "is-valid-age",
        () => `Your age must be within the possible human lifespan`,
        (value) => {
          if (!value) return false;
          return new Date(value) > subtractYears(new Date(), MAX_HUMAN_AGE);
        },
      ),
  );
};

const validatePostalCode = (countryCode: string, postalCodeFormat: string) => {
  return lazy(() =>
    string()
      .required("Postal code is required")
      .trim("Postal code must not contain leading or trailing whitespace")
      .strict(true)
      .test(
        "is-correct-postal-code",
        () =>
          `Postal code must follow the country ${countryCode} format e.g. ${postalCodeFormat}`,
        (value) => {
          if (!value || !countryCode) return false;
          return typeof postalCodes.validate(countryCode, value) === "boolean";
        },
      )
      .matches(NO_END_HYPHEN_SIGN, {
        message: `Postal code must follow the country ${countryCode} format e.g. ${postalCodeFormat}`,
      }),
  );
};

export {
  validateEmail,
  validatePassword,
  validateName,
  validateStreetName,
  validateCity,
  validateDateOfBirth,
  validatePostalCode,
};

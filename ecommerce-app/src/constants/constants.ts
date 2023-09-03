import {
  ICountriesOptions,
  IFormInitialValues,
  ISignupInitialValues,
  IUpdatePersonalValues,
} from "../types";
import { Image } from "@commercetools/platform-sdk";

const AT_SIGN_DOMAIN_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
const UPPERCASE_LETTER_REGEX = /[A-Z]/;
const LOWERCASE_LETTER_REGEX = /[a-z]/;
const DIGIT_REGEX = /[0-9]/;
const NO_SPACE_REGEX = /^\S*$/;
const NO_SPECIAL_CHARS_REGEX = /^(?!.*[()[\]{}*&^%$#@!"+=:;<>?,./\\|_]).*$/;
const NO_DIGIT_REGEX = /^(?!.*[0-9]).*$/;
const USER_AGE_ALLOWED = 14;
const MAX_HUMAN_AGE = 130;
const DEFAULT_LOCALE = "en";
const DEFAULT_PRICE_COUNTRY = "US";
const DEFAULT_CURRENCY = "USD";
const FORM_DATE_FORMAT = "YYYY-MM-DD";
const DEFAULT_PRODUCTS_LIMIT = 8;
const PRODUCT_TYPE_INDEX = 0;

const countryOptions = [
  { label: "USA", countryCode: "US", postalCodeFormat: "20521-9000" },
  { label: "Germany", countryCode: "DE", postalCodeFormat: "12345" },
];

const initialCountryOptions: ICountriesOptions = {
  label: "",
  countryCode: "",
  postalCodeFormat: "",
};

const initialLoginValues: IFormInitialValues = {
  email: "",
  password: "",
  passwordCheck: [],
};

const initialSignUpValues: ISignupInitialValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  streetNameShipping: "",
  streetNameBilling: "",
  cityShipping: "",
  cityBilling: "",
  countryShipping: "",
  countryBilling: "",
  postalCodeShipping: "",
  postalCodeBilling: "",
  passwordCheck: [],
  commonAddressCheck: [],
  defaultShippingCheck: [],
  defaultBillingCheck: [],
};

const initialUpdatePersonalValues: IUpdatePersonalValues = {
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
};

const PRODUCT_DESCRIPTION_PLACEHOLDER =
  "There will be a description of a product";

const PRODUCT_IMAGE_PLACEHOLDER: Image = {
  url: "images/product-placeholder.webp",
  dimensions: { h: 1000, w: 1000 },
};

export {
  AT_SIGN_DOMAIN_REGEX,
  UPPERCASE_LETTER_REGEX,
  LOWERCASE_LETTER_REGEX,
  DIGIT_REGEX,
  NO_SPACE_REGEX,
  NO_SPECIAL_CHARS_REGEX,
  NO_DIGIT_REGEX,
  USER_AGE_ALLOWED,
  MAX_HUMAN_AGE,
  countryOptions,
  initialLoginValues,
  initialSignUpValues,
  initialCountryOptions,
  initialUpdatePersonalValues,
  DEFAULT_LOCALE,
  PRODUCT_DESCRIPTION_PLACEHOLDER,
  PRODUCT_IMAGE_PLACEHOLDER,
  PRODUCT_TYPE_INDEX,
  DEFAULT_PRICE_COUNTRY,
  DEFAULT_CURRENCY,
  FORM_DATE_FORMAT,
  DEFAULT_PRODUCTS_LIMIT,
};

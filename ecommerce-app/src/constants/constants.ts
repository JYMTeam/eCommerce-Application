const AT_SIGN_DOMAIN_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
const UPPERCASE_LETTER_REGEX = /[A-Z]/;
const LOWERCASE_LETTER_REGEX = /[a-z]/;
const DIGIT_REGEX = /[0-9]/;
const NO_SPACE_REGEX = /^\S*$/;
const NO_SPECIAL_CHARS_REGEX = /^(?!.*[()[\]{}*&^%$#@!"+=:;<>?,./\\|_]).*$/;
const NO_DIGIT_REGEX = /^(?!.*[0-9]).*$/;
const USER_AGE_ALLOWED = 14;
const countryOptions = [
  { label: "USA", countryCode: "US", postalCodeFormat: "20521-9000" },
  { label: "Germany", countryCode: "DE", postalCodeFormat: "12345" },
];

export {
  AT_SIGN_DOMAIN_REGEX,
  UPPERCASE_LETTER_REGEX,
  LOWERCASE_LETTER_REGEX,
  DIGIT_REGEX,
  NO_SPACE_REGEX,
  NO_SPECIAL_CHARS_REGEX,
  NO_DIGIT_REGEX,
  USER_AGE_ALLOWED,
  countryOptions,
};

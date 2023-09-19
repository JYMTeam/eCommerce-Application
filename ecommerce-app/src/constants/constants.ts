import {
  ICountriesOptions,
  IFormInitialValues,
  ISignupInitialValues,
  ITeamMembersInfo,
  IUpdateAddressInitialValues,
  IUpdatePersonalValues,
} from "../types";
import { Image } from "@commercetools/platform-sdk";
import MariyaPhoto from "../assets/Mariya.jpg";
import YaraPhoto from "../assets/Yara.jpg";
import JuliaPhoto from "../assets/julia01.jpg";

const AT_SIGN_DOMAIN_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
const UPPERCASE_LETTER_REGEX = /[A-Z]/;
const LOWERCASE_LETTER_REGEX = /[a-z]/;
const DIGIT_REGEX = /[0-9]/;
const NO_SPACE_REGEX = /^\S*$/;
const NO_SPECIAL_CHARS_REGEX = /^(?!.*[()[\]{}*&^%$#@!"+=:;<>?,./\\|_]).*$/;
const NO_DIGIT_REGEX = /^(?!.*[0-9]).*$/;
const NO_END_HYPHEN_SIGN = /.*(?<!-)$/;
const USER_AGE_ALLOWED = 14;
const MAX_HUMAN_AGE = 130;
const DEFAULT_LOCALE = "en";
const DEFAULT_PRICE_COUNTRY = "US";
const DEFAULT_CURRENCY = "USD";
const FORM_DATE_FORMAT = "YYYY-MM-DD";
const DEFAULT_PRODUCTS_LIMIT = 9;
const PRODUCT_TYPE_INDEX = 0;
const CURRENT_YEAR = "2023";

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

const initialUpdateAddressValues: IUpdateAddressInitialValues = {
  streetName: "",
  state: "",
  city: "",
  country: "",
  postalCode: "",
  isBilling: false,
  isShipping: false,
  isDefaultBilling: false,
  isDefaultShipping: false,
};

const PRODUCT_DESCRIPTION_PLACEHOLDER =
  "There will be a description of a product";

const PRODUCT_IMAGE_PLACEHOLDER: Image[] = [
  {
    url: "images/product-placeholder.webp",
    dimensions: { h: 1000, w: 1000 },
  },
];

const teamMembersInfo: ITeamMembersInfo[] = [
  {
    name: "Julia Khvatova",
    role: "Web developer",
    bio: "Graduated from Saint-Petersburg State University of Economics and Finance, Julia is now a web-developer with economics background. While working in a small startup, spent two years in iOS apps development, also has some experience in Wordpress development. Now she wants to pursue her career with React and React Native stacks",
    image: JuliaPhoto,
    githubLink: "https://github.com/jkhvatova",
    contributionDesc:
      "Project contribution: Routing, Navigation, Main page, Detail product page, Promocodes",
    color: "#f3f0e7",
    textColor: "#00000099",
    buttonColor: "#F9C152",
  },
  {
    name: "Yaroslava Hryzadubova",
    role: "Web developer",
    bio: "Meet our developer, a graduate of Donetsk National Technical University in 2017. With six months of prior experience as a WordPress developer in Kyiv, she's now in Berlin, actively learning German, English, and enhancing her web development skills through React courses. She's excited about new opportunities in web development.",
    image: YaraPhoto,
    githubLink: "https://github.com/yaroslavagd",
    contributionDesc:
      "Project contribution: Filters, Search, Shopping Cart, Token Requests, Login & Registration Requests, User Profile",
    color: "primary.main",
    textColor: "#ffffff66",
    buttonColor: "#ffffff99",
  },
  {
    name: "Mariya Demidovich",
    role: "Web developer",
    bio: "After graduation from Minsk State Linguistic University, Mariya started her career path as a technical support specialist in a JavaScript UI library for web Apps development. She is a problem-solver who wants to progress further in programming. At the moment she is most interested in Web development and what goes with it.",
    image: MariyaPhoto,
    githubLink: "https://github.com/mariyademy",
    contributionDesc:
      "Project contribution: Forms validation, categories, Abous Us page, products & cart items display, discounts, pagination",
    color: "#f3f0e7",
    textColor: "#00000099",
    buttonColor: "#F9C152",
  },
];

const NOTIFICATION_MESSAGES = {
  SUCCESS_SIGNUP: "You have successfully signed up",
  SUCCESS_LOGIN: "You have successfully logged in!",
  SUCCESS_DATA_UPDATE: "Your data has been successfully updated",
  SUCCESS_ADDRESS_CREATE: "Your address has been successfully created",
  SUCCESS_ADDRESS_REMOVE: "Your address has been successfully removed",
  SUCCESS_PRODUCT_ADD: "Bag successfully added to cart",
  SUCCESS_PRODUCT_REMOVE: "Bag successfully removed from cart",
  SUCCESS_ALL_PRODUCTS_REMOVE: "Your cart has been successfully emptied",
  SUCCESS_PROMOCODE_APPLY: "Promocode have been successfully applied",
  SUCCESS_PROMOCODE_REMOVE: "Promocode have been successfully removed",
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
  NOTIFICATION_MESSAGES,
  countryOptions,
  initialLoginValues,
  initialSignUpValues,
  initialCountryOptions,
  initialUpdatePersonalValues,
  initialUpdateAddressValues,
  DEFAULT_LOCALE,
  PRODUCT_DESCRIPTION_PLACEHOLDER,
  PRODUCT_IMAGE_PLACEHOLDER,
  PRODUCT_TYPE_INDEX,
  DEFAULT_PRICE_COUNTRY,
  DEFAULT_CURRENCY,
  FORM_DATE_FORMAT,
  DEFAULT_PRODUCTS_LIMIT,
  NO_END_HYPHEN_SIGN,
  CURRENT_YEAR,
  teamMembersInfo,
};

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

export interface IUpdateAddressInitialValues {
  streetName: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isBilling: boolean;
  isShipping: boolean;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
}

export interface IUpdatePersonalValues {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}

export interface IUpdatePasswordValues {
  currentPassword: string;
  newPassword: string;
  isCurrentPasswordCheck: boolean;
  isNewPasswordCheck: boolean;
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

export interface IUpdateAddressSchemaOptions {
  countryCode: string;
  postalCodeFormat: string;
  isBillingAddress?: boolean;
  isShippingAddress?: boolean;
  isDefaultShippingAddress?: boolean;
  isDefaultBillingAddress?: boolean;
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
export interface IParsedProduct {
  id: string;
  name: string;
  images: Image[];
  price: string;
  description: string;
  longDescription: string;
  designer: string;
  sizeList: string;
  color: string;
  discount: string;
}

export interface IParsedCategory {
  id: string;
  text: string;
  children: IParsedCategory[];
}

export interface IProductsFormattedAttribute {
  name: string;
  values: string[];
}
export interface AttributesObject {
  description: string;
  longDescription: string;
  designer: string;
  sizeList: string;
  color: string;
}
export enum SortMethods {
  PRICE_HIGH = "price high",
  PRICE_LOW = "price low",
  NAME = "name",
}
export enum FilterAndSortNames {
  FILTER_PRICE_ATTRIBUTE = "price",
  SORT_ATTRIBUTE = "sort",
  FILTER_OTHER_LISTS_ATTRIBUTE = "otherLists",
}

export type SelectedFilterAndSortValues = {
  [FilterAndSortNames.SORT_ATTRIBUTE]?: string;
  [FilterAndSortNames.FILTER_PRICE_ATTRIBUTE]?: number[];
  [FilterAndSortNames.FILTER_OTHER_LISTS_ATTRIBUTE]?: SelectedFilterValues;
};
export type SelectedFilterValues = { [key: string]: string[] };

export enum AttributesNames {
  SHORT_DESCRIPTION = "short-description",
  LONG_DESCRIPTION = "long-description",
  DESIGNER = "designer",
  SIZE_LIST = "size-list",
  COLOR = "color",
}
export interface IProductsPanelProps {
  onCategoriesIconClick: () => void;
}
export interface IProductsDrawerProps {
  mobileOpen: boolean;
  onCategoriesIconClick: () => void;
}
export interface IAncestorInfo {
  id: string;
  text: string;
}

export interface ITeamMembersInfo {
  name: string;
  role: string;
  bio: string;
  image: string;
  githubLink: string;
  contributionDesc: string;
  color: string;
  textColor: string;
  buttonColor: string;
}
export interface IParsedCartItem {
  cartArrIndex: number;
  name: string;
  image: string;
  price: string;
  discount: string;
  quantity: number;
  totalCost: string;
}

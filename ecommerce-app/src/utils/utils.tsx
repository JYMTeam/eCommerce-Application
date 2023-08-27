import {
  AttributeBooleanType,
  AttributeDateTimeType,
  AttributeDateType,
  AttributeDefinition,
  AttributeEnumType,
  AttributeLocalizableTextType,
  AttributeLocalizedEnumType,
  AttributeMoneyType,
  AttributeNestedType,
  AttributeNumberType,
  AttributeReferenceType,
  AttributeSetType,
  AttributeTextType,
  AttributeTimeType,
  AttributeType,
  BaseAddress,
  CustomerDraft,
  Image,
  ProductProjection,
} from "@commercetools/platform-sdk";
import { IFormInitialValues, ISignupInitialValues } from "../types";
import { UserAuthOptions } from "@commercetools/sdk-client-v2";
import {
  DEFAULT_CURRENCY,
  DEFAULT_LOCALE,
  DEFAULT_PRICE_COUNTRY,
  PRODUCT_DESCRIPTION_PLACEHOLDER,
  PRODUCT_IMAGE_PLACEHOLDER,
} from "../constants/constants";

export const subtractYears = (date: Date, years: number) => {
  date.setFullYear(date.getFullYear() - years);
  return date;
};

export const convertCustomerDraftToUserAuthOptions = (
  customerDraft: CustomerDraft,
) => {
  const { email, password } = customerDraft;
  if (email && password) {
    const userAuthOptions: UserAuthOptions = {
      username: email,
      password,
    };
    return userAuthOptions;
  }

  return;
};

export const convertToUserAuthOptions = (values: IFormInitialValues) => {
  const { email, password } = values;

  const userAuthOptions: UserAuthOptions = {
    username: email,
    password,
  };

  return userAuthOptions;
};

export const convertToCustomerDraft = (values: ISignupInitialValues) => {
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    streetNameShipping,
    cityShipping,
    countryShipping,
    postalCodeShipping,
    streetNameBilling,
    cityBilling,
    countryBilling,
    postalCodeBilling,
    commonAddressCheck,
    defaultShippingCheck,
    defaultBillingCheck,
  } = values;

  const isCommonAddress = commonAddressCheck?.length !== 0;
  const isDefaultBilling = defaultBillingCheck?.length !== 0;
  const isDefaultShipping = defaultShippingCheck?.length !== 0;

  const addresses: BaseAddress[] = [];
  const shippingAddress: BaseAddress = convertToBaseAddress(
    countryShipping,
    cityShipping,
    streetNameShipping,
    postalCodeShipping,
  );
  const billingAddress: BaseAddress = convertToBaseAddress(
    countryBilling,
    cityBilling,
    streetNameBilling,
    postalCodeBilling,
  );

  let indexDefaultShipping = -1;
  let indexDefaultBilling = -1;

  const shippingAddresses: number[] = [];
  const billingAddresses: number[] = [];

  let newUser: CustomerDraft | null = null;

  // set shipping address
  addresses.push(shippingAddress);
  shippingAddresses.push(0);

  // set billing address
  if (!isCommonAddress) {
    addresses.push(billingAddress);
    billingAddresses.push(1);
  }
  if (isCommonAddress) billingAddresses.push(0);

  //set default addresses
  if (isDefaultShipping) indexDefaultShipping = 0;
  if (isCommonAddress && isDefaultShipping) indexDefaultBilling = 0;
  if (!isCommonAddress && isDefaultBilling) indexDefaultBilling = 1;

  if (indexDefaultShipping !== -1 && indexDefaultBilling !== -1) {
    newUser = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      shippingAddresses,
      billingAddresses,
      defaultShippingAddress: indexDefaultShipping,
      defaultBillingAddress: indexDefaultBilling,
    };
  } else if (indexDefaultShipping !== -1) {
    newUser = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      shippingAddresses,
      billingAddresses,
      defaultShippingAddress: indexDefaultShipping,
    };
  } else if (indexDefaultBilling !== -1) {
    newUser = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      shippingAddresses,
      billingAddresses,
      defaultBillingAddress: indexDefaultBilling,
    };
  } else {
    newUser = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      shippingAddresses,
      billingAddresses,
    };
  }

  return newUser;
};

const convertToBaseAddress = (
  country: string,
  city: string,
  streetName: string,
  postalCode: string,
) => {
  const address: BaseAddress = {
    country,
    city,
    streetName,
    postalCode,
  };

  return address;
};

const convertCentsToUSD = (centsAmount: number) => {
  return centsAmount / 100;
};

const CURRENCY_CONVERTER = {
  USD: convertCentsToUSD,
};

const CURRENCY_SIGN = {
  USD: "$",
  EUR: "€",
};

export const parseProducts = (products: ProductProjection[]) => {
  return products.map((product) => {
    let image: Image = PRODUCT_IMAGE_PLACEHOLDER;
    let description = PRODUCT_DESCRIPTION_PLACEHOLDER;
    let price = `${
      CURRENCY_SIGN[DEFAULT_CURRENCY as keyof typeof CURRENCY_SIGN]
    }0`;
    if (product.masterVariant.images && product.masterVariant.images[0]) {
      image = product.masterVariant.images[0];
    }
    if (product.masterVariant.prices) {
      const country = product.masterVariant.prices.find(
        (price) => price.country === DEFAULT_PRICE_COUNTRY,
      );
      if (country) {
        const centAmount = country.value.centAmount;
        const currencyCode = country.value.currencyCode;
        const convertedPrice =
          CURRENCY_CONVERTER[
            country.value.currencyCode as keyof typeof CURRENCY_CONVERTER
          ](centAmount);
        const formatedPrice = new Intl.NumberFormat(DEFAULT_LOCALE, {
          style: "currency",
          currency: currencyCode,
        }).format(convertedPrice);
        price = `${formatedPrice}`;
      }
    }
    return {
      id: product.id,
      name: product.name[DEFAULT_LOCALE],
      description: product.description || description,
      image,
      price,
    };
  });
};

export const parseAttributes = (attributes: AttributeDefinition[]) => {
  // return attributes.map((attribute) => {
  //   if (isAttributeEnumType(attribute.type)) {
  //     const enumObj = {
  //       name: attribute.name,
  //       values: attribute.type.values.map((value) => value.key)
  //     }
  //     return enumObj;
  //   }
  // if (isAttributeSetType(attribute.type)) {
  //   const setObj = {
  //     name: attribute.name,
  //     values: attribute.type.elementType.values.map((value) => value.key)
  //   }
  //   return setObj;
  // }
  // });
};

// Type-checking predicate functions
export function isAttributeBooleanType(
  attribute: AttributeType,
): attribute is AttributeBooleanType {
  return (attribute as AttributeBooleanType).name === "boolean";
}

export function isAttributeDateTimeType(
  attribute: AttributeType,
): attribute is AttributeDateTimeType {
  return (attribute as AttributeDateTimeType).name === "datetime";
}

export function isAttributeDateType(
  attribute: AttributeType,
): attribute is AttributeDateType {
  return (attribute as AttributeDateType).name === "date";
}

export function isAttributeEnumType(
  attribute: AttributeType,
): attribute is AttributeEnumType {
  return (attribute as AttributeEnumType).name === "enum";
}

export function isAttributeLocalizableTextType(
  attribute: AttributeType,
): attribute is AttributeLocalizableTextType {
  return (attribute as AttributeLocalizableTextType).name === "ltext";
}

export function isAttributeLocalizedEnumType(
  attribute: AttributeType,
): attribute is AttributeLocalizedEnumType {
  return (attribute as AttributeLocalizedEnumType).name === "lenum";
}

export function isAttributeMoneyType(
  attribute: AttributeType,
): attribute is AttributeMoneyType {
  return (attribute as AttributeMoneyType).name === "money";
}

export function isAttributeNestedType(
  attribute: AttributeType,
): attribute is AttributeNestedType {
  return (attribute as AttributeNestedType).name === "nested";
}

export function isAttributeNumberType(
  attribute: AttributeType,
): attribute is AttributeNumberType {
  return (attribute as AttributeNumberType).name === "number";
}

export function isAttributeReferenceType(
  attribute: AttributeType,
): attribute is AttributeReferenceType {
  return (attribute as AttributeReferenceType).name === "reference";
}

export function isAttributeSetType(
  attribute: AttributeType,
): attribute is AttributeSetType {
  return (attribute as AttributeSetType).name === "set";
}

export function isAttributeTextType(
  attribute: AttributeType,
): attribute is AttributeTextType {
  return (attribute as AttributeTextType).name === "text";
}

export function isAttributeTimeType(
  attribute: AttributeType,
): attribute is AttributeTimeType {
  return (attribute as AttributeTimeType).name === "time";
}

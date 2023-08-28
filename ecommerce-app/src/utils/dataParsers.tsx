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
  Image,
  ProductProjection,
} from "@commercetools/platform-sdk";
import {
  DEFAULT_CURRENCY,
  DEFAULT_LOCALE,
  DEFAULT_PRICE_COUNTRY,
  PRODUCT_DESCRIPTION_PLACEHOLDER,
  PRODUCT_IMAGE_PLACEHOLDER,
} from "../constants/constants";
import { IProductsFormattedAttribute } from "../types";

const convertCentsToUSD = (centAmount: number) => {
  return centAmount / 100;
};

const CURRENCY_CONVERTER = {
  USD: convertCentsToUSD,
};

const CURRENCY_SIGN = {
  USD: "$",
  EUR: "€",
};

export const formatPrice = (centAmount: number, currencyCode: string) => {
  const convertedPrice =
    CURRENCY_CONVERTER[currencyCode as keyof typeof CURRENCY_CONVERTER](
      centAmount,
    );
  const formatedPrice = new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "currency",
    currency: currencyCode,
  }).format(convertedPrice);
  return formatedPrice;
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
    if (
      product.masterVariant.prices &&
      product.masterVariant.prices.length !== 0
    ) {
      const country = product.masterVariant.prices.find(
        (price) => price.country === DEFAULT_PRICE_COUNTRY,
      );
      if (country) {
        const centAmount = country.value.centAmount;
        const currencyCode = country.value.currencyCode;
        const formatedPrice = formatPrice(centAmount, currencyCode);
        price = `${formatedPrice}`;
      }
    }
    if (product.description) {
      description = product.description[DEFAULT_LOCALE];
    }
    return {
      id: product.id,
      name: product.name[DEFAULT_LOCALE],
      description,
      image,
      price,
    };
  });
};

export const parseAttributes = (attributes: AttributeDefinition[]) => {
  return attributes.map((attribute) => {
    const formattedAttribute: IProductsFormattedAttribute = {
      name: attribute.name,
      values: [],
    };
    const attributeType = attribute.type;
    const isEnumtype = isAttributeEnumType(attributeType);
    const isSetType = isAttributeSetType(attributeType);

    if (isEnumtype) {
      formattedAttribute.values = attributeType.values.map(
        (value) => value.key,
      );
    }

    if (isSetType) {
      const isSetEnumType = isAttributeEnumType(attributeType.elementType);
      if (isSetEnumType) {
        formattedAttribute.values = attributeType.elementType.values.map(
          (value) => value.key,
        );
      }
    }

    //TODO: add others types

    return formattedAttribute;
  });
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

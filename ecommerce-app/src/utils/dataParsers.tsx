import {
  Attribute,
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
  Category,
  Price,
  ProductProjection,
} from "@commercetools/platform-sdk";
import {
  DEFAULT_CURRENCY,
  DEFAULT_LOCALE,
  DEFAULT_PRICE_COUNTRY,
  PRODUCT_DESCRIPTION_PLACEHOLDER,
  PRODUCT_IMAGE_PLACEHOLDER,
} from "../constants/constants";
import {
  AttributesNames,
  AttributesObject,
  IParsedProduct,
  IParsedCategory,
  IProductsFormattedAttribute,
  IAncestorInfo,
} from "../types";
import { CURRENCY_SIGN, formatPrice } from "./utils";

const initialParsedProduct = {
  images: PRODUCT_IMAGE_PLACEHOLDER,
  attributesObject: {
    description: PRODUCT_DESCRIPTION_PLACEHOLDER,
    longDescription: PRODUCT_DESCRIPTION_PLACEHOLDER,
    designer: "",
    sizeList: "",
    color: "",
  },
  price: `${CURRENCY_SIGN[DEFAULT_CURRENCY as keyof typeof CURRENCY_SIGN]}0`,
  discount: "",
};

const getDiscount = (priceInfo: Price) => {
  if (!priceInfo.discounted) return;
  return priceInfo.discounted.value.centAmount;
};

export const parseProducts = (products: ProductProjection[]) => {
  return products.map((product) => {
    let { images, attributesObject, price, discount } = initialParsedProduct;

    if (
      product.masterVariant.images &&
      product.masterVariant.images.length !== 0
    ) {
      images = product.masterVariant.images;
    }
    if (
      product.masterVariant.prices &&
      product.masterVariant.prices.length !== 0
    ) {
      const priceInfo = product.masterVariant.prices.find(
        (price) => price.country === DEFAULT_PRICE_COUNTRY,
      );
      if (priceInfo) {
        const currencyCode = priceInfo.value.currencyCode;
        const centAmount = priceInfo.value.centAmount;
        const discountCentAmount = getDiscount(priceInfo);

        const formatedPrice = formatPrice(centAmount, currencyCode);
        const formatedDiscount = discountCentAmount
          ? formatPrice(discountCentAmount, currencyCode)
          : "";

        price = `${formatedPrice}`;
        discount = `${formatedDiscount}`;
      }
    }
    if (product.masterVariant.attributes) {
      attributesObject = parseAttributes(product.masterVariant.attributes);
    }
    const parsedProduct: IParsedProduct = {
      id: product.id,
      name: product.name[DEFAULT_LOCALE],
      images,
      price,
      discount,
      ...attributesObject,
    };
    return parsedProduct;
  });
};

const parseAttributes = (attributes: Attribute[]) => {
  const attributesObject: AttributesObject = {
    description: PRODUCT_DESCRIPTION_PLACEHOLDER,
    longDescription: PRODUCT_DESCRIPTION_PLACEHOLDER,
    designer: "",
    sizeList: "",
    color: "",
  };
  attributes.forEach((attribute) => {
    switch (attribute.name) {
      case AttributesNames.SHORT_DESCRIPTION:
        attributesObject.description = attribute.value[0];
        break;
      case AttributesNames.LONG_DESCRIPTION:
        attributesObject.longDescription = attribute.value[0];
        break;
      case AttributesNames.DESIGNER:
        attributesObject.designer = JSON.stringify(attribute.value.label);
        break;
      case AttributesNames.SIZE_LIST:
        attributesObject.sizeList = JSON.stringify(attribute.value.label);
        break;
      case AttributesNames.COLOR:
        attributesObject.color = JSON.stringify(attribute.value.label);
        break;
    }
  });

  return attributesObject;
};

export const parseAttributesDefinition = (
  attributes: AttributeDefinition[],
) => {
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

export const parseCategories = (categories: Category[]) => {
  const parentId2ChildrenId = new Map<string, string[]>(); // map of categoryId: subcategories[]
  const id2Obj = new Map<string, IParsedCategory>(); //map of id: category/subcategory obj

  categories.forEach(({ id, name, ancestors }) => {
    const text = name[DEFAULT_LOCALE];

    let parsedCategory: IParsedCategory = {
      id: "",
      text: "",
      children: [],
    };

    parsedCategory.id = id;
    parsedCategory.text = text;

    id2Obj.set(parsedCategory.id, parsedCategory);

    let parentId =
      ancestors.length !== 0 && ancestors[0].obj ? ancestors[0].obj.id : "";

    if (!parentId2ChildrenId.has(parentId)) {
      parentId2ChildrenId.set(parentId, []);
    }
    parentId2ChildrenId.get(parentId)!.push(id);
  });

  parentId2ChildrenId.forEach((children, parentId) => {
    if (parentId !== "") {
      for (let childId of children) {
        id2Obj.get(parentId)!.children.push(id2Obj.get(childId)!);
      }
    }
  });

  let result: IParsedCategory[] = [];
  parentId2ChildrenId.forEach((children, key) => {
    if (key === "") {
      for (let child of children) {
        result.push(id2Obj.get(child)!);
      }
    }
  });
  return result;
};

export const parseCategoriesBreadcrumb = (categories: Category[]) => {
  let id2path = new Map<string, Array<string>>();
  let id2name = new Map<string, string>();

  categories.forEach(({ id, name, ancestors }) => {
    const text = name[DEFAULT_LOCALE];
    let path = ancestors.map((value) => {
      return value.id;
    });
    path.unshift(id);
    id2path.set(id, path);
    id2name.set(id, text);
  });

  let id2ancestorsInfo = new Map<string, Array<IAncestorInfo>>();

  id2path.forEach((_, key) => {
    let ancestorsInfo = id2path.get(key)!.map((ancestorId) => {
      let info = {
        id: ancestorId,
        text: id2name.get(ancestorId)!,
      };
      return info;
    });

    id2ancestorsInfo.set(key, ancestorsInfo.reverse());
  });
  return id2ancestorsInfo;
};

import {
  AttributeBooleanType,
  AttributeDateTimeType,
  AttributeDateType,
  AttributeEnumType,
  AttributeLocalizableTextType,
  AttributeLocalizedEnumType,
  AttributeMoneyType,
  Price,
  ProductProjection,
  AttributeNestedType,
  AttributeNumberType,
  AttributeReferenceType,
  AttributeSetType,
  AttributeTextType,
  AttributeTimeType,
} from "@commercetools/platform-sdk";

export const priceInfoTest: Price = {
  id: "5e3f72c4",
  value: {
    type: "centPrecision",
    currencyCode: "USD",
    centAmount: 9500,
    fractionDigits: 2,
  },
  country: "US",
  discounted: {
    value: {
      type: "centPrecision",
      currencyCode: "USD",
      centAmount: 8000,
      fractionDigits: 2,
    },
    discount: {
      typeId: "product-discount",
      id: "984e7e66",
    },
  },
};

export const productsArrayTest: ProductProjection[] = [
  {
    id: "9e5e4637",
    version: 1,
    productType: {
      typeId: "product-type",
      id: "2ce8b109",
    },
    name: {
      en: "Test bag",
    },
    categories: [],
    slug: {
      en: "test-bag",
    },
    masterVariant: {
      id: 1,
      prices: [
        {
          id: "4cbd2206",
          value: {
            type: "centPrecision",
            currencyCode: "USD",
            centAmount: 65000,
            fractionDigits: 2,
          },
          country: "US",
        },
      ],
      images: [
        {
          url: "https://raw.githubusercontent.com/test.jpg",
          dimensions: {
            w: 0,
            h: 0,
          },
        },
      ],
      attributes: [
        {
          name: "short-description",
          value: ["Short description"],
        },
        {
          name: "long-description",
          value: ["Long description"],
        },
        {
          name: "designer",
          value: {
            key: "Saint Laurent",
            label: "Saint Laurent",
          },
        },
        {
          name: "size-list",
          value: {
            key: "small",
            label: "small",
          },
        },
        {
          name: "color",
          value: {
            key: "red",
            label: "red",
          },
        },
      ],
    },
    variants: [],
    createdAt: "",
    lastModifiedAt: "",
  },
];

export const expectedProductsArray = [
  {
    id: "9e5e4637",
    name: "Test bag",
    images: [
      {
        url: "https://raw.githubusercontent.com/test.jpg",
        dimensions: {
          w: 0,
          h: 0,
        },
      },
    ],
    price: "$650.00",
    discount: "",
    description: "Short description",
    longDescription: "Long description",
    designer: '"Saint Laurent"',
    sizeList: '"small"',
    color: '"red"',
  },
];

export const attrubuteEmumTestObj: AttributeEnumType = {
  name: "enum",
  values: [],
};

export const attrubuteBooleanTestObj: AttributeBooleanType = {
  name: "boolean",
};

export const attrubuteDateTimeTestObj: AttributeDateTimeType = {
  name: "datetime",
};

export const attrubuteDateTestObj: AttributeDateType = {
  name: "date",
};

export const attrubuteLtextTestObj: AttributeLocalizableTextType = {
  name: "ltext",
};

export const attrubuteLenumTestObj: AttributeLocalizedEnumType = {
  name: "lenum",
  values: [],
};

export const attrubuteMoneyTestObj: AttributeMoneyType = {
  name: "money",
};

export const attrubuteNestedTestObj: AttributeNestedType = {
  name: "nested",
  typeReference: { typeId: "product-type", id: "" },
};

export const attrubuteNumberTestObj: AttributeNumberType = {
  name: "number",
};

export const attrubuteReferenceTestObj: AttributeReferenceType = {
  name: "reference",
  referenceTypeId: "",
};

export const attrubuteSetTestObj: AttributeSetType = {
  name: "set",
  elementType: { name: "text" },
};

export const attrubuteTextTestObj: AttributeTextType = {
  name: "text",
};

export const attrubuteTimeTestObj: AttributeTimeType = {
  name: "time",
};

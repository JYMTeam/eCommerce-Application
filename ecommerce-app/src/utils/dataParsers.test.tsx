import {
  getDiscount,
  isAttributeBooleanType,
  isAttributeDateTimeType,
  isAttributeDateType,
  isAttributeEnumType,
  isAttributeLocalizableTextType,
  parseProducts,
  isAttributeLocalizedEnumType,
  isAttributeMoneyType,
  isAttributeNestedType,
  isAttributeNumberType,
  isAttributeReferenceType,
  isAttributeSetType,
  isAttributeTextType,
  isAttributeTimeType,
} from "./dataParsers";
import {
  attrubuteBooleanTestObj,
  attrubuteDateTestObj,
  attrubuteDateTimeTestObj,
  attrubuteEmumTestObj,
  attrubuteLenumTestObj,
  attrubuteLtextTestObj,
  attrubuteMoneyTestObj,
  attrubuteNestedTestObj,
  attrubuteNumberTestObj,
  attrubuteReferenceTestObj,
  attrubuteSetTestObj,
  attrubuteTextTestObj,
  attrubuteTimeTestObj,
  expectedProductsArray,
  priceInfoTest,
  productsArrayTest,
} from "../constants/testObject";

describe("getDiscountInfo", () => {
  it("should get discount info if it exists in price object", () => {
    const expectedDiscountValue = 8000;
    const result = getDiscount(priceInfoTest);
    expect(result).toEqual(expectedDiscountValue);
  });
});

describe("parseProducts", () => {
  it("should convert large product objects to the objects with only needed information", () => {
    const expectedParsedArray = expectedProductsArray;
    const result = parseProducts(productsArrayTest);
    expect(result).toEqual(expectedParsedArray);
  });
});

describe("isAttributeEnumType", () => {
  it("should check if AttributeType object has enum type", () => {
    const result = isAttributeEnumType(attrubuteEmumTestObj);
    expect(result).toEqual(true);
  });
});

describe("isAttributeBooleanType", () => {
  it("should check if AttributeType object has boolean type", () => {
    const result = isAttributeBooleanType(attrubuteBooleanTestObj);
    expect(result).toEqual(true);
  });
});

describe("isAttributeDateTimeType", () => {
  it("should check if AttributeType object has datetime type", () => {
    const result = isAttributeDateTimeType(attrubuteDateTimeTestObj);
    expect(result).toEqual(true);
  });
});

describe("isAttributeDateType", () => {
  it("should check if AttributeType object has date type", () => {
    const result = isAttributeDateType(attrubuteDateTestObj);
    expect(result).toEqual(true);
  });
});

describe("isAttributeLocalizableTextType", () => {
  it("should check if AttributeType object has ltext type", () => {
    const result = isAttributeLocalizableTextType(attrubuteLtextTestObj);
    expect(result).toEqual(true);
  });
});

describe("isAttributeLocalizableEnumType", () => {
  it("should check if AttributeType object has lenum type", () => {
    const result = isAttributeLocalizedEnumType(attrubuteLenumTestObj);
    expect(result).toEqual(true);
  });
});

describe("isAttributeMoneyType", () => {
  it("should check if AttributeType object has money type", () => {
    const result = isAttributeMoneyType(attrubuteMoneyTestObj);
    expect(result).toEqual(true);
  });
});

describe("isAttributeNestedType", () => {
  it("should check if AttributeType object has nested type", () => {
    const result = isAttributeNestedType(attrubuteNestedTestObj);
    expect(result).toEqual(true);
  });
});

describe("isAttributeNumberType", () => {
  it("should check if AttributeType object has number type", () => {
    const result = isAttributeNumberType(attrubuteNumberTestObj);
    expect(result).toEqual(true);
  });
});

describe("isAttributeReferenceType", () => {
  it("should check if AttributeType object has reference type", () => {
    const result = isAttributeReferenceType(attrubuteReferenceTestObj);
    expect(result).toEqual(true);
  });
});

describe("isAttributeSetType", () => {
  it("should check if AttributeType object has set type", () => {
    const result = isAttributeSetType(attrubuteSetTestObj);
    expect(result).toEqual(true);
  });
});

describe("isAttributeTextType", () => {
  it("should check if AttributeType object has text type", () => {
    const result = isAttributeTextType(attrubuteTextTestObj);
    expect(result).toEqual(true);
  });
});

describe("isAttributeTimeType", () => {
  it("should check if AttributeType object has time type", () => {
    const result = isAttributeTimeType(attrubuteTimeTestObj);
    expect(result).toEqual(true);
  });
});

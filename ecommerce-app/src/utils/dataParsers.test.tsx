import {
  getDiscount,
  isAttributeBooleanType,
  isAttributeDateTimeType,
  isAttributeDateType,
  isAttributeEnumType,
  isAttributeLocalizableTextType,
  parseProducts,
  isAttributeLocalizedEnumType,
} from "./dataParsers";
import {
  attrubuteBooleanTestObj,
  attrubuteDateTestObj,
  attrubuteDateTimeTestObj,
  attrubuteEmumTestObj,
  attrubuteLenumTestObj,
  attrubuteLtextTestObj,
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

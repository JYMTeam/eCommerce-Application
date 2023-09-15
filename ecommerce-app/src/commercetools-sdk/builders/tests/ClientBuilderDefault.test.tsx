import {
  getDefaultScopes,
  getCustomerScopes,
  httpMiddlewareOptions,
  defaultClient,
} from "../oldBuilders/ClientBuilderDefault";
import {
  ClientBuilder,
  HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";

describe("getDefaultScopes", () => {
  it("returns an array of scopes", () => {
    const scopes = getDefaultScopes();
    expect(Array.isArray(scopes)).toBe(true);
  });
});

describe("getCustomerScopes", () => {
  it("returns an array of customer scopes", () => {
    const customerScopes = getCustomerScopes();
    expect(Array.isArray(customerScopes)).toBe(true);
  });
});

describe("httpMiddlewareOptions", () => {
  it("has correct properties and values", () => {
    const expectedOptions: HttpMiddlewareOptions = {
      host: expect.any(String),
      fetch: expect.any(Function),
    };
    expect(httpMiddlewareOptions).toEqual(expectedOptions);
  });
});

describe("defaultClient", () => {
  it("is an instance of ClientBuilder", () => {
    expect(defaultClient).toBeInstanceOf(ClientBuilder);
  });
});

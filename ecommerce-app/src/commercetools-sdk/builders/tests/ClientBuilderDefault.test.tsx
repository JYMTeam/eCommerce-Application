import {
  getDefaultScopes,
  getCustomerScopes,
  authMiddlewareOptions,
  httpMiddlewareOptions,
  defaultClient,
} from "../ClientBuilderDefault";
import {
  ClientBuilder,
  AuthMiddlewareOptions,
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

describe("authMiddlewareOptions", () => {
  it("has correct properties and values", () => {
    const expectedOptions: AuthMiddlewareOptions = {
      host: expect.any(String),
      projectKey: expect.any(String),
      credentials: {
        clientId: expect.any(String),
        clientSecret: expect.any(String),
      },
      scopes: expect.arrayContaining([expect.any(String)]),
      fetch: expect.any(Function),
    };
    expect(authMiddlewareOptions).toEqual(expectedOptions);
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

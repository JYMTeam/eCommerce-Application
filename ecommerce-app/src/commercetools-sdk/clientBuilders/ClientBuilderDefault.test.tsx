import {
  defaultClient,
  authMiddlewareOptions,
  httpMiddlewareOptions,
  projectKey,
} from "./ClientBuilderDefault";

describe("ClientBuilderDefault", () => {
  it("should have correct authMiddlewareOptions", () => {
    expect(authMiddlewareOptions.projectKey).toBe(projectKey);
    expect(authMiddlewareOptions.credentials.clientId).toBeTruthy();
    expect(authMiddlewareOptions.credentials.clientSecret).toBeTruthy();

    expect(authMiddlewareOptions.host).toEqual(
      process.env.REACT_APP_AUTH_URL || "",
    );
  });

  it("should have correct httpMiddlewareOptions", () => {
    expect(httpMiddlewareOptions.host).toBeTruthy();
    expect(httpMiddlewareOptions.host).toEqual(
      process.env.REACT_APP_API_URL || "",
    );
  });

  it("should create defaultClient with correct options", () => {
    const client = defaultClient.build();
    expect(client).toBeDefined();
  });
});

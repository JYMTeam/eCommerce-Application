import { TokenStore } from "@commercetools/sdk-client-v2";
import { PassTokenCache } from "./PassTokenCache";

describe("PassTokenCache", () => {
  let tokenCache: PassTokenCache;

  beforeEach(() => {
    tokenCache = new PassTokenCache();
  });

  it("should set and get token", () => {
    const token: TokenStore = {
      token: "sampleToken",
      expirationTime: 123456789,
      refreshToken: "sampleRefreshToken",
    };

    tokenCache.set(token);

    const retrievedToken = tokenCache.get();

    expect(retrievedToken.token).toBe(token.token);
    expect(retrievedToken.expirationTime).toBe(token.expirationTime);
    expect(retrievedToken.refreshToken).toBe(token.refreshToken);
  });
});

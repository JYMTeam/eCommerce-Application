import {
  TokenCache,
  TokenCacheOptions,
  TokenStore,
} from "@commercetools/sdk-client-v2";

class MyToken implements TokenCache {
  private cache: TokenStore = {
    token: "",
    expirationTime: 0,
    refreshToken: undefined,
  };

  get(tokenCacheOptions?: TokenCacheOptions): TokenStore {
    return this.cache;
  }

  set(cache: TokenStore, tokenCacheOptions?: TokenCacheOptions): void {
    this.cache = cache;
  }
}

export const myToken = new MyToken();

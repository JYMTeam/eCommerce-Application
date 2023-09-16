import { TokenCacheOptions, TokenStore } from "@commercetools/sdk-client-v2";

export class PassTokenCache {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  public getToken(tokenCacheOptions?: TokenCacheOptions): TokenStore {
    const cacheDataJSON =
      localStorage.getItem(this.storageKey) ??
      '{"token":"","expirationTime":0,"refreshToken":""}';
    return JSON.parse(cacheDataJSON) as TokenStore;
  }

  public setToken(
    cache: TokenStore,
    tokenCacheOptions?: TokenCacheOptions,
  ): void {
    const cacheDataJSON = JSON.stringify(cache);
    localStorage.setItem(this.storageKey, cacheDataJSON);
  }
}

export const passToken = new PassTokenCache("passTokenCache");
export const anonymToken = new PassTokenCache("passTokenCache");

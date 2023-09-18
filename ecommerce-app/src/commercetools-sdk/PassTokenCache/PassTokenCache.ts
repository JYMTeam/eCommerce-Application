import { TokenCacheOptions, TokenStore } from "@commercetools/sdk-client-v2";

const emptyTokenCache = '{"token":"","expirationTime":0,"refreshToken":""}';
export class TokenCacheManager {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  public getToken(tokenCacheOptions?: TokenCacheOptions): TokenStore {
    const cacheDataJSON =
      localStorage.getItem(this.storageKey) ?? emptyTokenCache;
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

export const passTokenManager = new TokenCacheManager("passTokenJymTeam");
// export const anonymTokenManager = new TokenCacheManager("passTokenJymTeam");

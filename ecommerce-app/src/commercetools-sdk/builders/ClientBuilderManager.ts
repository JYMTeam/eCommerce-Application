import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  AnonymousAuthMiddlewareOptions,
  AuthMiddlewareOptions,
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  TokenStore,
  UserAuthOptions,
} from "@commercetools/sdk-client-v2";
import {
  // anonymTokenManager,
  passTokenManager,
} from "../PassTokenCache/PassTokenCache";

export class ClientBuilderManager {
  private currentClient: Client;
  private defaultBuilder = new ClientBuilder()
    .withProjectKey(ClientBuilderManager.basicOptions.projectKey)
    .withHttpMiddleware(ClientBuilderManager.httpMiddlewareOptions)
    .withLoggerMiddleware();

  constructor() {
    const passTokenCache = passTokenManager.getToken();
    // const anonymTokenCache = anonymTokenManager.getToken();

    if (passTokenCache.refreshToken) {
      this.currentClient = this.defaultBuilder
        .withRefreshTokenFlow(
          this.getRefreshOptions(passTokenCache.refreshToken),
        )
        .build();
    }
    // else if (anonymTokenCache.refreshToken) {
    //   this.currentClient = this.defaultBuilder
    //     .withRefreshTokenFlow(
    //       this.getRefreshOptions(anonymTokenCache.refreshToken),
    //     )
    //     .build();
    // }
    else {
      this.currentClient = this.defaultBuilder
        .withClientCredentialsFlow(ClientBuilderManager.authMiddlewareOptions)
        .build();
    }
  }

  public get requestCurrentBuilder() {
    return createApiBuilderFromCtpClient(this.currentClient).withProjectKey({
      projectKey: ClientBuilderManager.basicOptions.projectKey,
    });
  }

  public async switchToCredentialsFlow(): Promise<void> {
    this.currentClient = this.defaultBuilder
      .withClientCredentialsFlow(ClientBuilderManager.authMiddlewareOptions)
      .build();
  }

  public async switchToAnonymFlow(): Promise<void> {
    this.currentClient = this.defaultBuilder
      .withAnonymousSessionFlow(
        ClientBuilderManager.anonymAuthMiddlewareOptions,
      )
      .build();
  }

  public async switchToPasswordFlow(user: UserAuthOptions): Promise<void> {
    this.currentClient = this.defaultBuilder
      .withPasswordFlow(this.getPassOptions(user))
      .build();
  }

  public async switchToRefreshTokenFlow(refreshToken: string): Promise<void> {
    this.currentClient = this.defaultBuilder
      .withRefreshTokenFlow(this.getRefreshOptions(refreshToken))
      .build();
  }

  public async switchToSignupFlow(): Promise<void> {
    this.currentClient = this.defaultBuilder
      .withAnonymousSessionFlow(this.getSignupOptions())
      .build();
  }

  private static basicOptions = {
    projectKey: process.env.REACT_APP_PROJECT_KEY || "",
    authHost: process.env.REACT_APP_AUTH_URL || "",
    apiHost: process.env.REACT_APP_API_URL || "",
    defaultScopes: [process.env.REACT_APP_SCOPES || ""],
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
  };

  private static customerScopes: string[] =
    ClientBuilderManager.getCustomerScopes();

  private static authMiddlewareOptions =
    ClientBuilderManager.getAuthMiddlewareOptions();

  private static httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: ClientBuilderManager.basicOptions.apiHost,
    fetch,
  };

  private static anonymAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    ...ClientBuilderManager.authMiddlewareOptions,
    tokenCache: {
      get: () => passTokenManager.getToken(),
      set: (cache: TokenStore) => passTokenManager.setToken(cache),
    },
  };

  private static getCustomerScopes() {
    const scopes = ClientBuilderManager.basicOptions.defaultScopes;
    const customerScope = scopes[0];
    const customerScopes = [
      customerScope.replace(" manage_customers:ec-app", ""),
    ];

    return customerScopes;
  }

  private static getAuthMiddlewareOptions() {
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: ClientBuilderManager.basicOptions.authHost,
      projectKey: ClientBuilderManager.basicOptions.projectKey,
      credentials: {
        clientId: ClientBuilderManager.basicOptions.clientId,
        clientSecret: ClientBuilderManager.basicOptions.clientSecret,
      },
      scopes: ClientBuilderManager.customerScopes,
      fetch,
    };

    return authMiddlewareOptions;
  }

  private getPassOptions(user: UserAuthOptions) {
    const passOptions: PasswordAuthMiddlewareOptions = {
      ...ClientBuilderManager.authMiddlewareOptions,
      credentials: {
        clientId: ClientBuilderManager.basicOptions.clientId,
        clientSecret: ClientBuilderManager.basicOptions.clientSecret,
        user,
      },
      tokenCache: {
        get: () => passTokenManager.getToken(),
        set: (cache: TokenStore) => passTokenManager.setToken(cache),
      },
    };

    return passOptions;
  }

  private getSignupOptions() {
    const signupAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
      ...ClientBuilderManager.authMiddlewareOptions,
      scopes: ClientBuilderManager.basicOptions.defaultScopes,
    };

    return signupAuthMiddlewareOptions;
  }

  private getRefreshOptions(refreshToken: string) {
    const refreshOptions: RefreshAuthMiddlewareOptions = {
      ...ClientBuilderManager.authMiddlewareOptions,
      refreshToken,
      tokenCache: {
        get: () => passTokenManager.getToken(),
        set: (cache: TokenStore) => passTokenManager.setToken(cache),
      },
    };
    return refreshOptions;
  }
}

export const clientBuilderManager = new ClientBuilderManager();

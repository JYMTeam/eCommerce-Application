import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  AnonymousAuthMiddlewareOptions,
  AuthMiddlewareOptions,
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  UserAuthOptions,
} from "@commercetools/sdk-client-v2";
import { anonymTokenCache, passToken } from "../PassTokenCache/PassTokenCache";

export class ClientBuilderManager {
  private currentClient: Client = new ClientBuilder()
    .withProjectKey(ClientBuilderManager.basicOptions.projectKey)
    .withClientCredentialsFlow(ClientBuilderManager.authMiddlewareOptions)
    .withHttpMiddleware(ClientBuilderManager.httpMiddlewareOptions)
    .build();

  public get requestCurrentBuilder() {
    return createApiBuilderFromCtpClient(this.currentClient).withProjectKey({
      projectKey: ClientBuilderManager.basicOptions.projectKey,
    });
  }

  public async switchToCredentialsFlow(): Promise<void> {
    this.currentClient = new ClientBuilder()
      .withProjectKey(ClientBuilderManager.basicOptions.projectKey)
      .withClientCredentialsFlow(ClientBuilderManager.authMiddlewareOptions)
      .withHttpMiddleware(ClientBuilderManager.httpMiddlewareOptions)
      .build();
  }

  public async switchToAnonymFlow(): Promise<void> {
    this.currentClient = new ClientBuilder()
      .withProjectKey(ClientBuilderManager.basicOptions.projectKey)
      .withAnonymousSessionFlow(
        ClientBuilderManager.anonymAuthMiddlewareOptions,
      )
      .withHttpMiddleware(ClientBuilderManager.httpMiddlewareOptions)
      .build();
  }

  public async switchToPasswordFlow(user: UserAuthOptions): Promise<void> {
    this.currentClient = new ClientBuilder()
      .withProjectKey(ClientBuilderManager.basicOptions.projectKey)
      .withPasswordFlow(this.getPassOptions(user))
      .withHttpMiddleware(ClientBuilderManager.httpMiddlewareOptions)
      .build();
  }

  public async switchToRefreshTokenFlow(refreshToken: string): Promise<void> {
    this.currentClient = new ClientBuilder()
      .withProjectKey(ClientBuilderManager.basicOptions.projectKey)
      .withRefreshTokenFlow(this.getRefreshOptions(refreshToken))
      .withHttpMiddleware(ClientBuilderManager.httpMiddlewareOptions)
      .build();
  }

  public async switchToSignupFlow(): Promise<void> {
    this.currentClient = new ClientBuilder()
      .withProjectKey(ClientBuilderManager.basicOptions.projectKey)
      .withAnonymousSessionFlow(this.getSignupOptions())
      .withHttpMiddleware(ClientBuilderManager.httpMiddlewareOptions)
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
    tokenCache: anonymTokenCache,
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
      tokenCache: passToken,
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
    };
    return refreshOptions;
  }
}

export const clientBuilderManager = new ClientBuilderManager();

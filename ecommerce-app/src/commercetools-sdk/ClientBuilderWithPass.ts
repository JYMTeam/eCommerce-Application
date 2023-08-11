import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  authMiddlewareOptions,
  httpMiddlewareOptions,
  projectKey,
} from "./ClientBuilder";
import {
  Client,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
} from "@commercetools/sdk-client-v2";
import { myToken } from "./MyTokenCache";

export let passOptions: PasswordAuthMiddlewareOptions | null = null;

const getApiPassRootBuilder = () => {
  let user: UserAuthOptions;

  // here is a closure for user
  // so that the function remembers the user's login and password
  return (userAuthOptions?: UserAuthOptions) => {
    let client: Client | null = null;

    if (userAuthOptions) {
      user = userAuthOptions;
    }

    if (user) {
      passOptions = {
        host: authMiddlewareOptions.host,
        projectKey: authMiddlewareOptions.projectKey,
        credentials: {
          clientId: authMiddlewareOptions.credentials.clientId,
          clientSecret: authMiddlewareOptions.credentials.clientSecret,
          user: user,
        },
        tokenCache: myToken,
      };
    }

    if (passOptions) {
      client = new ClientBuilder()
        .withProjectKey(projectKey)
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withPasswordFlow(passOptions) // required for password
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware() // Include middleware for logging
        .build();
    }

    return createApiBuilderFromCtpClient(client);
  };
};

// when you need a new login call - getApiPassRoot(userAuthOptions)
// when you need the old login call - getApiPassRoot()
export const getApiPassRoot = getApiPassRootBuilder();

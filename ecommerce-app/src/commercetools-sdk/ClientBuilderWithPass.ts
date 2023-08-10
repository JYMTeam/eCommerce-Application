import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  authMiddlewareOptions,
  httpMiddlewareOptions,
  projectKey,
} from "./ClientBuilder";
import {
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
} from "@commercetools/sdk-client-v2";

export const getApiPassRoot = (userAuthOptions: UserAuthOptions) => {
  const passOptions: PasswordAuthMiddlewareOptions = {
    host: authMiddlewareOptions.host,
    projectKey: authMiddlewareOptions.projectKey,
    credentials: {
      clientId: authMiddlewareOptions.credentials.clientId,
      clientSecret: authMiddlewareOptions.credentials.clientSecret,
      user: userAuthOptions,
    },
  };

  const client = new ClientBuilder()
    .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withPasswordFlow(passOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();
  return createApiBuilderFromCtpClient(client);
};

import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  Client,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
} from "@commercetools/sdk-client-v2";
import { passToken } from "../PassTokenCache";
import {
  authMiddlewareOptions,
  defaultClient,
  getCustomerScopes,
  projectKey,
} from "./ClientBuilderDefault";

export const getApiPassRoot = (userAuthOptions: UserAuthOptions) => {
  let user: UserAuthOptions | null = null;
  let client: Client | null = null;

  user = userAuthOptions;

  const passOptions: PasswordAuthMiddlewareOptions = {
    host: process.env.REACT_APP_AUTH_URL || "",
    projectKey: projectKey,
    credentials: {
      clientId: process.env.REACT_APP_CLIENT_ID || "",
      clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
      user: user,
    },
    scopes: getCustomerScopes(),
    tokenCache: passToken,
  };

  client = defaultClient
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withPasswordFlow(passOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

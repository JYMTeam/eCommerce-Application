import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  Client,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
} from "@commercetools/sdk-client-v2";
import { passToken } from "../../PassTokenCache/PassTokenCache";
import {
  defaultClient,
  getAuthMiddlewareOptions,
  projectKey,
} from "./ClientBuilderDefault";

export const getApiPassRoot = (userAuthOptions: UserAuthOptions) => {
  let user: UserAuthOptions | null = null;
  let client: Client | null = null;

  user = userAuthOptions;
  const authMiddlewareOptions = getAuthMiddlewareOptions();
  const passOptions: PasswordAuthMiddlewareOptions = {
    ...authMiddlewareOptions,
    credentials: {
      clientId: process.env.REACT_APP_CLIENT_ID || "",
      clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
      user: user,
    },
    tokenCache: passToken,
  };

  client = defaultClient
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withPasswordFlow(passOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

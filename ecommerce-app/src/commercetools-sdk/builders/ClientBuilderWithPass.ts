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
  projectKey,
} from "./ClientBuilderDefault";

export const getApiPassRoot = (userAuthOptions?: UserAuthOptions) => {
  let user: UserAuthOptions | null = null;
  let client: Client | null = null;

  if (userAuthOptions) {
    user = userAuthOptions;

    const passOptions: PasswordAuthMiddlewareOptions = {
      host: authMiddlewareOptions.host,
      projectKey: authMiddlewareOptions.projectKey,
      credentials: {
        clientId: authMiddlewareOptions.credentials.clientId,
        clientSecret: authMiddlewareOptions.credentials.clientSecret,
        user: user,
      },
      tokenCache: passToken,
    };

    client = defaultClient.withPasswordFlow(passOptions).build();
  }

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  ExistingTokenMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
} from "@commercetools/sdk-client-v2";
import {
  defaultClient,
  getAuthMiddlewareOptions,
  projectKey,
} from "./ClientBuilderDefault";
import { passToken } from "../PassTokenCache/PassTokenCache";

export const getApiTokenRoot = (existingToken: string) => {
  const authorization = `Bearer ${existingToken}`;
  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };

  const client = defaultClient
    .withExistingTokenFlow(authorization, options)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

export const getApiTokenPassRoot = (
  userAuthOptions: UserAuthOptions,
  existingToken: string,
) => {
  const authorization = `Bearer ${existingToken}`;
  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };
  const authMiddlewareOptions = getAuthMiddlewareOptions();
  const passOptions: PasswordAuthMiddlewareOptions = {
    ...authMiddlewareOptions,
    credentials: {
      clientId: process.env.REACT_APP_CLIENT_ID || "",
      clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
      user: userAuthOptions,
    },
    tokenCache: passToken,
  };
  const client = defaultClient
    .withExistingTokenFlow(authorization, options)
    .withPasswordFlow(passOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

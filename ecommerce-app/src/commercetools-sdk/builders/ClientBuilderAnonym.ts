import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
} from "@commercetools/sdk-client-v2";

import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  // defaultClient,
  getAuthMiddlewareOptions,
  httpMiddlewareOptions,
  projectKey,
} from "./ClientBuilderDefault";
import { anonymTokenCache } from "../PassTokenCache/PassTokenCache";

export const getApiAnonymRoot = () => {
  const authMiddlewareOptions = getAuthMiddlewareOptions();
  const anonymAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    ...authMiddlewareOptions,
    tokenCache: anonymTokenCache,
  };

  const anonymClient = new ClientBuilder()
    .withAnonymousSessionFlow(anonymAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(anonymClient).withProjectKey({
    projectKey,
  });
};

export const anonymRoot = getApiAnonymRoot();

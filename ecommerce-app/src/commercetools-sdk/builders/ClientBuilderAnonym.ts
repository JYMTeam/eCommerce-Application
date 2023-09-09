import { AnonymousAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";

import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  defaultClient,
  getAuthMiddlewareOptions,
  projectKey,
} from "./ClientBuilderDefault";
import { anonymTokenCache } from "../PassTokenCache/PassTokenCache";

export const getApiAnonymRoot = () => {
  const authMiddlewareOptions = getAuthMiddlewareOptions();
  const anonymAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    ...authMiddlewareOptions,
    tokenCache: anonymTokenCache,
  };

  const anonymClient = defaultClient
    .withAnonymousSessionFlow(anonymAuthMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(anonymClient).withProjectKey({
    projectKey,
  });
};

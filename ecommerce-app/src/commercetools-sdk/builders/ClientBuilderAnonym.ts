import { AnonymousAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";

import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  defaultClient,
  getAuthMiddlewareOptions,
  projectKey,
} from "./ClientBuilderDefault";

export const getApiAnonymRoot = () => {
  const authMiddlewareOptions = getAuthMiddlewareOptions();
  const anonymAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    ...authMiddlewareOptions,
  };

  const anonymClient = defaultClient
    .withAnonymousSessionFlow(anonymAuthMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(anonymClient).withProjectKey({
    projectKey,
  });
};

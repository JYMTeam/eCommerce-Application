import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { RefreshAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import {
  defaultClient,
  getAuthMiddlewareOptions,
  projectKey,
} from "./ClientBuilderDefault";

export const getApiRefreshTokenRoot = (existingRefreshToken: string) => {
  const authMiddlewareOptions = getAuthMiddlewareOptions();

  const refreshOptions: RefreshAuthMiddlewareOptions = {
    ...authMiddlewareOptions,
    refreshToken: existingRefreshToken,
  };

  const client = defaultClient.withRefreshTokenFlow(refreshOptions).build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

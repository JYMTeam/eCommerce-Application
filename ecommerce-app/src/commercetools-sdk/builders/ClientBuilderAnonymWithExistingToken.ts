import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { ExistingTokenMiddlewareOptions } from "@commercetools/sdk-client-v2";
import { defaultClient, projectKey } from "./ClientBuilderDefault";

export const getApiAnonymTokenRoot = (existingToken: string) => {
  const authorization = `Bearer ${existingToken}`;
  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };

  const client = defaultClient
    .withExistingTokenFlow(authorization, options)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

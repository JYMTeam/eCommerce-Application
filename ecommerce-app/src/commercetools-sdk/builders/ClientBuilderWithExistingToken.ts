import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  // Client,
  ExistingTokenMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
// import { passToken } from "../PassTokenCache";
import { defaultClient, projectKey } from "./ClientBuilderDefault";

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

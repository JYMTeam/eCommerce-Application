import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  Client,
  ExistingTokenMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import { passToken } from "../PassTokenCache";
import { defaultClient, projectKey } from "./ClientBuilderDefault";

const options: ExistingTokenMiddlewareOptions = {
  force: true,
};

export const getApiTokenRoot = () => {
  let client: Client | null = null;
  const existingToken = passToken.get().token;

  if (existingToken !== "") {
    const authorization = `Bearer ${existingToken}`;

    client = defaultClient
      .withExistingTokenFlow(authorization, options)
      .build();
  }
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

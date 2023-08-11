import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { httpMiddlewareOptions, projectKey } from "./ClientBuilder";
import {
  Client,
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import { myToken } from "./MyTokenCache";

const options: ExistingTokenMiddlewareOptions = {
  force: true,
};

export const getApiTokenRoot = () => {
  console.log("token with api root");
  let client: Client | null = null;

  const newToken = myToken.get().token;

  if (newToken) {
    console.log("newToken");
    console.log(newToken);
    client = new ClientBuilder()
      .withProjectKey(projectKey)
      .withExistingTokenFlow("Bearer " + newToken, options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware() // Include middleware for logging
      .build();

    console.log("client");
    console.log(client);
  }

  return createApiBuilderFromCtpClient(client);
};

// export const getApiTokenRoot = getApiPassRootBuilder;

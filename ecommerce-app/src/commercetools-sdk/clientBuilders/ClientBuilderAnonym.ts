import { AnonymousAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";

import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  customerScopes,
  defaultClient,
  projectKey,
} from "./ClientBuilderDefault";

export const anonymAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: process.env.REACT_APP_AUTH_URL || "",
  projectKey: projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
  },
  scopes: customerScopes,
  fetch,
};

export const anonymClient = defaultClient
  .withAnonymousSessionFlow(anonymAuthMiddlewareOptions)
  .build();

export const getApiAnonymRoot = () => {
  return createApiBuilderFromCtpClient(anonymClient).withProjectKey({
    projectKey,
  });
};

import { AnonymousAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";

import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  defaultClient,
  getCustomerScopes,
  projectKey,
} from "./ClientBuilderDefault";

export const getApiAnonymRoot = () => {
  const anonymAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: process.env.REACT_APP_AUTH_URL || "",
    projectKey: projectKey,
    credentials: {
      clientId: process.env.REACT_APP_CLIENT_ID || "",
      clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
    },
    scopes: getCustomerScopes(),
    fetch,
  };

  const anonymClient = defaultClient
    .withAnonymousSessionFlow(anonymAuthMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(anonymClient).withProjectKey({
    projectKey,
  });
};

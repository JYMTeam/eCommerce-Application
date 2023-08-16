import { AnonymousAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";

import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { defaultClient, projectKey, scopes } from "./ClientBuilderDefault";

export const signupOptions: AnonymousAuthMiddlewareOptions = {
  host: process.env.REACT_APP_AUTH_URL || "",
  projectKey: projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
  },
  scopes,
  fetch,
};

export const signupClient = defaultClient
  .withAnonymousSessionFlow(signupOptions)
  .build();

export const getApiSignupRoot = () => {
  return createApiBuilderFromCtpClient(signupClient).withProjectKey({
    projectKey,
  });
};

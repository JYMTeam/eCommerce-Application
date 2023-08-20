import { AnonymousAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  defaultClient,
  getDefaultScopes,
  projectKey,
} from "./ClientBuilderDefault";

export const getApiSignupRoot = () => {
  const scopes = getDefaultScopes();
  const signupOptions: AnonymousAuthMiddlewareOptions = {
    host: process.env.REACT_APP_AUTH_URL || "",
    projectKey: projectKey,
    credentials: {
      clientId: process.env.REACT_APP_CLIENT_ID || "",
      clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
    },
    scopes,
    fetch,
  };

  const signupClient = defaultClient
    .withAnonymousSessionFlow(signupOptions)
    .build();

  return createApiBuilderFromCtpClient(signupClient).withProjectKey({
    projectKey,
  });
};

import { AnonymousAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  defaultClient,
  getAuthMiddlewareOptions,
  getDefaultScopes,
  projectKey,
} from "./ClientBuilderDefault";

export const getApiSignupRoot = () => {
  const scopes = getDefaultScopes();
  const authMiddlewareOptions = getAuthMiddlewareOptions();
  const signupOptions: AnonymousAuthMiddlewareOptions = {
    ...authMiddlewareOptions,
    scopes,
  };

  const signupClient = defaultClient
    .withAnonymousSessionFlow(signupOptions)
    .build();

  return createApiBuilderFromCtpClient(signupClient).withProjectKey({
    projectKey,
  });
};

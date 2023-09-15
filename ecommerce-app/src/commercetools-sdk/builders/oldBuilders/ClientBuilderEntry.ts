import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  defaultClient,
  getAuthMiddlewareOptions,
  projectKey,
} from "./ClientBuilderDefault";

export const getApiEntryRoot = () => {
  const authMiddlewareOptions = getAuthMiddlewareOptions();
  const entryClient = defaultClient
    .withClientCredentialsFlow(authMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(entryClient).withProjectKey({
    projectKey,
  });
};

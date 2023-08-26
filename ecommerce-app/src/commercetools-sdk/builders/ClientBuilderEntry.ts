import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  authMiddlewareOptions,
  defaultClient,
  projectKey,
} from "./ClientBuilderDefault";

export const getApiEntryRoot = () => {
  const entryClient = defaultClient
    .withClientCredentialsFlow(authMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(entryClient).withProjectKey({
    projectKey,
  });
};

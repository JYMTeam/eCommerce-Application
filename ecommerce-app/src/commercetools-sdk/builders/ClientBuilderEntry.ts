import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  authMiddlewareOptions,
  defaultClient,
  projectKey,
} from "./ClientBuilderDefault";

const getEntryClient = () => {
  const entryClient = defaultClient
    .withClientCredentialsFlow(authMiddlewareOptions)
    .build();
  return entryClient;
};

export const getApiEntryRoot = () => {
  const entryClient = getEntryClient();
  return createApiBuilderFromCtpClient(entryClient).withProjectKey({
    projectKey,
  });
};

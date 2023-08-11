// import fetch from "node-fetch";
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  AnonymousAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";

import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

export const projectKey = process.env.REACT_APP_PROJECT_KEY || "";
const scope = process.env.REACT_APP_SCOPES || "";
const scopes = [scope];

// export const token = ;

// Configure authMiddlewareOptions
export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: "https://auth.europe-west1.gcp.commercetools.com",
  projectKey: projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
  },
  scopes,
  fetch,
};

// Configure authMiddlewareOptions
export const anonymAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: "https://auth.europe-west1.gcp.commercetools.com",
  projectKey: projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: "https://api.europe-west1.gcp.commercetools.com",
  fetch,
};

// Export the ClientBuilder
export const client = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withAnonymousSessionFlow(anonymAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

export const getApiRoot = () => {
  return createApiBuilderFromCtpClient(client);
};

import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";

export const projectKey = process.env.REACT_APP_PROJECT_KEY || "";
export const scopes = [process.env.REACT_APP_SCOPES || ""];
export const customerScopes = [
  scopes[0].replace(" manage_customers:ec-app", ""),
];

// Configure authMiddlewareOptions
export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.REACT_APP_AUTH_URL || "",
  projectKey: projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
  },
  scopes: customerScopes,
  fetch,
};

// Configure httpMiddlewareOptions
export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_API_URL || "",
  fetch,
};

export const defaultClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  // .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware(); // Include middleware for logging
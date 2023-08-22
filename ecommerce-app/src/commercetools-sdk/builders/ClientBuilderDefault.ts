import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";

export const projectKey = process.env.REACT_APP_PROJECT_KEY || "";

export const getDefaultScopes = () => {
  const scopes = [process.env.REACT_APP_SCOPES || ""];
  return scopes;
};

export const getCustomerScopes = () => {
  const scopes = [process.env.REACT_APP_SCOPES || ""];
  const customerScope = scopes[0];
  const customerScopes = [
    customerScope.replace(" manage_customers:ec-app", ""),
  ];

  return customerScopes;
};

// Configure authMiddlewareOptions
export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.REACT_APP_AUTH_URL || "",
  projectKey: projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
  },
  scopes: getCustomerScopes(),
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
  .withHttpMiddleware(httpMiddlewareOptions);
// .withLoggerMiddleware(); // Include middleware for logging

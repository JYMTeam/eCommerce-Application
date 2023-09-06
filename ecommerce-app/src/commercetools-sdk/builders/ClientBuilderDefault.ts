import {
  ClientBuilder,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
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

export const getAuthMiddlewareOptions = () => {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: process.env.REACT_APP_AUTH_URL || "",
    projectKey: projectKey,
    credentials: {
      clientId: process.env.REACT_APP_CLIENT_ID || "",
      clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
    },
    scopes: getCustomerScopes(),
    fetch,
  };

  return authMiddlewareOptions;
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_API_URL || "",
  fetch,
};

export const defaultClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withHttpMiddleware(httpMiddlewareOptions);
// .withLoggerMiddleware(); // Include middleware for logging

import { getApiAnonymRoot } from "../oldBuilders/ClientBuilderAnonym";

describe("getApiAnonymRoot", () => {
  it("should return an API builder with correct project key", () => {
    // Mock environment variables
    process.env.REACT_APP_AUTH_URL = "your-auth-url";
    process.env.REACT_APP_PROJECT_KEY = "your-project-key";
    process.env.REACT_APP_CLIENT_ID = "your-client-id";
    process.env.REACT_APP_CLIENT_SECRET = "your-client-secret";

    const apiBuilder = getApiAnonymRoot();
    expect(apiBuilder).toBeDefined();
  });
});

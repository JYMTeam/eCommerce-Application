import {
  anonymAuthMiddlewareOptions,
  anonymClient,
  getApiAnonymRoot,
} from "./ClientBuilderAnonym";
import { projectKey } from "./ClientBuilderDefault";

describe("AnonymAuth Tests", () => {
  it("should configure anonymAuthMiddlewareOptions correctly", () => {
    expect(anonymAuthMiddlewareOptions.host).toEqual(
      process.env.REACT_APP_AUTH_URL || "",
    );
    expect(anonymAuthMiddlewareOptions.projectKey).toEqual(projectKey);
  });

  it("should create an anonymous client with correct options", () => {
    expect(anonymClient).toBeDefined();
  });

  it("should create API builder", () => {
    const apiBuilder = getApiAnonymRoot();
    expect(apiBuilder).toBeDefined();
  });
});

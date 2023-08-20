import { getApiTokenRoot } from "./ClientBuilderWithExistingToken"; // Подставьте правильный путь

describe("getApiTokenRoot", () => {
  it("should create an API token root with existing token", () => {
    const existingToken = "your-existing-token";

    const apiTokenRoot = getApiTokenRoot(existingToken);

    expect(apiTokenRoot).toBeDefined();
  });
});

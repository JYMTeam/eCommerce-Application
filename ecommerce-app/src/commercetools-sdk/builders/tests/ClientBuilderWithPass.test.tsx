import { UserAuthOptions } from "@commercetools/sdk-client-v2";
import { getApiPassRoot } from "../ClientBuilderWithPass";

describe("getApiPassRoot", () => {
  it("should create an API pass root with user authentication options", () => {
    const userAuthOptions: UserAuthOptions = {
      username: "your-username",
      password: "your-password",
    };
    const apiPassRoot = getApiPassRoot(userAuthOptions);
    expect(apiPassRoot).toBeDefined();
  });
});

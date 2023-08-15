import { UserAuthOptions } from "@commercetools/sdk-client-v2";
import { passToken } from "./PassTokenCache";
import { getApiPassRoot } from "./ClientBuilderWithPass";

jest.mock("./PassTokenCache", () => ({
  passToken: {
    get: jest.fn(),
  },
}));

describe("getApiPassRoot Tests", () => {
  const userAuthOptions: UserAuthOptions = {
    username: "testUser",
    password: "testPassword",
  };

  beforeEach(() => {
    (passToken.get as jest.Mock).mockReturnValue({ token: "mocked-token" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create API builder with correct userAuthOptions", () => {
    const apiBuilder = getApiPassRoot(userAuthOptions);
    expect(apiBuilder).toBeDefined();
  });
});

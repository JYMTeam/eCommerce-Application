import { AT_SIGN_DOMAIN_REGEX } from "./constants";

it("matches email with @ sign followed by domain", () => {
  const exampleEmail = "user@example.com";
  expect(exampleEmail).toMatch(AT_SIGN_DOMAIN_REGEX);
});

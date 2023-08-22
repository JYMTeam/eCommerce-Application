import {
  AT_SIGN_DOMAIN_REGEX,
  UPPERCASE_LETTER_REGEX,
  LOWERCASE_LETTER_REGEX,
  DIGIT_REGEX,
  NO_SPACE_REGEX,
  NO_SPECIAL_CHARS_REGEX,
  NO_DIGIT_REGEX,
} from "./constants";

describe("domain and at sign regex", () => {
  it("matches email with @ sign followed by domain in latin", () => {
    const exampleEmail = "user@example.com";
    expect(exampleEmail).toMatch(AT_SIGN_DOMAIN_REGEX);
  });

  it("does not pass if there is no @ sign", () => {
    const exampleStr = "user.example.com";
    expect(exampleStr).not.toMatch(AT_SIGN_DOMAIN_REGEX);
  });

  it("does not pass if there is no latin domain after @ sign", () => {
    const exampleStr = "user@example";
    expect(exampleStr).not.toMatch(AT_SIGN_DOMAIN_REGEX);
  });
});

describe("uppercase letter regex", () => {
  it("contains at least one uppercase letter in latin", () => {
    const exampleStr = "Secret1";
    expect(exampleStr).toMatch(UPPERCASE_LETTER_REGEX);
  });

  it("does not pass if there is no at least one uppercase letter in latin", () => {
    const exampleStr = "secret1";
    expect(exampleStr).not.toMatch(UPPERCASE_LETTER_REGEX);
  });
});

describe("lowercase letter regex", () => {
  it("contains at least one lowercase letter in latin", () => {
    const exampleStr = "Secret1";
    expect(exampleStr).toMatch(LOWERCASE_LETTER_REGEX);
  });

  it("does not pass if there is no at least one lowercase letter in latin", () => {
    const exampleStr = "SECRET1";
    expect(exampleStr).not.toMatch(LOWERCASE_LETTER_REGEX);
  });
});

describe("digit regex", () => {
  it("contains at least one digit", () => {
    const exampleStr = "Secret1";
    expect(exampleStr).toMatch(DIGIT_REGEX);
  });

  it("does not pass if there is no digits", () => {
    const exampleStr = "Secret";
    expect(exampleStr).not.toMatch(DIGIT_REGEX);
  });
});

describe("no space regex", () => {
  it("does not contain spaces", () => {
    const exampleStr = "Secret1";
    expect(exampleStr).toMatch(NO_SPACE_REGEX);
  });

  it("does not pass if there is at least one space", () => {
    const exampleStr = "Secr et1";
    expect(exampleStr).not.toMatch(NO_SPACE_REGEX);
  });
});

describe("special characters regex", () => {
  it("does not contain special characters", () => {
    const exampleStr = "Secret1";
    expect(exampleStr).toMatch(NO_SPECIAL_CHARS_REGEX);
  });

  it("does not pass if there is at least one special character", () => {
    const exampleStr = "Secret1!";
    expect(exampleStr).not.toMatch(NO_SPECIAL_CHARS_REGEX);
  });
});

describe("no digit regex", () => {
  it("does not contain digits", () => {
    const exampleStr = "Secret";
    expect(exampleStr).toMatch(NO_DIGIT_REGEX);
  });

  it("does not pass if there is at least one digit", () => {
    const exampleStr = "Secret1";
    expect(exampleStr).not.toMatch(NO_DIGIT_REGEX);
  });
});

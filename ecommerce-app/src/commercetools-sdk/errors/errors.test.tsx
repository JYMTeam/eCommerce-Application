import {
  AuthErrorResponse,
  DuplicateFieldError,
  InvalidCredentialsError,
  InvalidFieldError,
} from "@commercetools/platform-sdk";
import { formatAuthErrorMessage } from "./errors";

describe("formatAuthErrorMessage", () => {
  it("should return server error message for 5xx status codes", () => {
    const error: AuthErrorResponse = {
      statusCode: 500,
      error: "server_error",
      errors: [],
      message: "Server error",
    };
    const errorMessage = formatAuthErrorMessage(error);
    expect(errorMessage).toBe("Server error. Please try again later.");
  });

  it('should return "User not found" message for invalid credentials', () => {
    const error: AuthErrorResponse = {
      statusCode: 400,
      error: "invalid_credentials",
      errors: [{ code: "InvalidCredentials" } as InvalidCredentialsError],
      message: "Invalid account credentials",
    };
    const errorMessage = formatAuthErrorMessage(error);
    expect(errorMessage).toBe(
      "User with this password and/or email was not found",
    );
  });

  it('should return "User with this email already exists" message for duplicate email', () => {
    const error: AuthErrorResponse = {
      statusCode: 400,
      error: "invalid_input",
      errors: [{ code: "DuplicateField" } as DuplicateFieldError],
      message: "Email already exists",
    };
    const errorMessage = formatAuthErrorMessage(error);
    expect(errorMessage).toBe("User with this email already exists");
  });

  it("should return default error message for unknown errors", () => {
    const error: AuthErrorResponse = {
      statusCode: 400,
      error: "invalid_error",
      errors: [{ code: "InvalidField" } as InvalidFieldError],
      message: "Invalid field",
    };
    const errorMessage = formatAuthErrorMessage(error);
    expect(errorMessage).toBe(
      "An unexpected error occurred. Please try again later.",
    );
  });
});

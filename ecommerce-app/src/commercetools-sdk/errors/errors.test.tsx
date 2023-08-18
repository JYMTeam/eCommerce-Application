import {
  AuthErrorResponse,
  InvalidCredentialsError,
  InvalidFieldError,
} from "@commercetools/platform-sdk";
import { formatErrorMessage } from "./errors";

describe("formatErrorMessage", () => {
  it("should return server error message for 5xx status codes", () => {
    const error: AuthErrorResponse = {
      statusCode: 500,
      error: "server_error",
      errors: [],
      message: "Server error",
    };
    const errorMessage = formatErrorMessage(error);
    expect(errorMessage).toBe("Server error. Please try again later.");
  });

  it('should return "User not found" message for invalid credentials', () => {
    const error: AuthErrorResponse = {
      statusCode: 400,
      error: "invalid_credentials",
      errors: [{ code: "InvalidCredentials" } as InvalidCredentialsError],
      message: "Invalid account credentials",
    };
    const errorMessage = formatErrorMessage(error);
    expect(errorMessage).toBe(
      "User with this password and/or email was not found",
    );
  });

  it("should return default error message for unknown errors", () => {
    const error: AuthErrorResponse = {
      statusCode: 400,
      error: "invalid_error",
      errors: [{ code: "InvalidField" } as InvalidFieldError],
      message: "Invalid field",
    };
    const errorMessage = formatErrorMessage(error);
    expect(errorMessage).toBe("An error occurred. Please try again later.");
  });
});

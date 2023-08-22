import { AuthErrorResponse } from "@commercetools/platform-sdk/dist/declarations/src/generated/models/error";

export const formatErrorMessage = (error: AuthErrorResponse): string => {
  if (
    error.statusCode === 500 ||
    error.statusCode === 501 ||
    error.statusCode === 502 ||
    error.statusCode === 503 ||
    error.statusCode === 504
  ) {
    return "Server error. Please try again later.";
  }
  if (error.statusCode === 400) {
    if (
      error.error === "invalid_customer_account_credentials" ||
      error.errors[0].code === "InvalidCredentials"
    ) {
      return "User with this password and/or email was not found";
    }

    if (error.errors[0].code === "DuplicateField") {
      return "User with this email already exists";
    }

    if (
      error.errors[0].code === "InvalidOperation" ||
      error.errors[0].code === "InvalidJsonInput"
    ) {
      return "The server did not receive your data correctly. Please try again.";
    }

    if (error.errors[0].code === "MaxResourceLimitExceeded") {
      return "Unfortunately, too many users have been created. Limit reached. Please try again later.";
    }
  }
  return "An error occurred. Please try again later.";
};

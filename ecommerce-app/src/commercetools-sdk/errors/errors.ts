import {
  AuthErrorResponse,
  ErrorResponse,
} from "@commercetools/platform-sdk/dist/declarations/src/generated/models/error";

export enum statusCode {
  "OK" = 200,
  "BAD_REQUEST" = 400,
  "UNAUTHORIZED" = 401,
  "NOT_FOUND" = 404,
  "TOO_MANY_REQUESTS" = 429,
  "SERVER_ERROR" = 500,
}

export const NOT_FOUND_MESSAGE = "404: Sorry, resource not found";
export const NOT_CORRECT_PASSWORD_MESSAGE =
  "The given current password does not match";

const DEFAULT_ERROR_MESSAGE =
  "An unexpected error occurred. Please try again later.";

const serverErrorMessage = (statusCode: number) => {
  if ([500, 501, 502, 503, 504].includes(statusCode)) {
    return "Server error. Please try again later.";
  }
};

export const formatAuthErrorMessage = (error: AuthErrorResponse): string => {
  const serverError = serverErrorMessage(error.statusCode);
  if (serverError) return serverError;
  if (error.statusCode === statusCode.BAD_REQUEST) {
    if (
      error.error === "invalid_customer_account_credentials" ||
      error.errors[0].code === "InvalidCredentials"
    ) {
      return "User with this password and/or email was not found";
    }

    if (error.errors[0].code === "DuplicateField") {
      return "User with this email already exists";
    }

    if (error.errors[0].code === "InvalidCurrentPassword") {
      return NOT_CORRECT_PASSWORD_MESSAGE;
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
  return DEFAULT_ERROR_MESSAGE;
};

export const formatProductsErrorMessage = (error: ErrorResponse): string => {
  const serverError = serverErrorMessage(error.statusCode);
  if (serverError) return serverError;

  if (error.statusCode === statusCode.UNAUTHORIZED) {
    return "401: Unauthorized. Sorry, your request could not be processed";
  }

  if (error.statusCode === statusCode.NOT_FOUND) {
    return NOT_FOUND_MESSAGE;
  }

  return DEFAULT_ERROR_MESSAGE;
};

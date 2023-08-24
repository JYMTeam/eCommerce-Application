import {
  AuthErrorResponse,
  ErrorResponse,
} from "@commercetools/platform-sdk/dist/declarations/src/generated/models/error";
import { statusCode } from "../../types";

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
  return DEFAULT_ERROR_MESSAGE;
};

export const formatProductsErrorMessage = (error: ErrorResponse): string => {
  const serverError = serverErrorMessage(error.statusCode);
  if (serverError) return serverError;

  if (error.statusCode === statusCode.UNATHORIZED) {
    return "401: Unauthorized. Sorry, your request could not be processed";
  }

  return DEFAULT_ERROR_MESSAGE;
};

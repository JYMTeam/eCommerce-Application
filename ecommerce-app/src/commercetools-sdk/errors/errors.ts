import { AuthErrorResponse } from "@commercetools/platform-sdk/dist/declarations/src/generated/models/error";

export const formatErrorMessage = (error: AuthErrorResponse): string => {
  // if (!error || !error.statusCode || !error.message ) {
  //   return "An unknown error occurred. Please try again later.";
  // }
  console.log("statusCode");
  console.log(error.statusCode);
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
      return "User with this password and email was not found";
    }
  }
  return "An error occurred. Please try again later.";
};

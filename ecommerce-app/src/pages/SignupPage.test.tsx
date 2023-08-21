import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SignupPage } from "./SignupPage";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { Theme } from "../components/Theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { setupStore } from "../store";

describe("SignupPage", () => {
  it("renders sign up header", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={Theme}>
            <BrowserRouter>
              <SignupPage />
            </BrowserRouter>
          </ThemeProvider>
        </LocalizationProvider>
      </Provider>,
    );

    const header = screen.getByText("Sign up here");
    expect(header).toBeInTheDocument();
  });

  it("renders SignupForm component", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={Theme}>
            <BrowserRouter>
              <SignupPage />
            </BrowserRouter>
          </ThemeProvider>
        </LocalizationProvider>
      </Provider>,
    );

    const signupForm = screen.getByTestId("signup-form"); // Use the correct test ID
    expect(signupForm).toBeInTheDocument();
  });

  it("renders link to login page", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={Theme}>
            <BrowserRouter>
              <SignupPage />
            </BrowserRouter>
          </ThemeProvider>
        </LocalizationProvider>
      </Provider>,
    );

    const loginLink = screen.getByRole("link", {
      name: "Already have an account? Login here",
    });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.getAttribute("href")).toBe("/login");
  });
});

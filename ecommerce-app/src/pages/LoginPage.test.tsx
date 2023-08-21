import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { Theme } from "../components/Theme";
import { setupStore } from "../store";

describe("LoginPage", () => {
  it("renders account login header", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    const header = screen.getByText("Account login");
    expect(header).toBeInTheDocument();
  });

  it("renders LoginForm component", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    const loginForm = screen.getByTestId("login-form"); // Adjust the test ID based on your LoginForm component
    expect(loginForm).toBeInTheDocument();
  });

  it("renders link to sign up page", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    const signUpLink = screen.getByRole("link", {
      name: "Not yet a member? Sign up here",
    });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink.getAttribute("href")).toBe("/signup");
  });
});

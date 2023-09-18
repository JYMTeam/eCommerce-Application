import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { MenuItems } from "./MenuItems";
import { Theme } from "../../Theme";
import { Provider } from "react-redux";
import { setupStore } from "../../../store";

describe("MenuItems Component", () => {
  it("displays main menu elements", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>
            <MenuItems />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    // Проверяем, что все кнопки отображаются
    const mainButton = screen.getByText("Main");
    const shopButton = screen.getByText("Shop");
    const loginButton = screen.getByText("Login");
    const signUpButton = screen.getByText("Sign Up");

    expect(mainButton).toBeInTheDocument();
    expect(shopButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });
});

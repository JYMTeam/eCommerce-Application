import React from "react";
import { render, screen } from "@testing-library/react";
import NotFoundPage from "./NotFoundPage";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { Theme } from "../components/Theme";
import { setupStore } from "../store";
import { BrowserRouter } from "react-router-dom";

describe("NotFoundPage", () => {
  it("renders the correct title and description", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>
            <NotFoundPage />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    const titleElement = screen.getByText("Oops!");
    const descElement = screen.getByText(
      "We can't find the page you are looking for!",
    );

    expect(titleElement).toBeInTheDocument();
    expect(descElement).toBeInTheDocument();
  });

  // it("renders the error image", () => {
  //   const store = setupStore();
  //   const { getByRole } = render(
  //     <Provider store={store}>
  //     <ThemeProvider theme={Theme}>
  //       <BrowserRouter>
  //         <NotFoundPage />
  //       </BrowserRouter>
  //     </ThemeProvider>
  //   </Provider>,
  //   );

  //   const imgElement = getByRole("img");

  //   expect(imgElement).toBeInTheDocument();
  //   expect(imgElement).toHaveAttribute("src", "../../assets/error-404.gif");
  //   expect(imgElement).toHaveAttribute("alt", "Oops! Page not found.");
  // });
});

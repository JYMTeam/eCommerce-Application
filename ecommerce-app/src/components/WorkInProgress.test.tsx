import React from "react";
import { render, screen } from "@testing-library/react";
import WorkInProgress from "./WorkInProgress";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { Theme } from "./Theme";
import { setupStore } from "../store";

describe("WorkInProgress Component", () => {
  it("displays correct title and description", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>
            <WorkInProgress />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    const title = screen.getByText("Come back later!");
    const description = screen.getByText("We are working on this page!");

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  // it("displays the work in progress image", () => {
  //   const store = setupStore();
  //   render(
  //     <Provider store={store}>
  //       <ThemeProvider theme={Theme}>
  //         <BrowserRouter>
  //             <WorkInProgress />
  //         </BrowserRouter>
  //       </ThemeProvider>
  //     </Provider>
  //   );

  //   const image = screen.getByAltText("Work in progress");

  //   expect(image).toBeInTheDocument();
  //   expect(image.getAttribute('src')).toContain("assets/working.gif"); // Update the path accordingly
  // });
});

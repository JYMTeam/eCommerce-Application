import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MainPage } from "./MainPage";

describe("MainPage component", () => {
  it("renders main page heading", () => {
    render(<MainPage />);
    const headingElement = screen.getByText("Main Page");
    expect(headingElement).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<MainPage />);
    expect(container).toMatchSnapshot();
  });
});

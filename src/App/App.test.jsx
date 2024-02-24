import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
});

test("App component should render properly", () => {
  const helloTextEl = screen.getByText("Welcome to JS Tricky Quiz Challenge.");
  expect(helloTextEl).toBeInTheDocument();
});

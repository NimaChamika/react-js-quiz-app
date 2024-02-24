import { render, screen } from "@testing-library/react";
import App from "./App";

test("App component should render properly", () => {
  render(<App />);
  const helloTextEl = screen.getByText("Hello World");
  expect(helloTextEl).toBeInTheDocument();
});

import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders navbar", () => {
  render(<App />);
  expect(screen.getByText(/Task Manager/i)).toBeInTheDocument();
});

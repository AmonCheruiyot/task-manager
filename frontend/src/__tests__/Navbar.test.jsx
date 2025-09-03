import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";

test("renders navigation buttons", () => {
  render(<Navbar setPage={() => {}} />);
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});

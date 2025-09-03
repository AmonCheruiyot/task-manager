import { render, screen } from "@testing-library/react";
import TaskDashboard from "../components/TaskDashboard";

test("shows loading initially", () => {
  render(<TaskDashboard />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

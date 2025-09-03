import { formatDate } from "../utils/formatDate";

test("formats date correctly", () => {
  const result = formatDate("2025-01-01");
  expect(result).toMatch(/2025/);
});

import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders App component", () => {
  render(<App />);

  // Check if the AddTransaction component is rendered
  const addTransactionComponent = screen.getByRole("button", {
    name: "Add Transaction 💵",
  });
  expect(addTransactionComponent).toBeInTheDocument();

  // Check if the links to the two routes are rendered
  const allTransactionsLink = screen.getByRole("link", {
    name: "All Transcations",
  });
  expect(allTransactionsLink).toBeInTheDocument();

  const aggregatedTransactionsLink = screen.getByRole("link", {
    name: "Aggregated Transactions",
  });
  expect(aggregatedTransactionsLink).toBeInTheDocument();

  // Check if the Table component is rendered by default
  const tableComponent = screen.getByRole("table");
  expect(tableComponent).toBeInTheDocument();
});

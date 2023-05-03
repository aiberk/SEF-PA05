import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import Table from "../components/Table";

const data = [
  {
    id: 1,
    item: "Item1",
    amount: 100,
    category: "Category1",
    date: "2022-01-01",
    description: "Description1",
  },
  {
    id: 2,
    item: "Item2",
    amount: 200,
    category: "Category2",
    date: "2022-02-02",
    description: "Description2",
  },
];

test("renders table headers correctly", () => {
  render(<Table data={data} />);

  expect(screen.getByText("Item")).toBeInTheDocument();
  expect(screen.getByText("Amount")).toBeInTheDocument();
  expect(screen.getByText("Category")).toBeInTheDocument();
  expect(screen.getByText("Date")).toBeInTheDocument();
  expect(screen.getByText("Description")).toBeInTheDocument();
  expect(screen.getByText("Actions")).toBeInTheDocument();
});

test("renders table data correctly", () => {
  render(<Table data={data} />);

  expect(screen.getByText("Item1")).toBeInTheDocument();
  expect(screen.getByText("Item2")).toBeInTheDocument();
  expect(screen.getByText("Category1")).toBeInTheDocument();
  expect(screen.getByText("Category2")).toBeInTheDocument();
  expect(screen.getByText("2022-01-01")).toBeInTheDocument();
  expect(screen.getByText("2022-02-02")).toBeInTheDocument();
  expect(screen.getByText("Description1")).toBeInTheDocument();
  expect(screen.getByText("Description2")).toBeInTheDocument();
});

test("handles edit click", () => {
  render(<Table data={data} />);
  fireEvent.click(screen.getAllByText("Edit")[0]);
  expect(screen.getByDisplayValue("Item1")).toBeInTheDocument();
});

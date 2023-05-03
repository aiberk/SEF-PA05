import React, { useState } from "react";
import Button from "./Button";

const columns = [
  {
    property: "item",
    header: "Item",
    primary: true,
  },
  {
    property: "amount",
    header: "Amount",
  },
  {
    property: "category",
    header: "Category",
  },
  {
    property: "date",
    header: "Date",
  },
  {
    property: "description",
    header: "Description",
  },
];

const Table = ({ data }) => {
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  if (sortConfig.key) {
    data.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const handleSort = (column) => {
    let direction = "ascending";
    if (sortConfig.key === column && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: column, direction });
  };

  const handleEditClick = (id, row) => {
    setEditingRowId(id);
    setEditedRow(row);
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:8080/api/transactions/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleInputChange = (event, property) => {
    setEditedRow((prevState) => ({
      ...prevState,
      [property]: event.target.value,
    }));
  };

  const handleSaveClick = (id) => {
    fetch(`http://localhost:8080/api/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedRow),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    console.log(editedRow);
    // Make a PUT request to update the row in the database
    console.log(`Save clicked for row ${id}`);
    setEditingRowId(null);
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.property}
                onClick={() => handleSort(column.property)}>
                {column.header}{" "}
                {sortConfig.key === column.property
                  ? sortConfig.direction === "ascending"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
            ))}
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, ...row }, rowIndex) => (
            <tr key={rowIndex}>
              {/* eslint-disable-next-line no-unused-vars */}
              {columns.map((column, columnIndex) => (
                <td key={column.property}>
                  {editingRowId === id ? (
                    <input
                      className="formInput"
                      type="text"
                      name={column.property}
                      value={editedRow[column.property]}
                      onChange={(event) =>
                        handleInputChange(event, column.property)
                      }
                    />
                  ) : (
                    row[column.property]
                  )}
                </td>
              ))}
              <td>
                {editingRowId === id ? (
                  <Button
                    title="Save"
                    type="tableButton"
                    onClick={() => handleSaveClick(id)}
                  />
                ) : (
                  <Button
                    title="Edit"
                    type="tableButton"
                    onClick={() => handleEditClick(id, row)}
                  />
                )}
              </td>
              <td>
                <Button
                  title="Delete"
                  type="tableButton"
                  onClick={() => handleDeleteClick(id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <td colSpan="4" className="long-cell"></td>
        </tfoot>
      </table>
    </>
  );
};

export default Table;

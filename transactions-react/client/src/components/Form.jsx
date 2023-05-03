import React from "react";
import { useRef } from "react";

const Form = ({ setShowForm }) => {
  const formRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const transactionData = Object.fromEntries(formData.entries());

    fetch("http://localhost:8080/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        formRef.current.reset(); // reset the form
      })
      .catch((error) => console.error(error));
    setShowForm(false);
  };

  return (
    <>
      <form id="newTransactionForm" ref={formRef} onSubmit={handleSubmit}>
        <label>
          Item:
          <input type="text" name="item" required />
        </label>
        <br />
        <label>
          Amount:
          <input type="number" name="amount" required />
        </label>
        <label>
          Category:
          <input type="text" name="category" required />
        </label>
        <br />
        <label>
          Date:
          <input type="date" name="date" required />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" required />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button onClick={() => setShowForm(false)}>Cancel</button>
      </form>
    </>
  );
};

export default Form;

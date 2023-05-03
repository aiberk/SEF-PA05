import React from "react";
import { useState } from "react";
import Form from "./Form";

const AddTransaction = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      {showForm ? (
        <Form setShowForm={setShowForm} />
      ) : (
        <button className="mainCTA" onClick={() => setShowForm(true)}>
          Add Transaction 💵
        </button>
      )}
    </div>
  );
};

export default AddTransaction;

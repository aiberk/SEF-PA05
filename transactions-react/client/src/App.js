import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Table from "./components/Table";
import AddTransaction from "./components/AddTransaction";
import AggregatedTransactions from "./components/AggregatedTransactions";
import Picker from "./components/Picker";

const App = () => {
  const [response, setResponse] = useState([]);
  const [value, setValue] = useState("category");

  useEffect(() => {
    fetch("http://localhost:8080/api/transactions")
      .then((res) => res.json())
      .then((data) => setResponse(data))
      .catch((err) => console.error(err));
  }, [response]);

  return (
    <Router>
      <div className="transactionsApp">
        <div>
          <nav className="topCTA">
            <h1>Transactions App</h1>
            <ul>
              <li>
                <Link to="/">All Transcations</Link>
              </li>
              <li>
                <Link to="/aggregated">Aggregated Transactions</Link>
              </li>
            </ul>
          </nav>

          <AddTransaction />
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Table data={response} />
              </>
            }
          />
          <Route
            path="/aggregated"
            element={
              <div>
                <Picker
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
                <AggregatedTransactions
                  data={response}
                  getValue={(item) => item[value]}
                />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

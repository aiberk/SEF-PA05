const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());

// Initialize database and table
const db = new sqlite3.Database("database.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");

  const createTableSql = `
    CREATE TABLE IF NOT EXISTS transactionRecord (
      id INTEGER PRIMARY KEY,
      amount NUMERIC,
      item TEXT,
      category TEXT,
      date DATE,
      description TEXT
    )
  `;
  db.run(createTableSql, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("transactionRecord table created/already exists.");
    }
  });
});

// Set up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define API routes

// Get all transactionRecords
app.get("/api/transactions", (req, res) => {
  const sql = "SELECT * FROM transactionRecord ORDER BY date DESC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(rows);
    }
  });
});

// Create a new transactionRecord
app.post("/api/transactions", (req, res) => {
  console.log(req.body);
  const { item, amount, category, date, description } = req.body;
  const sql =
    "INSERT INTO transactionRecord (item, amount, category, date, description) VALUES (?, ?, ?, ?, ?)";
  db.run(sql, [item, amount, category, date, description], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send({ id: this.lastID });
    }
  });
});

// Update a transactionRecord
app.put("/api/transactions/:id", (req, res) => {
  const { item, amount, category, date, description } = req.body;
  const id = req.params.id;
  const sql =
    "UPDATE transactionRecord SET item = ?, amount =?, category = ?, date = ?, description = ? WHERE id = ?";
  db.run(sql, [item, amount, category, date, description, id], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send({ rowsAffected: this.changes });
    }
  });
});

// Delete a transactionRecord
app.delete("/api/transactions/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM transactionRecord WHERE id = ?";
  db.run(sql, [id], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send({ rowsAffected: this.changes });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

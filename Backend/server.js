// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const dotenv = require("dotenv/config");

// Initialize the Express app
const app = express();
const port = 5000;

// Enable CORS for cross-origin requests
app.use(cors());
app.use(bodyParser.json());

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: "postgres", // Replace with your PostgreSQL username
  host: "localhost",
  database: "CHD", // Replace with your PostgreSQL database name
  password: process.env.DB_PASSWORD, // Replace with your PostgreSQL password
  port: 5432,
});

// Test database connection
pool.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("Connected to the PostgreSQL database.");
  }
});

// Define API endpoint to handle form submissions
app.post("/submit-form", async (req, res) => {
  const { name, email, age } = req.body;

  // Insert the data into the PostgreSQL database
  try {
    const query = "INSERT INTO users (name, email, age) VALUES ($1, $2, $3)";
    const result = await pool.query(query, [name, email, age]);
    res.status(200).send("Data submitted successfully!");
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error inserting data.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

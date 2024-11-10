import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv/config";

const app = express();
const port = 5000;
const { Pool } = pg;

app.use(cors());
app.use(bodyParser.json());

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "HealthSync",
  password: process.env.DB_PASSWORD, // uses password from the .env file to prevent data leak
  port: 5432,
});

// The code below tests whether the connection with the database was established or not; for development purposes
pool.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("Connected to the PostgreSQL database.");
  }
});

app.get("/get-first", async (req, res) => {
  try {
    const query = "SELECT * FROM patient ORDER BY severity DESC LIMIT 1";
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      res.status(404).send("No patients found.");
    } else {
      res.status(200).json(result.rows[0]); // Send the top row as the response
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data.");
  }
});

app.delete("/del", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // First, get the patient with the highest severity
    const query = "SELECT * FROM patient ORDER BY severity DESC LIMIT 1";
    const result = await client.query(query);

    if (result.rows.length === 0) {
      res.status(404).send("No patients to delete.");
      return;
    }

    const patientId = result.rows[0].patient_id;

    // Now delete the patient with the highest severity
    const deleteQuery = "DELETE FROM patient WHERE patient_id = $1";
    await client.query(deleteQuery, [patientId]);

    // Commit the transaction
    await client.query("COMMIT");

    res.status(200).send("Patient deleted successfully.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error deleting patient:", err);
    res.status(500).send("Error deleting patient.");
  } finally {
    client.release();
  }
});

// Following code handles form submission so it can be entered into the Database
app.post("/submit-form", async (req, res) => {
  const { name, patientId, severity } = req.body; // Collect information submitted from the form

  // Start a transaction
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Insert the new patient data with NULL for doctors_name
    const insertQuery =
      "INSERT INTO patient (patient_name, patient_id, doctors_name, severity) VALUES ($1, $2, NULL, $3)";
    await client.query(insertQuery, [name, patientId, severity]);

    // Update severity for all patients with lower severity than the newly added patient
    const updateQuery =
      "UPDATE patient SET severity = severity + 1 WHERE severity < $1";
    await client.query(updateQuery, [severity]);

    // Commit the transaction
    await client.query("COMMIT");

    // Send success feedback to user
    res
      .status(200)
      .send("Data submitted and severity levels updated successfully!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting or updating data:", err);
    res.status(500).send("Error inserting or updating data.");
  } finally {
    client.release();
  }
});

// Start listening on the aforementioned port, default set to 5000
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv/config";
import bcrypt from "bcrypt";
import session from "express-session";

const app = express();
const port = 5000;
const { Pool } = pg;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "HealthSync",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

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
    const query2 = "SELECT * FROM patient ORDER BY severity DESC";
    const result = await pool.query(query);
    const result2 = await pool.query(query2);
    console.log(result2);

    if (result.rows.length === 0) {
      res.status(404).send("No patients found.");
    } else {
      res.status(200).json(result.rows[0]);
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
    const query = "SELECT * FROM patient ORDER BY severity DESC LIMIT 1";
    const result = await client.query(query);
    if (result.rows.length === 0) {
      res.status(404).send("No patients to delete.");
      return;
    }
    const patientId = result.rows[0].patient_id;
    const deleteQuery = "DELETE FROM patient WHERE patient_id = $1";
    await client.query(deleteQuery, [patientId]);
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

app.post("/submit-form", async (req, res) => {
  const { name, patientId, severity } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const insertQuery =
      "INSERT INTO patient (patient_name, patient_id, doctors_name, severity) VALUES ($1, $2, NULL, $3)";
    await client.query(insertQuery, [name, patientId, severity]);

    const updateQuery =
      "UPDATE patient SET severity = severity + 1 WHERE severity < $1";
    await client.query(updateQuery, [severity]);

    await client.query("COMMIT");

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

app.post("/sessions", async (req, res) => {
  const { email, password } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const readQuery = "SELECT * FROM users WHERE email = $1";
    const result = await client.query(readQuery, [email]);

    if (result.rows.length === 0) {
      res.status(404).send("User not found.");
      return;
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send("Incorrect password.");
      return;
    }

    req.session.user = { id: user.id, email: user.email };
    console.log("User session created:", req.session.user);

    await client.query("COMMIT");
    res.status(200).send("User found and session created!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Login error:", err);
    res.status(500).send("Error during login.");
  } finally {
    client.release();
  }
});

app.post("/register", async (req, res) => {
  const { email, password, TypeofDoctor, TypeofSpecialist } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const checkQuery = "SELECT * FROM users WHERE email = $1";
    const checkResult = await client.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      res.status(400).send("User already exists.");
      await client.query("ROLLBACK");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
      INSERT INTO users (email, password, typeofdoctor, typeofspecialist)
      VALUES ($1, $2, $3, $4)
    `;
    await client.query(insertQuery, [
      email,
      hashedPassword,
      TypeofDoctor,
      TypeofSpecialist,
    ]);

    await client.query("COMMIT");
    res.status(201).send("User registered successfully.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Registration error:", err.message, err.stack);

    res.status(500).send("Error registering user.");
  } finally {
    client.release();
  }
});

app.get("/me", (req, res) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).send("Not authenticated");
  }
});

app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});

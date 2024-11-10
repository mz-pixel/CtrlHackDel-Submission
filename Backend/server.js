// // server.js
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { Pool } = require("pg");
// const dotenv = require("dotenv/config");

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
  database: "CHD",
  password: process.env.DB_PASSWORD, // uses password from the .env file to prevent data leak
  port: 5432,
});
//The code below tests wether the connection with database was established or not; for development purposes
pool.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("Connected to the PostgreSQL database.");
  }
});

//Following code handles form submission so it can be entered into the Database
app.post("/submit-form", async (req, res) => {
  const { name, patientId, severity } = req.body; //Collect information submitted from the form

  // Insert the data into the PostgreSQL database
  try {
    const query =
      "INSERT INTO patients (name, patient_id, severity) VALUES ($1, $2, $3)";
    await pool.query(query, [name, patientId, severity]);
    res.status(200).send("Data submitted successfully!"); //Send success feedback to user
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error inserting data."); //Send user the error so they are aware
  }
});

// Start listening on the aforementioned port, default set to 5000
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});

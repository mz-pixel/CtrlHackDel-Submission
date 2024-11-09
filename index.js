// backend/index.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import apiRoutes from "./backend/routes/api.js";
import db from "./backend/db.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Parse form data

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/../views"); // Set views directory

// Use API routes
app.use("/api", apiRoutes);

// Route to display form
app.get("/", (req, res) => {
  res.render("index"); // Render form page
});

// Route to display priority queue
app.get("/priority-queue", (req, res) => {
  const query = "SELECT * FROM submissions ORDER BY severity DESC";

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.render("priority", { submissions: results }); // Render priority queue page
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

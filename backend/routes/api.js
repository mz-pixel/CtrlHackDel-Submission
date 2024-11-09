// backend/routes/api.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// Define your routes here
router.post("/submit", (req, res) => {
  const { user_id, name, severity, family_doctor } = req.body;
  const query =
    "INSERT INTO submissions (user_id, name, severity, family_doctor) VALUES (?, ?, ?, ?)";

  db.query(query, [user_id, name, severity, family_doctor], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect("/priority-queue"); // Redirect to priority queue view after submission
  });
});

export default router; // Export router as the default

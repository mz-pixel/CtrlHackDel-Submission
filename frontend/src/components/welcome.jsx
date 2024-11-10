import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Welcome to Patient Submission Portal</h1>
      <p>Click the button below to submit patient information.</p>
      <Link to="/submission">
        <button className="button">Go to Submission Form</button>
      </Link>
    </div>
  );
}

export default Welcome;

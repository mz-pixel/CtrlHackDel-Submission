import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function Success() {
  return (
    <div className="welcome-container">
      <h1>Submission Successful!</h1>
      <p>Thank you for submitting the patient information.</p>
      <Link to="/">
        <button className="button">Go Back to Home</button>
      </Link>
    </div>
  );
}

export default Success;

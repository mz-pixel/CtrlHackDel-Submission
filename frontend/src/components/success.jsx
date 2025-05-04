import React from "react";
import { Link } from "react-router-dom";
import "./success.css";

function Success() {
  return (
    <div className="success-page">
      <div className="success-glass-card">
        <h1 className="success-heading">Submission Successful!</h1>
        <p className="success-message">
          Thank you for submitting the patient information.
        </p>
        <Link to="/" className="back-button">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Success;

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Form from "./form";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/submission" element={<Form />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
};

// Welcome component for the "/" route
const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Patient Submission Portal</h1>
      <p>Click the button below to submit patient information.</p>
      <Link to="/submission">
        <button className="button">Go to Submission Form</button>
      </Link>
    </div>
  );
};

const Success = () => {
  return (
    <div className="welcome-container">
      <h1>Submission Successful!</h1>
      <p>Thank you for submitting the patient information.</p>
      <Link to="/">
        <button className="button">Go Back to Home</button>
      </Link>
    </div>
  );
};

export default App;

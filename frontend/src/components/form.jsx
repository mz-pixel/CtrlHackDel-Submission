// src/Form.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "../App.css";
import "./form.css";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    patientId: "",
    severity: "",
  });

  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/submit-form",
        formData
      );
      setFormData({ name: "", patientId: "", severity: "" });
      navigate("/success"); // Redirect to success page after submission
    } catch (err) {
      console.error("Error submitting the form:", err);
      alert("There was an error submitting the form.");
    }
  };

  return (
    <div className="background-container">
      <div className="container">
        <h1 className="heading">Submit Patient Information</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name" className="label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="patientId" className="label">
              Patient ID:
            </label>
            <input
              type="number"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              min="1"
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="severity" className="label">
              Severity (1-10):
            </label>
            <input
              type="number"
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              required
              min="1"
              max="10"
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;

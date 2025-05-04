import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./form.css";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    patientId: "",
    severity: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/submit-form", formData);
      setFormData({ name: "", patientId: "", severity: "" });
      navigate("/success");
    } catch (err) {
      console.error("Error submitting the form:", err);
      alert("There was an error submitting the form.");
    }
  };

  return (
    <div className="form-page">
      <div className="form-glass-card">
        <h1 className="form-heading">Submit Patient Information</h1>
        <form onSubmit={handleSubmit} className="form-body">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="patientId">Patient ID</label>
          <input
            type="number"
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
            min="1"
          />

          <label htmlFor="severity">Severity (1-10)</label>
          <input
            type="number"
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            required
            min="1"
            max="10"
          />

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./doctor.css";

function Doctor() {
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-first");
        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }
        const data = await response.json();
        setPatient(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPatientData();
  }, []);
  const handleDeletePatient = async () => {
    try {
      const response = await fetch("http://localhost:5000/del", {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete patient data");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="background-container">
      <div className="doctor-container">
        <h1>Following is the information for your next Patient!</h1>
        {patient ? (
          <div className="patient-info">
            <p>
              <strong>Name:</strong> {patient.patient_name}
            </p>
            <p>
              <strong>Patient ID:</strong> {patient.patient_id}
            </p>
            <p>
              <strong>Severity:</strong> {patient.severity}
            </p>
            <p>
              <strong>Doctor's Name:</strong>{" "}
              {patient.doctors_name || "Not Assigned"}
            </p>
            <Link to={"/"}>
              {/* redirect user to the home page*/}
              <button onClick={handleDeletePatient}>
                Delete Patient from Database
              </button>
            </Link>
          </div>
        ) : (
          <p>No patient information available.</p> // Fallback if no patient data
        )}
      </div>
    </div>
  );
}

export default Doctor;

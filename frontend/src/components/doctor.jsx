import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    <div className="doctor-page">
      <div className="doctor-glass-card">
        <h1 className="doctor-heading">
          Here is the information for your next patient:
        </h1>

        {error && <p className="error">{error}</p>}

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

            <Link
              to="/"
              className="delete-button"
              onClick={handleDeletePatient}
            >
              Delete Patient from Database
            </Link>
          </div>
        ) : (
          <p className="loading">No patient information available.</p>
        )}
      </div>
    </div>
  );
}

export default Doctor;

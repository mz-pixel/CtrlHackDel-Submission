import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    TypeofDoctor: "",
    TypeofSpecialist: "None",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registration Data Submitted:", formData);
    try {
      await axios.post("http://localhost:5000/register", formData);
      setFormData({
        email: "",
        password: "",
        name: "",
        TypeofDoctor: "",
        TypeofSpecialist: "None",
      });
      alert("successfully registered, please login");
      navigate("/login");
    } catch (err) {
      console.error("Error submitting the registration:", err);
      alert("There was an error during registration.");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="TypeofDoctor">Type of Doctor</label>
            <select
              id="TypeofDoctor"
              name="TypeofDoctor"
              value={formData.TypeofDoctor}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Family Doctor">Family Doctor</option>
              <option value="Specialist">Specialist</option>
            </select>
          </div>
          {formData.TypeofDoctor === "Specialist" && (
            <div className="form-group">
              <label htmlFor="TypeofSpecialist">Type of Specialist</label>
              <select
                id="TypeofSpecialist"
                name="TypeofSpecialist"
                value={formData.TypeofSpecialist}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Type 1">Type 1</option>
                <option value="Type 2">Type 2</option>
                <option value="Type 3">Type 3</option>
              </select>
            </div>
          )}
          <button type="submit" className="form-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React, { useState, useContext } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { checkAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data Submitted:", formData);
    try {
      await axios.post("http://localhost:5000/sessions", formData, {
        withCredentials: true,
      });
      await checkAuth();
      setFormData({
        email: "",
        password: "",
      });
      console.log("redirecting ...");

      navigate("/Loader");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Error submitting the form:", err);
      alert("There was an error submitting the form.");
      console.log(err);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Login</h2>
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
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

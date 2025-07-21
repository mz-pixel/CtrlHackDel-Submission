// src/components/Logout.jsx
import React, { useEffect } from "react";
import "./logout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post(
          "http://localhost:5000/logout",
          {},
          { withCredentials: true }
        );
        localStorage.clear();
        sessionStorage.clear();
        console.log("Logout successful");

        setTimeout(() => {
          console.log("Redirecting...");
          navigate("/", { replace: true });
          window.location.reload();
        }, 500);
      } catch (e) {
        console.error("Logout failed:", e);
        navigate("/", { replace: true });
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="logout">
      <div className="spinner"></div>
    </div>
  );
};

export default Logout;

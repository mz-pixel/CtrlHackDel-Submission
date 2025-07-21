import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./welcome.css";
import calendar from "../assets/calendar.svg";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function Welcome() {
  const { user } = useContext(AuthContext);

  return (
    <div className="background-container">
      <nav className="navbar">
        <h1 className="logo">MEDSYNC</h1>
        <div className="links">
          {user ? (
            <Link to="/logout">Logout</Link>
          ) : (
            <Link to="/register">Register</Link>
          )}
          {user && user.typeofdoctor === "Specialist" ? (
            <Link to="/doc" className="button-outline">
              Check Appointments
            </Link>
          ) : (
            <Link to="/submission" className="button-outline">
              {user ? "Submit Patient" : "Login"}
            </Link>
          )}
        </div>
      </nav>
      <div className="hero">
        <div className="glass-card">
          <section className="hero-section">
            <div className="hero-left">
              <h2>Healthcare Appointments, Reimagined.</h2>
              <p>Guaranteed optimized scheduling for all.</p>
              {user && user.typeofdoctor === "Specialist" ? (
                <Link to="/doc" className="button-outline2">
                  Check Appointments
                </Link>
              ) : (
                <Link to="/submission" className="get-started">
                  {user ? "Enter Patient" : "Get Started"}
                </Link>
              )}
            </div>
            <div className="hero-right">
              <img src={calendar} alt="Calendar" />
            </div>
          </section>
        </div>
        <div className="features">
          <div className="feature">
            <div className="icon">🕒</div>
            <div className="text">
              <h3>Fair Scheduling</h3>
              <p>Balanced appointment times.</p>
            </div>
          </div>
          <div className="feature">
            <div className="icon">📋</div>
            <div className="text">
              <h3>Easy Management</h3>
              <p>Schedule, reschedule, and cancel easily.</p>
            </div>
          </div>
          <div className="feature">
            <div className="icon">🔔</div>
            <div className="text">
              <h3>Notifications</h3>
              <p>Stay updated with reminders.</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <Link href="/doc">Privacy</Link>
        <Link href="/doc">Terms</Link>
        <Link href="/doc">Contact</Link>
      </footer>
    </div>
  );
}

export default Welcome;

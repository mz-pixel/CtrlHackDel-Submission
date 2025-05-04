import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./welcome.css";
import calendar from "../assets/calendar.svg";

function Welcome() {
  return (
    <div className="background-container">
      <nav className="navbar">
        <h1 className="logo">MEDSYNC</h1>
        <div className="links">
          <Link to="/doc">Register</Link>
          <Link to="/doc" className="button-outline">
            Dashboard
          </Link>
        </div>
      </nav>
      <div className="hero">
        <div className="glass-card">
          <section className="hero-section">
            <div className="hero-left">
              <h2>Healthcare Appointments, Reimagined.</h2>
              <p>Guaranteed optimized scheduling for all.</p>
              <Link to="/submission" className="get-started">
                Get Started
              </Link>
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

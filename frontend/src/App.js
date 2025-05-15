import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Welcome from "./components/welcome";
import Success from "./components/success";
import Form from "./components/form";
import Doctor from "./components/doctor";
import Login from "./components/login";
import Register from "./components/register";
import ProtectedRoute from "./wrapper/ProtectedRoute";
import Loader from "./components/Loader";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loader" element={<Loader />} />
          <Route
            path="/submission"
            element={
              <ProtectedRoute>
                <Form />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doc"
            element={
              <ProtectedRoute>
                <Doctor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

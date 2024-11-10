import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Welcome from "./components/welcome";
import Success from "./components/success";
import Form from "./components/form";
import Doctor from "./components/doctor";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/submission" element={<Form />} />
        <Route path="/success" element={<Success />} />
        <Route path="/doc" element={<Doctor />} />
      </Routes>
    </Router>
  );
};

export default App;

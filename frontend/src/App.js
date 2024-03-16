//link****************************************
// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import React and React Router
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Vehicle from "./components/Vehicle/SuperPages/Vehicle";
import Common from "./components/Pages/Common";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Common />} />
          <Route path="/vehicle/*" element={<Vehicle />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
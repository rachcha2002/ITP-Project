import React from "react";
import "./hrMain.css";
import HrPageTitle from "./HRPageTitle";
import Configs from "./ConfigurationsHr";


// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function HrConfigs() {
  return (
    <main id="main" className="main">
      <HrPageTitle title="Configurations" url="staff/hr/configs" />

      <Routes>
        <Route path="/" element={<Configs />} />
      </Routes>
    </main>
  );
}

export default HrConfigs;

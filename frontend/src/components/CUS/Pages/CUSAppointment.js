import React from "react";
import PeriodicalAppointment from "../CUSMain/CUSAppointment/PeriodicalAppointment";
//import MechanicalAppointment from '../CUSMain/CUSAppointment/MechanicalAppointment'
import Header from "../CusHeader/Header";
//import MyAppointment from '../CUSMain/CUSAppointment/MyAppointment'
//import AppointnmentMain from '../CUSMain/CUSAppointment/AppoinmentMain'
//import AccidentalAppointment from '../CUSMain/CUSAppointment/AccidentalAppointment'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function CUSAppointment() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="periodicalappointment/"
          element={<PeriodicalAppointment />}
        />
      </Routes>
    </>
  );
}

export default CUSAppointment;
import React from "react";
import IMMain from "../IMMain/IMMain";
import IMSideBar from "../IMSidebar/IMSideBar";
import Lubricants from "../IMMain/Products/Lubricants"
import Header from "../../Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Addlubricant from "../IMMain/Products/Lubricantform";
import Tires from "../IMMain/Products/Tires";
import Tireform from "../IMMain/Products/Tireform";


// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


function IM() {
  return (
    <>
      <Header/>
      <IMSideBar />
      <Routes>
        <Route path="/*" element={<IMMain />} />
        <Route path="/lubricants/*" element={<Lubricants/>} />
        <Route path="lubricants/addproduct/" element={<Addlubricant />} />
        <Route path="/Tires/*" element={<Tires/>} />
        <Route path="Tires/addproduct/" element={<Tireform />} />
      </Routes>
    </>
  );
}
export default IM;
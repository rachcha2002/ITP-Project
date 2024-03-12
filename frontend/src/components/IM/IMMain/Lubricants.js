import React from "react";
import "./Lubricants.css";
import ImPageTitle from "./ImPageTitle";
import IMProductCard from "./IMProductCard";
import {Link} from 'react-router-dom'


function Lubricants() {
  return (
    <main id="main" className="main">
      <ImPageTitle title="Lubricants Stock" url="/im/lubricants" />
      
      <Link to="/im/addproduct">
      <button type="button" className="btn-add">
         Add Product
      <span class="bi bi-plus-circle"></span>
      </button>
      </Link>
      <IMProductCard/>
    </main>
  );
}

export default Lubricants;
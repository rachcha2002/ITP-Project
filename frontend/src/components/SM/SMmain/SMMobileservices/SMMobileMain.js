import React from "react";
//import '../SMMobileServices/SMMobileServices.css'
import DbCard from "../SMDbCard";
import { Link } from 'react-router-dom';

const SMMobileMain = () => {
    return (
      <main id="main" className="main">
        <h1>Service Manager </h1>
        <h3 className="subHead"> Recieved Mobile Service Requests.</h3>

        <section>
        <div className="col">
          <div className="row">
            <DbCard
              title="Mobile mechanical service requests"
              value="50"
            />
            <DbCard
              title="Breakdown service requests"
              value="10"
            />
            <DbCard
              title="Vehicle carrier service requests"
              value="6"
            />
          </div>
  
        </div>
      </section>
        
        <div class="card">
          <ul class="list-group">
            <li class="list-group-item">Mobile Mechanical Service Requests
              <Link className='a' to='/staff/sm/MobileMechanical'>
              <button className="btn" style={{ float: 'right' }}>View</button>
              </Link>
            </li>
            </ul>
            <ul class="list-group">
            <li class="list-group-item">Emergency Breakdown Service Requests
            <button className="btn" style={{ float: 'right' }}>View</button>
            </li>
            </ul>
            <ul class="list-group">
            <li class="list-group-item">Vehicle Carrier Service Requests
            <button className="btn" style={{ float: 'right' }}>View</button>
            </li>
            </ul>
          </div>
      </main>
    );
    
  }

  export default SMMobileMain;
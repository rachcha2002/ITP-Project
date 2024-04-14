import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../CUSMobileReq/Mechanicalreq.css'
import axios from "axios"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import BreakdownImg from '../../../../images/MobileServices/EmergencyBreakdownIMG.jpg';

function EmBreakdownReq() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = data => {
    //console.log(data);
    // Perform form submission logic here

    axios.post("http://localhost:5000/api/mobile/add-breakdown",{
        cusName: data.cusName,
        cusEmail: data.cusEmail,
        vehicleNo: data.vehicleNo,
        reqLocation: data.reqLocation,
        issue: data.issue,
        contactNo: data.contactNo
    }).then(()=>{
          alert("Your Emergency Breakdown Request Successfully completed");
          reset();

        }).catch((err)=>{
            alert(err);
            //console.error(err);
            //alert("Error submitting request. Please try again later.");
        });
  };


  return (
  
    <main >
      <div className="mobbody" >
      <div style={{flex:"1" ,marginTop:"3%"}}>
        <h2 className='mobheading'>Emergency Breakdown Service Requests</h2><br />
        <Row><Col><container className=''>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row><Col>
            <div className="mobform-element">
              <label htmlFor="cusName" className='mobL1'>Customer Name</label><br />
              <input {...register("cusName", { required: true })} className="mobinput-styles" type="text" id="cusName"  placeholder="Enter Your Name"  />
              {errors.cusName && <span className="error">Customer Name is required</span>}
            </div> </Col> <Col>
            <div className="mobform-element">
              <label htmlFor="cusEmail" className='mobL1'>Email Address</label><br />
              <input {...register("cusEmail", { required: true,pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // email validation
                                                message: "Invalid email address"
                                                }})} 
              className="mobinput-styles" type="text" id="cusEmail" placeholder="Enter Your Email" />
              {errors.cusEmail && <span className="error">Email Address is required</span>}
            </div> </Col> </Row>
            <Row><Col>
            <div className="mobform-element">
              <label htmlFor="vehicleNo" className='mobL1'>Vehicle Number</label><br />
              <input {...register("vehicleNo", { required: true,pattern: {
                                                value: /^[A-Za-z0-9]{1,10}$/, //vehicle number validation
                                                message: "Invalid vehicle number"
                                                } })} 
              className="mobinput-styles" type="text" id="vehicleNo" placeholder="Enter Your Vehicle Number" />
              {errors.vehicleNo && <span className="error">Vehicle Number is required</span>}
            </div></Col>
            <Col>
            <div className="mobform-element">
                  <label htmlFor="reqLocation" className='mobL1'>Location</label><br />
                  <input {...register("reqLocation", { required: true })} className="mobinput-styles" type="text" id="reqLocation" placeholder="Location" />
                  {errors.reqLocation && <span className="error">Location is required</span>}
            </div> </Col> </Row>
            <Row><Col>
            <div className="mobform-element">
              <label htmlFor="issue" className='mobL1'>Issue</label><br />
              <input {...register("issue")} className="mobinput-styles" type="text" id="issue" placeholder="Enter Vehicle Issue" />
            </div></Col>
            <Col>
            <div className="mobform-element">
              <label htmlFor="contactNo" className='L1'>Contact Number</label><br />
              <input  {...register("contactNo", { required: true,pattern: {
                                                value: /^[0-9]{10}$/, // Assuming a 10-digit phone number format
                                                message: "Invalid contact number"
                                                } })} 
              className="mobinput-styles" type="text" id="contactNo" placeholder="Enter Your Contact Number" />
            {errors.contactNo && <span className="error">{errors.contactNo.message}</span>}
         </div> </Col> </Row>

           
         <div className="mobcheckbox-container">
              <input type="checkbox" className="mobform-check-input" id="mobexampleCheck1" required />
              <label className="mobform-check-label" htmlFor="mobexampleCheck1">Accept the terms and conditions</label><br /><br />
            </div>
            <Button variant="primary" type="submit">Submit</Button>

          </form></container> 
        </Col>
        <Col>
          <img className='' src={BreakdownImg} alt="Breakdown Requests Img" style={{marginTop:"4%",borderRadius:"2%",marginBottom:"2%", marginRight:"1%"}}/>
        </Col> </Row>
      </div></div>
      </main>
    );
  }
  
  export default EmBreakdownReq;
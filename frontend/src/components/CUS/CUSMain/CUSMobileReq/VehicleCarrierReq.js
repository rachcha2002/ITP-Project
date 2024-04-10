import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import '../CUSMobileReq/Mechanicalreq.css'
import axios from "axios"
import Button from 'react-bootstrap/Button';

function VehicleCarrReq() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = data => {
    //console.log(data);
    // Perform form submission logic here

    axios.post("http://localhost:5000/api/mobile/add-vehiclecarrier",{
        cusName: data.cusName,
        cusEmail: data.cusEmail,
        vehicleNo: data.vehicleNo,
        reqDate: data.reqDate,
        reqTime: data.reqTime,
        reqLocation: data.reqLocation,
        additionalInfo: data.additionalInfo,
        contactNo: data.contactNo
    }).then(()=>{
          alert("Your Vehicle Carrier Request Successfully completed");
          reset();

        }).catch((err)=>{
            alert(err);
            //console.error(err);
            //alert("Error submitting request. Please try again later.");
        });
  };


  return (
  
    <main id="main" className="main">
      <div className="mobbody">
      <div className="mobform-container">
        <h2 className='mobheading'>Vehicle Carrier Service Requests</h2>
        <container className=''>
          <form className="mobform" onSubmit={handleSubmit(onSubmit)}>
            <div className="mobform-element">
              <label htmlFor="cusName" className='mobL1'>Customer Name</label><br />
              <input {...register("cusName", { required: true })} className="mobinput-styles" type="text" id="cusName"  placeholder="Enter Your Name"  />
              {errors.cusName && <span className="error">Customer Name is required</span>}
            </div>
            <div className="mobform-element">
              <label htmlFor="cusEmail" className='mobL1'>Email Address</label><br />
              <input {...register("cusEmail", { required: true,pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // email validation
                                                message: "Invalid email address"
                                                }})} 
              className="mobinput-styles" type="text" id="cusEmail" placeholder="Enter Your Email" />
              {errors.cusEmail && <span className="error">Email Address is required</span>}
            </div>

            <div className="mobform-element">
              <label htmlFor="vehicleNo" className='mobL1'>Vehicle Number</label><br />
              <input {...register("vehicleNo", { required: true,pattern: {
                                                value: /^[A-Za-z0-9]{1,10}$/, //vehicle number validation
                                                message: "Invalid vehicle number"
                                                } })} 
              className="mobinput-styles" type="text" id="vehicleNo" placeholder="Enter Your Vehicle Number" />
              {errors.vehicleNo && <span className="error">Vehicle Number is required</span>}
            </div>

            <div className="mobform-element">
              <div className="mobyear-month-container">
                <div className="mobyear-input">
                  <label htmlFor="reqDate" className='mobL1'>Date</label>
                  <input {...register("reqDate", { required: true, pattern: {
                                                value: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/, //date format validation
                                                message: "Invalid date format (DD/MM/YY)"
                                                } })} 
                  className="mobinput-styles" type="text" id="reqDate" placeholder="DD/MM/YY" />
                </div>
                <div className="mobmonth-input">
                  <label htmlFor="reqTime" className='mobL1'>Time</label>
                  <input {...register("reqTime", { required: true, pattern: {
                                                    value: /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/, //time format validation
                                                    message: "Invalid time format (HH:MM)"
                                                    } })} 
                  className="mobinput-styles" type="text" id="reqTime" placeholder="Enter time" />
                  {errors.reqTime && <span className="error">{errors.reqTime.message}</span>}
                </div>
                
              </div>
            </div> 

            <div className="mobform-element">
                  <label htmlFor="reqLocation" className='mobL1'>Location</label><br />
                  <input {...register("reqLocation", { required: true })} className="mobinput-styles" type="text" id="reqLocation" placeholder="Location" />
                  {errors.reqLocation && <span className="error">Location is required</span>}
                </div>

            <div className="mobform-element">
              <label htmlFor="additionalInfo" className='mobL1'>Additional Information</label><br />
              <input {...register("additionalInfo")} className="mobinput-styles" type="text" id="additionalInfo" placeholder="Enter additional information of the vehicle" />
            </div>

            <div className="mobform-element">
              <label htmlFor="contactNo" className='L1'>Contact Number</label><br />
              <input  {...register("contactNo", { required: true,pattern: {
                                                value: /^[0-9]{10}$/, // Assuming a 10-digit phone number format
                                                message: "Invalid contact number"
                                                } })} 
              className="mobinput-styles" type="text" id="contactNo" placeholder="Enter Your Contact Number" />
            {errors.contactNo && <span className="error">{errors.contactNo.message}</span>}
         </div>

           
         <div className="mobcheckbox-container">
              <input type="checkbox" className="mobform-check-input" id="mobexampleCheck1" required />
              <label className="mobform-check-label" htmlFor="mobexampleCheck1">Accept the terms and conditions</label><br /><br />
            </div>
            <Button variant="primary" type="submit">Submit</Button>

          </form>
        </container></div>
      </div> </main>
    );
  }
  
  export default VehicleCarrReq;
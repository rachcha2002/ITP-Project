import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";


import StarRating from "./StarRating";
import PageTitle_cam from "./PageTitle_cam";
import cusimage3 from "../../../../../src/images/cam/cusimage3.jpg";
import cusimage2 from "../../../../../src/images/cam/cusimage2.jpg";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import FileUpload from "../CUS_CAM/CUS_CAM_util/FileUpload";

import "./StarRating.css";


function Feedback() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //validation and submit
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

       // Append regular form data
       Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (uploadedFile) {
        formData.append("files", uploadedFile);
      }
      // Log FormData object
      console.log("FormData:", formData);

      console.log("FormData Entries:");
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch(
        "http://localhost:5000/cam/feedback/add-feedback",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.status === 201) {
        // Feedback created successfully
        const result = await response.json();
        console.log("Data submitted successfully:", result);
        alert("Feedback created Successfully!");
        // Redirect to the specified URL after successful submission
        navigate("/customer/cusaffairs/allfeedback");
      }else {
        // Handle other error cases
        throw new Error("Failed to submit data");
      }
      //const result = await response.json();
      //console.log("Data submitted successfully:", result);
      //alert("Feedback created Successfully!");
      // Redirect to the specified URL after successful submission
      navigate("/customer/cusaffairs/allfeedback");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Display error message using alert box
        setErrorMessage(error.response.data.error);
        alert(error.response.data.error); // Display error message in an alert box
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  //file uplood functions
  // State to store the uploaded files
  // State to store the uploaded files
  const [uploadedFile, setUploadedFile] = useState(null);

  // File input handler for SingleFileUpload component
  const fileInputHandler = (id, file, isValid) => {
    if (isValid) {
      // Set the uploaded file in state
      setUploadedFile(file);
    } else {
      // Handle invalid files if needed
      console.log("Invalid file:", file);
    }
  };

  return (
    <div>
      <Card style={{marginTop:"20px",marginLeft:"20px",marginRight:"20px"}}><Card.Body>
    <Form
      style={{marginTop:"5px",marginLeft:"20px",marginRight:"20px"}}
      onSubmit={handleSubmit(onSubmit)}
    >
    <PageTitle_cam path="feedback / addfeedback" title="Tell us Anything!!" />
    <Row>
      <Col>
      <Row className="cam-mb-3">
      <Form.Group as={Col} controlId="formGridRole">
          <Form.Label>Service Type</Form.Label>
          <Controller
           name="serviceType"
           control={control}
           render={({ field }) => (
          <Form.Select
            defaultValue="Choose..."
            {...field}
            onChange={(e) => {
             field.onChange(e);
            }}
          >
            <option>Choose...</option>
            <option value="Periodical Services">Periodical Services</option>
            <option value="Mechanical Repairs">Mechanical Repairs</option>
            <option value="Mobile Services">Mobile Services</option>
            <option value="Finance Manager">Emergency Breakdowns</option>
            <option value="Supervisor">Other</option>
          </Form.Select>
          )}
          />
          <Form.Text className="text-danger">
            {errors.position?.message}
          </Form.Text>
        </Form.Group>
      </Row>
      <Row className="cam-mb-3">
      <Form.Group as={Col} controlId="formGridRole">
          <Form.Label>Service provided Employee</Form.Label>
          <Controller
            name="employee"
            control={control}
            render={({ field }) => (
          <Form.Select
            defaultValue="Choose..."
            {...field}
            onChange={(e) =>{
              field.onChange(e);
            }}
          >
            <option>Choose...</option>
            <option value="Emp1">Emp1</option>
            <option value="Emp2">Emp2</option>
            <option value="Emp3">Emp3</option>
            <option value="Emp4">Emp4</option>
            <option value="Supervisor">Other</option>
          </Form.Select>
          )}
          />
          <Form.Text className="text-danger">
            {errors.position?.message}
          </Form.Text>
        </Form.Group>
      </Row>
      <Row className="cam-mb-3">
        <Form.Group as={Col} controlId="formFileDocuments">
          <Form.Label>Attach Files</Form.Label>
          <FileUpload
            id="files"
            onInput={fileInputHandler}
            errorText={errors.files?.message}
          />
        </Form.Group>
      </Row>
      <Row className="cam-mb-3">
        <Form.Group as={Col} controlId="formGridExtra">
          <Form.Label>Your FeedBack</Form.Label>
          <Controller
           name="feedback"
           control={control}
           rules={{required: "Feedback is required"}}
           render={({field}) => (
            <Form.Control  
            placeholder="add your feedback"  {...field}/>
           )}
           />
           <Form.Text className="text-danger">
             {errors.feedback?.message}
           </Form.Text>
        </Form.Group>
      </Row>
      <Button variant="success" type="submit" style={{marginTop:"5px",marginLeft:"20px",marginBottom:"20px"}} >
        Submit
      </Button>
      <Button variant="secondary"  style={{marginTop:"5px",marginLeft:"25px",marginBottom:"19px"}}>
        Cancel
      </Button>{" "}
      </Col>
      <Col>
      <Row className="cam-mb-3">
     <Form.Group as={Col}>
          <h5 className="cam-h5">Rate us!!</h5>
          <StarRating />
        </Form.Group>
      </Row>
      <Row className="cam-mb-3">
      <Col>
      <div className="card" style={{width:"18rem"}}>
  <img src={cusimage2} className="card-img-top" alt="..."/>
  <div className="card-body">
    <a href="http://localhost:3000/customer/cusaffairs/allfeedback" class="btn btn-dark" style={{width:"200px",marginTop:"5px"}}>FeedBack</a>
  </div>
</div>
</Col>
        <Col>
      <div className="card" style={{width:"18rem"}}>
  <img src={cusimage3} className="card-img-top" alt="..."/>
  <div className="card-body">
    <a href="http://localhost:3000/customer/cusaffairs/myfeedback" className="btn btn-dark" style={{width:"200px",marginTop:"5px"}}>My FeedBack</a>
  </div>
</div>
</Col>
      </Row>
      </Col>
    </Row>
    </Form>
    </Card.Body></Card>
    </div>
  );
}

export default Feedback;

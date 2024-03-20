import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Form,
  Modal,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
  Card,
  Image,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUpload from "../HrUtil/ImageUpload";
import FileUpload from "../HrUtil/FileUpload";
import pdfImage from "../HrImages/pdf-file.png"; // Path to your custom PDF image
import axios from "axios"; // Import axios for HTTP requests
import { useNavigate } from "react-router-dom";

function EmployeeUpdateModal({ show, onHide, employee, onUpdate }) {
  //to redirect after success
  const navigate = useNavigate();

  //to tool tip
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      You can only update editable marked(edit icon) fields only according to
      company policies.If there is a issue contact system admin or follow the
      protocol.
    </Tooltip>
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: employee });

  // State to track selected position
  const [selectedPosition, setSelectedPosition] = useState("");

  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value); // Update selected position
  };

  //const [image, setImage] = useState(null);

  const handleImageInput = (id, file, isValid) => {
    // Handle the file input here (e.g., validate, store in state, etc.)
    console.log("Received file data:", file);
    // Update the state or perform any necessary actions
    //setImage(file);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append regular form data
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      //console.log("photo:", image);
      //formData.set("photo", image);
      //console.log("photo:", formData.photo);

      // Log FormData object
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      const response = await axios.patch(
        `http://localhost:5000/api/hr/update-employee/${employee.id}`,
        Object.fromEntries(formData.entries())
      );

      if (!response.status === 200) {
        throw new Error("Failed to update data");
      }

      // Redirect to the specified URL after successful submission
      navigate("/staff/hr/employee");
      // Optionally update the UI or perform any other actions after successful submission
      onUpdate(response.data); // Assuming onUpdate is a function to update the UI with the updated data

      // Close the modal or redirect to another page after successful submission
      onHide(); // Close the modal
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Update Employee{" "}
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Button variant="link" className="p-0 ml-2">
              <i className="bi bi-info-circle text-primary"></i>
            </Button>
          </OverlayTrigger>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFname">
              <Form.Label>First Name</Form.Label>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First Name is required" }}
                render={({ field }) => <Form.Control {...field} disabled />}
              />
              <Form.Text className="text-danger">
                {errors.firstName?.message}
              </Form.Text>
            </Form.Group>

            {/* Last Name */}
            <Form.Group as={Col} controlId="formGridLname">
              <Form.Label>Last Name</Form.Label>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last Name is required" }}
                render={({ field }) => <Form.Control {...field} disabled />}
              />
              <Form.Text className="text-danger">
                {errors.lastName?.message}
              </Form.Text>
            </Form.Group>
          </Row>

          {/* Birth Date */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridBdate">
              <Row>
                <Form.Label>Birth Date</Form.Label>
              </Row>
              <Row>
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value || null}
                      onChange={(date) => field.onChange(date)}
                      className="form-control mx-2"
                      disabled
                    />
                  )}
                />
              </Row>
              <Form.Text className="text-danger">
                {errors.birthDate?.message}
              </Form.Text>
            </Form.Group>

            {/* NIC */}
            <Form.Group as={Col} controlId="formGridNic">
              <Form.Label>NIC</Form.Label>
              <Controller
                name="nic"
                control={control}
                render={({ field }) => <Form.Control {...field} disabled />}
              />
              <Form.Text className="text-danger">
                {errors.nic?.message}
              </Form.Text>
            </Form.Group>
          </Row>

          {/* Address */}
          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>
              Address <i class="bi bi-pencil-square"></i>
            </Form.Label>
            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <Form.Control placeholder="1234 Main St" {...field} />
              )}
            />
            <Form.Text className="text-danger">
              {errors.address?.message}
            </Form.Text>
          </Form.Group>

          {/* Gender */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridGender">
              <Form.Label>Gender</Form.Label>
              <div className="mb-3">
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Form.Select {...field} disabled>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  )}
                />
              </div>
              <Form.Text className="text-danger">
                {errors.gender?.message}
              </Form.Text>
            </Form.Group>

            {/* Contact No. */}
            <Form.Group as={Col} controlId="formGridContact">
              <Form.Label>
                Contact No. <i class="bi bi-pencil-square"></i>
              </Form.Label>
              <Controller
                name="contact"
                control={control}
                rules={{ required: "Contact No. is required" }}
                render={({ field }) => (
                  <Form.Control
                    type="tel"
                    placeholder="0715897598"
                    {...field}
                    pattern="[0-9]{10}"
                    maxLength="10"
                  />
                )}
              />
              <Form.Text className="text-danger">
                {errors.contact?.message}
              </Form.Text>
            </Form.Group>
          </Row>

          {/* Start Date */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridSdate">
              <Row>
                <Form.Label>Start date</Form.Label>
              </Row>
              <Row>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className="form-control mx-2"
                      disabled
                    />
                  )}
                />
              </Row>
              <Form.Text className="text-danger">
                {errors.startDate?.message}
              </Form.Text>
            </Form.Group>

            {/* Position */}
            <Form.Group as={Col} controlId="formGridRole">
              <Form.Label>
                Position <i class="bi bi-pencil-square"></i>
              </Form.Label>
              <Controller
                name="position"
                control={control}
                rules={{ required: "Position is required" }}
                render={({ field }) => (
                  <Form.Select
                    defaultValue="Choose..."
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handlePositionChange(e); // Call function to update selected position
                    }}
                  >
                    <option>Choose...</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Inventory Manager">Inventory Manager</option>
                    <option value="Service Manager">Service Manager</option>
                    <option value="Finance Manager">Finance Manager</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Technician">Technician</option>
                  </Form.Select>
                )}
              />
              <Form.Text className="text-danger">
                {errors.position?.message}
              </Form.Text>
            </Form.Group>
          </Row>

          {/* Add a photo and other documents */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formImage">
              <Form.Label>
                Profile Photo *(.jpg, .jpeg, .png only){" "}
                <i class="bi bi-pencil-square"></i>
              </Form.Label>
              <Controller
                name="photo"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    id="photo" // Pass the ID for the ImageUpload component
                    onInput={handleImageInput} // Pass the onInput function
                    errorText={errors.photo?.message}
                    existingImageUrl={employee.photoUrl}
                  />
                )}
              />
            </Form.Group>
            {/* Documents */}
            <Form.Group as={Col} controlId="formFileDocuments">
              <Form.Label>CV *(.pdf only)</Form.Label>
              <Controller
                name="documents"
                control={control}
                render={({ field }) => (
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Image
                        src={pdfImage}
                        thumbnail
                        style={{ width: "200px", height: "200px" }}
                      />
                      <Card.Link href="{employee.documentUrls[0]}">
                        {employee.documentUrls[0].substring(
                          employee.documentUrls[0].lastIndexOf("/") + 1
                        )}
                      </Card.Link>
                    </Card.Body>
                  </Card>
                )}
              />
            </Form.Group>
          </Row>

          {/* Other Details */}
          <Form.Group className="mb-3" controlId="formGridExtra">
            <Form.Label>
              Other Details <i class="bi bi-pencil-square"></i>
            </Form.Label>
            <Controller
              name="otherDetails"
              control={control}
              render={({ field }) => (
                <Form.Control as="textarea" rows={3} {...field} />
              )}
            />
            <Form.Text className="text-danger">
              {errors.otherDetails?.message}
            </Form.Text>
          </Form.Group>

          {/* System Credentials */}
          {/* Email */}
          {/* Conditional rendering of credentials based on selected position */}
          {selectedPosition !== "Technician" && (
            <Row className="mb-3 credentials">
              <h5 className="text-dark">System Credentials</h5>
              <h6 className="text-primary">
                *Only needed for manager or supervisor
              </h6>
              {/* Email */}
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>
                  Email <i class="bi bi-pencil-square"></i>
                </Form.Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      {...field}
                    />
                  )}
                />
                <Form.Text className="text-danger">
                  {errors.email?.message}
                </Form.Text>
              </Form.Group>

              {/* Password */}
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>
                  Password <i class="bi bi-pencil-square"></i>
                </Form.Label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/,
                      message:
                        "Password must have at least one uppercase letter, one number, one symbol, and be at least 8 characters long",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      {...field}
                      pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$"
                    />
                  )}
                />
                <Form.Text className="text-danger">
                  {errors.password?.message}
                </Form.Text>
              </Form.Group>
            </Row>
          )}

          <Button variant="dark" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={onHide} className="mr-2">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EmployeeUpdateModal;

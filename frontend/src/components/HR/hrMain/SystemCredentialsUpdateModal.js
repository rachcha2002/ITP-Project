import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Col } from "react-bootstrap";

function SystemCredentialsUpdateModal({ show, onHide, employee, token }) {
  // State to manage form data
  const [formData, setFormData] = useState({
    email: employee.email,
    password: "",
  });

  // State to manage validation errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // State to manage input validity
  const [valid, setValid] = useState({
    email: false,
    password: false,
  });

  // Reset form data when the modal is shown
  useEffect(() => {
    setFormData({
      email: employee.email,
      password: "",
    });
    setErrors({
      email: "",
      password: "",
    });
    setValid({
      email: false,
      password: false,
    });
  }, [show, employee]);

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Clear error message when user starts entering data again
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    // Validate email pattern
    if (name === "email") {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      setValid((prevValid) => ({
        ...prevValid,
        email: emailPattern.test(value),
      }));
    }

    // Validate password pattern
    if (name === "password") {
      const passwordPattern =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/;
      setValid((prevValid) => ({
        ...prevValid,
        password: passwordPattern.test(value),
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation
    if (!formData.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      return;
    }
    if (!formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      return;
    }
    // Handle form submission
    try {
      // Dummy URL for handling form submission
      const url = `http://localhost:5000/api/hr/update-credentials/${employee._id}`;
      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update system credentials");
      }
      onHide(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error updating system credentials:", error.message);
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
        <Modal.Title>Update System Credentials</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Email */}
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter email"
                onChange={handleChange}
                isInvalid={!!errors.email}
                isValid={valid.email}
              />
              {valid.email && (
                <i className="bi bi-check-circle-fill text-success ml-2"></i>
              )}
            </div>
            <Form.Text className="text-danger">{errors.email}</Form.Text>
          </Form.Group>

          {/* Password */}
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              isInvalid={!!errors.password}
              isValid={valid.password}
            />
            <Form.Text className="text-danger">{errors.password}</Form.Text>
            {valid.password && (
              <Form.Text className="text-success">
                <i className="bi bi-check-circle-fill"></i>
              </Form.Text>
            )}
          </Form.Group>

          <Button variant="dark" type="submit" style={{ margin: "10px" }}>
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

export default SystemCredentialsUpdateModal;
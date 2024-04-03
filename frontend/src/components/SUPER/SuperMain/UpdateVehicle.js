import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function VehicleDash() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [deletedVehicle, setDeletedVehicle] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/vehicle/vehicles");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        setVehicles(data.vehicles);
        setLoading(false);
      } else {
        console.error("Failed to fetch data");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this vehicle?");
    if (shouldDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/vehicle/delete-vehicle/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const deletedVehicle = vehicles.find(vehicle => vehicle._id === id);
          setDeletedVehicle(deletedVehicle);
          setVehicles(vehicles.filter((vehicle) => vehicle._id !== id));
          setShowModal(true); // Show modal with deleted vehicle information
        } else {
          console.error("Failed to delete vehicle");
        }
      } catch (error) {
        console.error("Error deleting vehicle:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    setFormData({});
    setDeletedVehicle(null);
  };

  const handleShowUpdateModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      vehicleNo: vehicle.vehicleNo,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      name: vehicle.name,
      contact: vehicle.contact
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/vehicle/update-vehicle/${selectedVehicle._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const updatedVehicles = vehicles.map(vehicle => {
          if (vehicle._id === selectedVehicle._id) {
            return { ...vehicle, ...formData };
          }
          return vehicle;
        });
        setVehicles(updatedVehicles);
        setShowModal(false);
      } else {
        console.error("Failed to update vehicle");
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  };

  return (
    <div className="table">
      <Row>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 custom-input"
                aria-label="Search"
              />
              <Button variant="outline-dark">Search</Button>
            </Form>
          </div>
          <div className="p-2 ms-auto">
            <Button variant="success" size="md">
              <Link to="/staff/supervisor/vehicle/add" className="text-dark text-decoration-none font-weight-bold">
                Register Vehicle
              </Link>
            </Button>
          </div>
        </Stack>
      </Row>
      <div className="mt-3">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Vehicle No</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Year</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Records</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={index}>
                  <td>{vehicle.vehicleNo}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.name}</td>
                  <td>{vehicle.contact}</td>
                  <td>{vehicle.records}</td>
                  <td>
                    <button onClick={() => handleShowUpdateModal(vehicle)} className="btn btn-warning me-2 text-dark font-weight-bold">Update</button>
                    <button onClick={() => handleDelete(vehicle._id)} className="btn btn-danger text-dark font-weight-bold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        {deletedVehicle ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Vehicle Deleted</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Vehicle No: {deletedVehicle.vehicleNo}</p>
              <p>Brand: {deletedVehicle.brand}</p>
              <p>Model: {deletedVehicle.model}</p>
              <p>Year: {deletedVehicle.year}</p>
              <p>Name: {deletedVehicle.name}</p>
              <p>Contact: {deletedVehicle.contact}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Update Vehicle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formVehicleNo">
                  <Form.Label>Vehicle No.</Form.Label>
                  <Form.Control type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formModel">
                  <Form.Label>Model</Form.Label>
                  <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formYear">
                  <Form.Label>Year</Form.Label>
                  <Form.Control type="text" name="year" value={formData.year} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContact">
                  <Form.Label>Contact No.</Form.Label>
                  <Form.Control type="text" name="contact" value={formData.contact} onChange={handleChange} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
              <Button variant="primary" onClick={handleSubmit}>Update</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default VehicleDash;

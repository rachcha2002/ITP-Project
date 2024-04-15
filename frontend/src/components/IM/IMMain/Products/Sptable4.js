import React from 'react'
import { useState,useEffect } from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge'
function Sptable4() {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [approvedSpareParts,setapprovedSpareParts] = useState([]); 
    
    useEffect(() => {
        function getapprovedSpareparts() {
          axios
            .get("http://localhost:5000/Product/completedsp")
            .then((res) => {
              setapprovedSpareParts(res.data);
            })
            .catch((err) => {
              alert("error");
            });
        }
        getapprovedSpareparts();
    }, []);
   
    const handleMoreButtonClick = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
      };
      const handleCloseModal = () => {
        setShowModal(false);
      };

  return (
    <div>  
    <Table>
    <thead>
      <tr>
        <th>Customer Name</th>
        <th>Vehicle Number</th>
        <th>Contact Number</th>
        <th>Total</th>
        <th>Status</th>
        <th>Explore</th>
      </tr>
    </thead>
    <tbody>
    {approvedSpareParts.map((SpareParts) => (
      <tr key={SpareParts._id}>
        <td>{SpareParts.name}</td>
        <td>{SpareParts.vehicleNumber}</td>
        <td>{SpareParts.contactNumber}</td>
        <td>{SpareParts.total}</td>
        <td><Badge bg="success">{SpareParts.status}</Badge></td>
        <td><Button variant="secondary" onClick={() => handleMoreButtonClick(SpareParts)}>more</Button>
</td>
      </tr>
      ))}
    </tbody>
  </Table>
  <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img style={{width:"50%",height:"50%"}} src={`http://localhost:5000/${selectedOrder?.image}`} alt="Product Image" />
        <p>Customer Name: {selectedOrder?.name}</p>
        <p>Vehicle Number: {selectedOrder?.vehicleNumber}</p>
        <p>Vehicle Brand: {selectedOrder?.brand}</p>
        <p>Model: {selectedOrder?.model}</p>
        <p>Year: {selectedOrder?.year}</p>
        <p>Color: {selectedOrder?.color}</p>
        <p>Contact Number: {selectedOrder?.contactNumber}</p>
        <p>Description: {selectedOrder?.description}</p>
        <p>Total: Rs.{selectedOrder?.total}</p>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
</div>
  )
}

export default Sptable4
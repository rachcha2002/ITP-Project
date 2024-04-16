import React, { useEffect, useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { CusAuthContext } from "../../../../context/cus-authcontext";

function MyApApp() {

  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const cusauth = useContext(CusAuthContext)



  let userId = cusauth.userId;

  const getAcceptedAppData = async (userId) => {

    try {
      const currentDate = new Date();
      const response = await axios.get(`http://localhost:5000/appointment/get-acceptedappointmentbyuserId/${userId}`);
     // Filter appointments whose date is after the current date
     const filteredAppointments = response.data.data.filter(appointment => {
      const appointmentDate = new Date(appointment.appointmentdate);
      return appointmentDate > currentDate;
    });
    setAppointments(filteredAppointments);
    setLoading(false);

    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  useEffect(() => {
    if (cusauth.userId) {
      getAcceptedAppData(cusauth.userId)
    }

  }, [cusauth.userId])
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleMoreButtonClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);

  };
  const Delete = (id) => {

    axios.delete(`http://localhost:5000/appointment/delete-acceptedappointment/${id}`)
      .then(response => {
        console.log(response);
        window.location.reload();
        alert("Appointment Canceled")
      })
      .catch(error => {
        // Handle errors here
        console.error(error);
      });

  };

  return (
    <div>
       {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p style={{fontSize: '24px', color: 'darkblue'}}>No appointments</p>

      ) : (
      <Table striped bordered hover>
        <thead>
          <tr>

            <th>Customer Name</th>
            <th>Service Type</th>
            <th>Issue</th>
            <th>Appointment Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment._id} >
              <td>{appointment.name}</td>
              <td>{appointment.serviceType}</td>
              <td>{appointment.issue}</td>
              <td>{appointment.appointmenttime}</td>
              <td> <Button variant="secondary" onClick={() => handleMoreButtonClick(appointment)}>
                More
              </Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      )}
      {selectedAppointment && (

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Periodical Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img style={{ width: "50%", height: "50%" }} />
            <p>:Vehicle No:{selectedAppointment.vNo} </p>
            <p>Customer Name:{selectedAppointment.name} </p>
            <p>Vehicle Type:{selectedAppointment.vType}  </p>
            <p>Service Type:{selectedAppointment.serviceType}  </p>
            <p>Requesting service:{selectedAppointment.issue} </p>
            <p>Date and Time:{selectedAppointment.appointmentdate ? `${selectedAppointment.appointmentdate.split('T')[0]} ${selectedAppointment.appointmenttime}` : ''}</p>
            <p>Contact No:{selectedAppointment.contactNo} </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => Delete(selectedAppointment._id)}>
              cancle
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  )
}

export default MyApApp
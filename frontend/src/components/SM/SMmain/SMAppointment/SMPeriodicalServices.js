import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

const SMPeriodicalServices = props => {

  //create an empty array to store details
  const [periodicalAppointment, setperiodicalAppointment] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  


  const [name, setname] = useState("");
  const [vType, setvType] = useState("");
  const [vNo, setvNo] = useState("");
  const [serviceType, setserviceType,] = useState("");
  const [issue,setissue]=useState("");
  const [contactNo, setcontactNo] = useState("");
  const [appointmentdate, setappointmentdate] = useState("");
  const [appointmenttime, setappointmenttime] = useState("");
  const [sType, setsType] = useState("");
  const [lastServiceYear, setlastServiceYear] = useState("");
  const [lastServiceMonth, setlastServiceMonth] = useState("");
  const [mileage, setmileage] = useState("");
  const [phone, setphone] = useState("");
  const [msg, setmsg] = useState("");

  function sendata(e) {
    e.preventDefault();
    const serviceType = "Periodical Services";
    //create javascript object
    const newacceptedappointment = {
      name,
      vType,
      vNo,
      serviceType,
      issue,
      contactNo,
      appointmentdate,
      appointmenttime,
      
    }

    axios.post("http://localhost:5000/appointment/addacceptedappointment", newacceptedappointment).then(() => {
      alert("Your Appointment Success") 
      senddataperiodicalAppointmentHistory(selectedAppointment); // Call sendataperiodicalAppointmentHistory function
      Delete(selectedAppointment._id);

    }).catch((err) => {
      alert(err)
    })

  }


  function senddataperiodicalAppointmentHistory() {
   
    //create javascript object
    const newacceptedPeriodicalAppointment = {
      name,
      vType,
      vNo,
      sType,
      lastServiceYear, 
      lastServiceMonth,
      mileage, 
      phone, 
      appointmentdate,
      appointmenttime,
      msg
    }
    axios.post("http://localhost:5000/appointment/addaceptedperiodicalAppointment",newacceptedPeriodicalAppointment).then(() => {
      alert("Appointment added to history")  
      

    }).catch((err) => {
      alert(err)
    })

  }


       //set values to columnns in accepted appointment
       const handleTableRowClick = (appointment) => {
        setname(appointment.name);
        setvType(appointment.vType);
        setvNo(appointment.vNo);
        setserviceType(appointment.serviceType);
        setissue(appointment.sType);
        setcontactNo(appointment.phone);
        setsType(appointment.sType);
        setappointmentdate(appointment.appointmentdate);
        setappointmenttime(appointment.appointmenttime);
        setlastServiceYear(appointment.lastServiceYear);
        setlastServiceMonth(appointment.lastServiceMonth);
        setmileage(appointment.mileage);
        setphone(appointment.phone)
        setmsg(appointment.msg)
    
      };
    
  useEffect(() => {

    function getPeriodicalAppointment() {
      axios.get("http://localhost:5000/appointment/get-periodicalAppointment").then((res) => {
        const sortedAppointments = res.data.sort((a, b) => {
          return new Date(a.appointmentdate) - new Date(b.appointmentdate);
        });
        setperiodicalAppointment(sortedAppointments);  
        console.log(res.data)
      }).catch((err) => {
        alert(err.message);
      })
    }
    getPeriodicalAppointment();

  }, [])

  const handleMoreButtonClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCardClose = () => {
    setSelectedAppointment(null);
  };



  const Delete = (id) => {
    const shouldDelete = window.confirm("please confirm deletion!");

    if (shouldDelete) {
      axios.delete(`http://localhost:5000/appointment/delete-periodicalAppointment/${id}`)
        .then(response => {
          console.log(response);
          window.location.reload();
        })
        .catch(error => {
          // Handle errors here
          console.error(error);
        });
    }
  };
  
  return (
    <main id="main" className="main">

      
      <div>

        <h2 className="SMAAppheading">Periodical Services</h2>

        {selectedAppointment && (
          <div className="SmCard">
          <Card style={{width:"50%"}}>
            <Card.Body>
            <button type="button" class="btn-close" aria-label="Close"  onClick={handleCardClose}></button>
              <Card.Title>Selected Appointment Details</Card.Title>
              <Row>
              <Card.Text style={{display:"flex"}} >
                <strong style={{float:"left"}}>Vehicle No: </strong>{selectedAppointment.vNo}<br />
                <strong style={{marginLeft:"40%",float:"right"}}>Customer Name: </strong>{selectedAppointment.name}<br />
                </Card.Text>
                </Row>
                <Row>
                <Card.Text>
                <strong>Vehicle Type: </strong>{selectedAppointment.vType}<br />
                <strong>Requesting service: </strong>{selectedAppointment.sType}<br />
                </Card.Text>
                </Row>
                <Row>
                <Card.Text>
                <strong>Last Srvice Year: </strong>{selectedAppointment.lastServiceYear}<br />
                <strong>Last Srvice Month: </strong>{selectedAppointment.lastServiceMonth}<br />
                </Card.Text>
                </Row>
                <Row>
                <Card.Text>
                <strong>mileage: </strong>{selectedAppointment.mileage}<br />
                <strong>Description: </strong>{selectedAppointment.msg}<br />
                </Card.Text>
                </Row>
                <Row>
                <Card.Text>
                <strong>Date and Time: </strong>{`${selectedAppointment.appointmentdate.split('T')[0]} ${selectedAppointment.appointmenttime}`}<br />
                <strong>Contact No: </strong>{selectedAppointment.phone}<br />
                </Card.Text>
                </Row >
                <Row style={{marginTop:"4%", display:"flex"}}>
                <Button variant="danger" onClick={() => Delete(selectedAppointment._id)} style={{marginLeft:"20%",width:"100px"}}>Cancel</Button>
                <Button variant="primary" onClick={sendata} style={{marginLeft:"20%",width:"100px"}}>Approve</Button>
                </Row>
            </Card.Body>
          </Card>
          </div>
        )}

        <Table>
         
            <tr> 
              <th>Vehicle No</th>
              <th>Customer Name</th>
              <th>Date and Time</th>
              <th>Contact No</th>
              <th>Description</th>
            </tr>
          <tbody>
            {periodicalAppointment.map((appointment) => (
              <tr key={appointment._id} onClick={() => handleTableRowClick(appointment)}>
                <td>{appointment.vNo}</td>
                <td>{appointment.name}</td>
                <td>{`${appointment.appointmentdate.split('T')[0]} ${appointment.appointmenttime}`}</td>
                <td>{appointment.phone}</td>
                <td>{appointment.sType}</td>
                <td>
                  <Button variant="secondary" style={{marginLeft:"35%"}} onClick={() => handleMoreButtonClick(appointment)}>
                    More
                  </Button></td>
              </tr>

            ))}
          </tbody>
        </Table>
        <Link to='/staff/sm/periodicalhistory'>
        <Button variant="secondary" >
                    View History of accepted appointments
        </Button>
        </Link>
      </div>

    </main>
  )
}
export default SMPeriodicalServices;

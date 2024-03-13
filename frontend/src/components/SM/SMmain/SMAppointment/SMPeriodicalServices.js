import React, { useEffect, useState } from "react";
import axios from "axios";


const SMPeriodicalServices = props => {

//create an empty array to store details
  const[periodicalAppointment,setperiodicalAppointment]=useState([]);
  
  useEffect(()=>{
  
    function getPeriodicalAppointment(){
      axios.get("http://localhost:5000/appointment/find").then((res)=>{
       setperiodicalAppointment(res.data);
      }).catch((err)=>{
        alert(err.message);
      })
    }
    getPeriodicalAppointment();

  },[])
    return (
      <main id="main" className="main">
        <div>

            <h2 className="pHeading">Periodical Services</h2>
            <div className="ptable">
                <table className='table table-bordered'>
                    <thead>
                        <tr>

                            <th>Vehicle No</th>
                            <th>Customer Name</th>
                            <th>Date and Time</th>
                            <th>Contact No</th>
                            <th>Description</th>



                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            {
                                
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {periodicalAppointment.map((appointment, index) => (
                            <tr key={index}>
                                <td>{appointment.vNo}</td>
                                <td>{appointment.name}</td>
                                <td>{`${appointment.appointmentdate} ${appointment.appointmenttime}`}</td>
                                <td>{appointment.phone}</td>
                                <td>{appointment.msg}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
        </main>
    )
}
export default SMPeriodicalServices;


/*const TableComponent = ({
  data
}) => {
  let headings = Object.keys(data[1]);
  return (
    <table className='table table-bordered'>
      <thead>
        <tr>
          {
            headings.map(heading => <th>{heading}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
            data.map(item => 
              <tr>
               {
                  headings.map(heading => <td>{item[heading]}</td>) 
               }
              </tr>
            )
        }
      </tbody>
    </table>
  );
}

const data = [{
  name: 'Marcel',
  surname: 'Michau',
  age: '24',
  gender: 'Male'
}, {
  name: 'Joe',
  surname: 'Bloggs',
  age: '27',
  gender: 'Male'
}, {
  name: 'Jane',
  surname: 'Doe',
  age: '22',
  gender: 'Female'
}];

const data2 = [{
  something: 'Marcel',
  somethingElse: 'Michau',
  yetAnotherThing: '24',
  andAnother: 'Male',
  moarStuff: 'bla bla'
}, {
  something: 'Marcel',
  somethingElse: 'Michau',
  yetAnotherThing: '24',
  andAnother: 'Male',
  moarStuff: 'bla bla'
}, {
  something: 'Marcel',
  somethingElse: 'Michau',
  yetAnotherThing: '24',
  andAnother: 'Male',
  moarStuff: 'bla bla'
}];

ReactDOM.render(<TableComponent data={data}/>, document.getElementById('app'));
*/
import React from 'react'
import Appointment from './appointment'
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';

export default function AppointmentList({appointments, deleteAppointment, error}){

    const timeoutMessage = (
      <div>
        Could not fetch appointments! Is the server back-end running?
      </div>  
    )

      let list = appointments.map(function(appointment) {
          return (
            <ListGroupItem  key={appointment._id}>
              <Appointment appointment={appointment}  key={appointment._id}/>
              <Button bsSize="small"  onClick={() => deleteAppointment=(deleteAppointment(appointment._id))}>Delete</Button>
            </ListGroupItem>
          )
      });

      return (
        <ListGroup>
          {list}
          {error.fetch && timeoutMessage}
        </ListGroup>  
        )
}

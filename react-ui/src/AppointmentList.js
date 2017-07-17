import React from 'react'
import Appointment from './Appointment'
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const AppointmentList = ({appointments}) => 
  <ListGroup>
    {appointments.map(function(appointment) {
      return (
      	<ListGroupItem  key={appointment.id}>
        	<Appointment appointment={appointment}/>
        </ListGroupItem>
      )
    })}
  </ListGroup>

export default AppointmentList;
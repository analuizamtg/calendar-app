import React from 'react'
import Appointment from './Appointment'

const AppointmentList = ({appointments}) => 
  <div>
    {appointments.map(function(appointment) {
      return (
        <Appointment appointment={appointment} key={appointment.id} />
      )
    })}
  </div>

export default AppointmentList;
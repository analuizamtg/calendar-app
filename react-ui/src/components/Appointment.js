import React from 'react'
import { formatDate } from '../Utils/Util'

const Appointment = ({appointment}) => 
  <div>
        <h3>{appointment.title}</h3>
        <h5><b>Start time: </b> {formatDate(appointment.dateAndTime)}</h5>
        <h5><b>End time: </b> {formatDate(appointment.endDateAndTime)}</h5>
  </div>

export default Appointment
import React from 'react'
import moment from 'moment'
import { formatDate } from './Util'

const Appointment = ({appointment}) => 
  <div className='appointment'>
        <h3>{appointment.title}</h3>
        <h5>Start time:  {formatDate(appointment.dateAndTime)}</h5>
        <h5>End time: {formatDate(appointment.endDateAndTime)}</h5>
  </div>

export default Appointment
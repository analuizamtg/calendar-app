import React from 'react'
import { formatDate } from '../Utils/Util'

export default function Appointment ({appointment, deleteAppointment}) {
	return (
		<div>
	        <h3>{appointment.title}</h3>
	        <h5><b>Start time: </b> {formatDate(appointment.dateAndTime)}</h5>
	        <h5><b>End time: </b> {formatDate(appointment.endDateAndTime)}</h5>
  		</div>
		)
}

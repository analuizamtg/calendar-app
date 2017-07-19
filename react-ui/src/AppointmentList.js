import React, { Component } from 'react'
import Appointment from './Appointment'
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import jQuery from 'jquery';

class AppointmentList extends Component{
  	delete(appointment){
  		jQuery.ajax({
  			url: '/appointments/' + appointment._id,
  			type: 'DELETE',
  			error(err){
  				console.log(err);
  			}
  		}).done((data) => {
        	this.props.onDelete(appointment._id);
    });
  	}

  	render(){
    	let appointments = this.props.appointments.map(function(appointment) {
	      	return (
	      		<ListGroupItem  key={appointment._id}>
	        		<Appointment appointment={appointment} key={appointment._id}/>
	        		<Button bsSize="small"  onClick={()=> this.delete(appointment)}>Delete</Button>
	        	</ListGroupItem>
	      	)
    	}.bind(this));
    	return (
    		<ListGroup>
    			{appointments}
    		</ListGroup>	
    		)
  	}
}

export default AppointmentList;
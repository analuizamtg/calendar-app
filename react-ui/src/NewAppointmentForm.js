import React, { Component } from 'react'
import Datetime from 'react-datetime'
import './NewAppointment.css';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
require('react-datetime');  

class NewAppointmentForm extends Component{

	handleSubmit(event) {
    	event.preventDefault();
    	this.props.onFormSubmit();
  	}

  	handleChange (event) {
    	const name = event.target.name;
    	const obj = {};
    	obj[name] = event.target.value;
    	this.props.onUserInput(obj);
  	}

  	setTime(event, name) {
    	const obj = {};
    	if(obj[name] = event.toDate()) {
      		this.props.onUserInput(obj);
    	}
  	}  	

	render(){
		return(
			<div>
				<form onSubmit={(event) => this.handleSubmit(event)} className="NewAppointment">
					<FormGroup controlId="titleInput">
						<ControlLabel>Title</ControlLabel>
						<FormControl name="title" type="text" placeholder="e.g: Meeting with John"value={this.props.title}
			          onChange={(event) => this.handleChange(event)}/>
					</FormGroup>	

			        <ControlLabel> Start date</ControlLabel>
			        <Datetime className="datetime" value={this.props.dateAndTime}
			        onChange={(event) => this.setTime(event, 'dateAndTime')}/>

			        <ControlLabel>End date</ControlLabel>
			        <Datetime className="datetime" value={this.props.endDateAndTime}
			        onChange={(event) => this.setTime(event, 'endDateAndTime')}/>

			        <FormGroup controlId="submit">
      					<Button type="submit" bsStyle="primary">Create</Button>
    				</FormGroup>
		        </form>        
			</div>	
		)
	}
}
export default NewAppointmentForm

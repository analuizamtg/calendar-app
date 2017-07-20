import React, { Component } from 'react'
import Datetime from 'react-datetime'
import "../../node_modules/react-datetime/css/react-datetime.css";
import './NewAppointmentForm.css';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import moment from 'moment';
import $ from 'jquery';
require('react-datetime');  

class NewAppointmentForm extends Component{

	constructor(props) {
	    super(props);
	    this.state = {
	      title: '',
	      dateAndTime: moment().add(1, 'm'),
	      endDateAndTime: moment().add(61, 'm')
	    };
  	}

	handleSubmit(event) {
    	event.preventDefault();
    	const appointment = {title: this.state.title, dateAndTime: String(this.state.dateAndTime), endDateAndTime: String(this.state.endDateAndTime)};
	    $.ajax({
	      type: 'POST',
	      url: '/appointments/',
	      data: appointment,
	      error(err){
	        alert(err.responseJSON.message);
	      }
	    }).done((data) => {
	    	this.setState({title: '', dateAndTime: moment().add(1, 'm'), endDateAndTime: moment().add(61, 'm')});
	    	this.props.onFormSubmit(data);
	    });
  	}

  	handleChange (event) {
    	const name = event.target.name;
    	const obj = {};
    	obj[name] = event.target.value;
    	this.setState(obj);
  	}

  	setTime(event, name) {
    	const obj = {};
    	if(obj[name] === event.toDate()) {
      		this.setState(obj);
    	}
  	}  	

	render(){
		return(
			<div>
				<form onSubmit={(event) => this.handleSubmit(event)} className="NewAppointment">
					<FormGroup controlId="titleInput">
						<ControlLabel>Title</ControlLabel>
						<FormControl name="title" type="text" placeholder="e.g: Meeting with John" value={this.state.title}
			          	onChange={(event) => this.handleChange(event)}/>
					</FormGroup>	

			        <ControlLabel> Start date</ControlLabel>
			        <Datetime className="datetime" value={this.state.dateAndTime}
			        onChange={(event) => this.setTime(event, 'dateAndTime')}/>

			        <ControlLabel>End date</ControlLabel>
			        <Datetime className="datetime" value={this.state.endDateAndTime}
			        onChange={(event) => this.setTime(event, 'endDateAndTime')}/>

			        <FormGroup controlId="submit">
      					<Button color="red" type="submit" bsStyle="primary">Create</Button>
    				</FormGroup>
		        </form>        
			</div>	
		)
	}
}
export default NewAppointmentForm

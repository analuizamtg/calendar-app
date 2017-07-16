import React, { Component } from 'react'
import Datetime from 'react-datetime'
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
				<form onSubmit={(event) => this.handleSubmit(event)}>
					<span> Appointment title</span>
					<input name='title' value={this.props.title}
			          onChange={(event) => this.handleChange(event)} />
			        <span> Start date</span>
			        <Datetime value={this.props.dateAndTime}
			        onChange={(event) => this.setTime(event, 'dateAndTime')}/>

			        <span> End date</span>
			        <Datetime value={this.props.endDateAndTime}
			        onChange={(event) => this.setTime(event, 'endDateAndTime')}/>
			        <input type='submit' value='Make Appointment' className='button'/>
		        </form>        
			</div>	
		)
	}
}
export default NewAppointmentForm

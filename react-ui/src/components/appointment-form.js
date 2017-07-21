import React, { Component }  from 'react'
import { Field, reduxForm } from 'redux-form'
import Datetime from 'react-datetime'
import "../../node_modules/react-datetime/css/react-datetime.css";
import { Button } from 'react-bootstrap';

class AppointmentForm extends Component{

  render(){
    const DateInput = ({ input, label}) => (
    <Datetime onChange={input.onChange}  {...input} />
    );

    const { handleSubmit } = this.props

    return (
      <form onSubmit={ handleSubmit } className="newAppointment">
        <div>
            <label> Title </label>
            <Field name="title" className="form-control" component={"input"} type="text" />
        </div>
        <div>
          <label>Start Date</label>
          <Field name="dateAndTime" component={DateInput} label="Date & Time Starting" />
        </div>
        <div>
          <label>End Date</label>
          <Field name="endDateAndTime" component={DateInput} label="Date & Time Starting" />
        </div>
        <Button type="submit" bsStyle="primary">Create</Button>
      </form>
    ) 
  }
}
export default reduxForm({form: 'apointment'})(AppointmentForm);
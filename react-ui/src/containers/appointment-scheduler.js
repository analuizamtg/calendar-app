import React, { Component } from 'react';
import './appointment-scheduler.css';
import AppointmentForm from '../components/appointment-form';
import AppointmentList from '../components/appointment-list';
import { Grid, Row, Col } from 'react-bootstrap';
import AlertContainer from 'react-alert'
import { connect } from 'react-redux';
import { fetchAppointments, saveAppointment, deleteAppointment} from '../actions/appointments-actions';

class AppointmentScheduler extends Component {

  submit = (appointment) => {
    return this.props.saveAppointment(appointment)
      .then(response => {
         this.alert.show('Appointment successfully created!', {
         time: 3000,
         type: 'success',
     })
      })
      .catch(err => {
         alert(this.props.error.message);
       })
  }

  componentDidMount() {
    this.props.fetchAppointments();
  }

  render() {
    return (
      <div className="App">
        <AlertContainer ref={a => this.alert = a} {...{position: 'top right'}} />
        <div className="App-header"></div>
        <div className="App">
          <Grid>
            <Row>
              <Col xs={12} sm={6} md={4}>
                <h2>New appointment</h2>
                <AppointmentForm appointment={this.props.appointment} onSubmit={this.submit}/>
              </Col>
              <Col xs={12} sm={6} md={8}>
                <h2>All appointments</h2>
                <AppointmentList appointments={this.props.appointments} deleteAppointment={this.props.deleteAppointment}/>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      appointments : state.appointmentStore.appointments, 
      error: state.appointmentStore.error
  }
}

export default connect(mapStateToProps, {fetchAppointments, saveAppointment, deleteAppointment})(AppointmentScheduler);

import React, { Component } from 'react';
import './App.css';
import './react-datetime.css';
import jQuery from 'jquery';
import moment from 'moment';
import NewAppointmentForm from './NewAppointmentForm';
import AppointmentList from './AppointmentList';
import { Grid, Row, Col } from 'react-bootstrap';
import AlertContainer from 'react-alert'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments : []
    };
  }

  addNewAppointment (data) {
     const appointments = this.state.appointments;
     appointments.push(data);
     this.setState({appointments : appointments});
     this.alert.show('Appointment successfully created!', {
         time: 3000,
         type: 'success',
     })
  }

  deleteAppointment(id){
    let items = this.state.appointments, data;
     data = items.filter( el=> {
         return el._id != id;
     })
     this.setState({appointments: data});
     this.alert.show('Appointment successfully deleted', {
          time: 3000,
          type: 'success',
     })
  }

  componentDidMount() {
    let _this = this;

    jQuery.ajax({
      url: '/appointments/',
      success(data) {
        _this.setState({appointments: data});
      }, error(err){
        alert("Could not fetch appointments from API");
      },
      dataType: 'json'
    });
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
                <NewAppointmentForm onFormSubmit={this.addNewAppointment.bind(this)}/>
              </Col>
              <Col xs={12} sm={6} md={8}>
                <h2>All appointments</h2>
                <AppointmentList appointments={this.state.appointments} onDelete={this.deleteAppointment.bind(this)}/>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
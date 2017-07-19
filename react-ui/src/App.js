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
      appointments : [],
      title: '',
      dateAndTime: moment().add(1, 'm'),
      endDateAndTime: moment().add(61, 'm')
    };
  }

  handleUserInput (obj) {
    this.setState(obj);
  }

  handleFormSubmit () {
    const appointment = {title: this.state.title, dateAndTime: String(this.state.dateAndTime), endDateAndTime: String(this.state.endDateAndTime)};
    jQuery.ajax({
      type: 'POST',
      url: '/appointments/',
      data: appointment,
      error(err){
        alert(err.responseJSON.message);
      }
    }).done((data) => {
        this.alert.show('Appointment successfully created!', {
          time: 3000,
          type: 'success',
        })
        const appointments = this.state.appointments;
        appointments.push(data);
        this.setState({appointments : appointments, title: '', dateAndTime: moment().add(1, 'm'), endDateAndTime: moment().add(61, 'm')});
    });
  }

  onDelete(id){
    let items = this.state.appointments, data;
     data = items.filter( el=> {
         return el.id != id;
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
        _this.setState({appointments: data.appointments});
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
                <NewAppointmentForm title={this.state.title}
                dateAndTime={this.state.dateAndTime}
                endDateAndTime={this.state.endDateAndTime}
                onUserInput={(obj) => this.handleUserInput(obj)}
                onFormSubmit={() => this.handleFormSubmit()}/>
              </Col>
              <Col xs={12} sm={6} md={8}>
                <h2>All appointments</h2>
                <AppointmentList appointments={this.state.appointments} onDelete={this.onDelete.bind(this)}/>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;

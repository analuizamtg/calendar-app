import React, { Component } from 'react';
import './App.css';
import './react-datetime.css';
import jQuery from 'jquery';
import moment from 'moment';
import NewAppointmentForm from './NewAppointmentForm';
import AppointmentList from './AppointmentList';
import { Grid, Row, Col } from 'react-bootstrap';

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
        const appointments = this.state.appointments;
        appointments.push(data);
        this.setState({appointments : appointments});
    });
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
        <div className="App-header">
        </div>
        <div className="app">
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
                <AppointmentList appointments={this.state.appointments}/>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;

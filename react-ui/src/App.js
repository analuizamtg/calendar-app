import React, { Component } from 'react';
import './App.css';
import './react-datetime.css';
import jQuery from 'jquery';
import Appointment from './Appointment';
import moment from 'moment';
import NewAppointmentForm from './NewAppointmentForm'
import AppointmentList from './AppointmentList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments : [],
      title: '',
      dateAndTime: moment().add('m',1),
      endDateAndTime: moment().add('m',61)
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
          <h3> Make a new appointment </h3>
        </div>
        <div className="App-intro">
          <NewAppointmentForm title={this.state.title}
          dateAndTime={this.state.dateAndTime}
          endDateAndTime={this.state.endDateAndTime}
          onUserInput={(obj) => this.handleUserInput(obj)}
          onFormSubmit={() => this.handleFormSubmit()}/>
          <AppointmentList appointments={this.state.appointments}/>
        </div>
      </div>
    );
  }
}

export default App;

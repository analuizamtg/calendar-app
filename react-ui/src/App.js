import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './react-datetime.css';
import moment from 'moment';
import * as Datetime from 'react-datetime'
import jQuery from 'jquery';
import { formatDate } from './Util'

require('react-datetime');  

class Appointment extends Component {
  render() {
    return (
      <div className="appointment">
        <h3>{this.props.title}</h3>
        <h5>Start time:  {formatDate(this.props.dateAndTime)}</h5>
        <h5>End time: {formatDate(this.props.endDateAndTime)}</h5>
      </div>
    );
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments : []
    };
  }

  componentDidMount() {
    let _this = this;

    jQuery.ajax({
      url: '/appointments/',
      success(data) {
        _this.setState({appointments: data})
      },
      dataType: 'json'
    });
  }

  render() {
    let appointments = []
    if (this.state !== null){
      this.state.appointments.forEach((item) => {
        appointments.push(<Appointment title={item.title} dateAndTime={item.dateAndTime} endDateAndTime={item.endDateAndTime} key={item._id}/>);
      });
      console.log(appointments);
    }

      return (
      <div className="App">
        <div className="App-header">
          <h3> Make a new appointment </h3>
        </div>
        <p className="App-intro">
          <div className="appointments">{appointments}</div>
        </p>
      </div>
    );

  }
}

export default App;

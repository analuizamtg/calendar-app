import React from 'react';
import ReactDOM from 'react-dom';
import AppointmentScheduler from './containers/appointment-scheduler';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from "./store"
import './index.css';

ReactDOM.render(
<BrowserRouter>
	<Provider store={store}>
	  <AppointmentScheduler />
	</Provider>
</BrowserRouter>,
  document.getElementById('root')
);

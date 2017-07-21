import { combineReducers } from 'redux';
import AppointmentReducer from './appointments-reducer';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  appointmentStore: AppointmentReducer,
  form: formReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
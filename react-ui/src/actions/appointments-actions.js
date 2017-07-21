import axios from 'axios';

const url = '/appointments';

export function fetchAppointments(){
  return dispatch => {
    dispatch({
      type: 'FETCH_APPOINTMENTS',
      payload: axios.get('/appointments')
    })
  }
}

export function saveAppointment(appointment) {	
  return dispatch => {
    return dispatch({
      type: 'SAVE_APPOINTMENT',
      payload: axios.post(url, appointment)
    })
  }
}

export function deleteAppointment(_id) {
  return dispatch => {
    return dispatch({
      type: 'DELETE_APPOINTMENT',
      payload: axios.delete(`${url}/${_id}`)
    })
  }
}
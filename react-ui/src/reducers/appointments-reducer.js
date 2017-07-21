import moment from 'moment';
const defaultState = {
  appointments: [],
  error: ""
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
    case 'FETCH_APPOINTMENTS_FULFILLED': {
      return {...state,
              appointments: action.payload.data };
    } 
    case 'FETCH_APPOINTMENTS_REJECTED': {
      return {
        ...state,
        error : action.payload.response.data
      };  
    }
    case 'SAVE_APPOINTMENT_FULFILLED': {
      return {
        ...state,
        appointments: [...state.appointments, action.payload.data],
      };
    }
    case 'SAVE_APPOINTMENT_REJECTED': {
        return {
        ...state,
        error : action.payload.response.data
      };
    }
    case 'NEW_APPOINTMENT': {
      return {
        ...state,
        appointment:  {title: '', dateAndTime: moment(), endDateAndTime: moment()}
      }
    }
    case 'DELETE_APPOINTMENT_FULFILLED': {
        const _id = action.payload.data._id;
        return {
          ...state,
          appointments: state.appointments.filter(item => item._id !== _id)
        }
      }
    default:
      return state;
  }
}
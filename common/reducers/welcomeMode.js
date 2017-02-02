import { SET_SIGNUP_MODE, SET_LOGIN_MODE } from '../actions/authActions';
const initalState = SET_LOGIN_MODE;


const welcomeMode = (state = initalState, action) => {
  switch (action.type) {
    case SET_SIGNUP_MODE:
      return action.type;
    case SET_LOGIN_MODE:
      return action.type;
    case 'LOGOUT':
      return initalState;
    default:
      return state;
  }

}

export default welcomeMode;

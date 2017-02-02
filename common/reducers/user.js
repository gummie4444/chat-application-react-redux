import { SIGNUP, LOGIN } from '../actions/authActions';

//TODO:initalstate
const initalState = {};

const user = (state = initalState, action) => {

  switch (action.type) {
    case SIGNUP:
      return action.payload;
    case LOGIN:
      return action.payload;
    case 'LOGOUT':
      return initalState;
    default:
      return state;
  }

}

export default user;

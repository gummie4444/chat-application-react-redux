const initalState = {
    open: false,
    message: ''
  }
  //import { getPrivateChatName } from '../helpers/helper';

const snackBar = (state = initalState, action) => {

  switch (action.type) {
    case 'ADD_CHANNEL_SOCKET':
      return { open: true, message: 'You got added to channel: ' + action.payload.name };
    case 'ADD_NEW_CHANNEL_JOIN_SOCKET':
      return { open: true, message: 'New join: ' + action.payload };
    case 'ADD_NEW_CHANNEL_LEAVE_SOCKET':
      return { open: true, message: action.payload + ' just left' };
    case 'CLOSE_SNACKBAR':
      return initalState
    case 'LOGOUT':
      return initalState;
    default:
      return state;
  }

}

export default snackBar;

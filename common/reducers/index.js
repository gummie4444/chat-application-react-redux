import { combineReducers } from 'redux';
import welcomeMode from './welcomeMode';
import user from './user';
import socket from './socket';
import activeChannel from './activeChannel';
import activeUsers from './activeUsers';
import channels from './channels';
import messages from './messages';
import users from './users';
import snackBar from './snackBar';

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  welcomeMode,
  user,
  socket,
  activeUsers,
  activeChannel,
  users,
  channels,
  messages,
  snackBar,
  form: formReducer
})

export default rootReducer;

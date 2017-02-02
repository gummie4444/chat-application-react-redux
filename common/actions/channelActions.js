import { getMessagesForChannel } from './messageActions'
import fetch from 'isomorphic-fetch';

export const getChatChannels = (name) => {

  return dispatch => {
    return fetch('/api/channels', {
        method: 'post',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
      })
      .then(res => {
        return res.json();
      })
      .then(channels => {
        dispatch(succesfullGetChatChannels(channels))
        if (channels.length > 0) {
          dispatch(changeActiveChannel(channels[0]));
          dispatch(getMessagesForChannel(channels[0]));
        }
      })
      .catch(err => {
        console.log(err, 'channels');
      })
  }
}

export const succesfullGetChatChannels = (channels) => ({
  type: 'ADD_CHANNELS',
  payload: channels
})

export const succesfullNewChannel = (channel) => {
  return dispatch => {
    dispatch({
      type: 'ADD_CHANNEL',
      payload: channel
    });
    dispatch({
      type: 'SOCKET/ADD_CHANNEL',
      payload: channel
    });
  }

}
export const changeActiveChannel = (channel) => {

  return dispatch => {
    dispatch({
      type: 'CHANGE_ACTIVE_CHANNEL',
      payload: channel.name
    });
    dispatch({
      type: 'SOCKET/CHANGE_ACTIVE_CHANNEL',
      payload: channel.name
    })
  }
}


export const isChannelNameAvailable = (channelName) => {

  return dispatch => {
    return fetch('/api/ischannelavailable', {
        method: 'post',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'channelName': channelName })
      }).then(res => {
        return res.json();
      })
      .then(available => {
        return available.available
      })
  }
}

export const newChatChannel = (name, users, privateChannel = false) => {
  let chatChannel = {};
  if (privateChannel) {
    chatChannel = {
      name: name,
      users: users,
      private: true
    }
  } else {
    chatChannel = {
      name: name,
      users: users
    }
  }

  return dispatch => {
    return fetch('/api/newchannel', {
        method: 'post',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(chatChannel)
      })
      .then(res => {
        return res.json();
      })
      .then(channel => {
        dispatch(succesfullNewChannel(channel));
        //TODO:DO THIS HERE? AND GET MSGS ASWELL?
        dispatch(changeActiveChannel(channel))

      })
      .catch(err => {
        console.log('channels', err);
      })
  }
}

export const closeSnackBar = () => ({
  type: 'CLOSE_SNACKBAR'
})

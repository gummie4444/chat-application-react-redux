import fetch from 'isomorphic-fetch';

export const succesfullGetMessagesForChatChannel = (messeges) => ({
  type: 'ADD_MESSAGES',
  payload: messeges
})

export const getMessagesForChannel = (channel) => {
  console.log('getMessagesForChannel', channel.name)
  return dispatch => {
    console.log('getChatChannelus');
    return fetch('/api/messages', {
        method: 'post',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: channel.name })

      })
      .then(res => {
        return res.json();
      })
      .then(messages => {
        dispatch(succesfullGetMessagesForChatChannel(messages))
      })
      .catch(err => {
        console.log(err, 'channels');
      })
  }
}

export const succesfullNewMessage = (message) => {
  return dispatch => {
    dispatch({
      type: 'ADD_MESSAGE',
      payload: message
    });
    dispatch({
      type: 'SOCKET/ADD_MESSAGE',
      payload: message
    })
  }
}

export const upploadNewImage = (files, channel, user) => {
  return dispatch => {

    var data = new FormData();
    data.append('file', files[0]);
    data.append('user', user.name);
    data.append('channelID', channel);
    fetch('/api/newimage', {
      method: 'POST',
      body: data
    }).then(res => {
      return res.json();
    }).then(newImageMessage => {
      dispatch(succesfullNewMessage(newImageMessage));
    })
  }
}


export const newMessage = (message, channel, user) => {
  const messageObj = {
    message: message,
    channel: channel,
    user: user.name
  }

  return dispatch => {
    return fetch('/api/newmessage', {
        method: 'post',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(messageObj)
      })
      .then(res => {
        return res.json();
      })
      .then(newMessage => {
        dispatch(succesfullNewMessage(newMessage));
      })
      .catch(err => {
        console.log('newMessageErr', err);
      })
  }
}

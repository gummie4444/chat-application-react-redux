exports = module.exports = function(io) {
  const users = {};
  io.on('connection', function(socket) {
    console.log("Socket connected: " + socket.id);

    let currentChannel = '';

    socket.on('action', (action) => {

      if (action.type === 'SOCKET/LOGIN' || action.type === 'SOCKET/SIGNUP') {

        users[socket.id] = action.payload.name;
        socket.broadcast.emit('action', { type: 'ADD_ACTIVE_USER_SOCKET', payload: { name: users[socket.id], _id: socket.id } });

      } else if (action.type === 'SOCKET/ADD_MESSAGE') {

        socket.to(action.payload.channelID).emit('action', { type: 'ADD_MESSAGE_SOCKET', payload: action.payload });

      } else if (action.type === 'SOCKET/CHANGE_ACTIVE_CHANNEL') {

        socket.leave(currentChannel);
        socket.to(currentChannel).emit('action', { type: 'ADD_NEW_CHANNEL_LEAVE_SOCKET', payload: users[socket.id] });

        socket.to(action.payload).emit('action', { type: 'ADD_NEW_CHANNEL_JOIN_SOCKET', payload: users[socket.id] });
        socket.join(action.payload);

        currentChannel = action.payload;

      } else if (action.type === 'SOCKET/ADD_CHANNEL') {

        //HELP FUNCTION
        const isSocketConnected = (obj, value) => {
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (obj[key] === value) {
                return key
              }
            }
          }
          return false
        }

        action.payload.users.forEach((name) => {
          let socketID = isSocketConnected(users, name);
          if (socketID) {
            socket.to(socketID).emit('action', { type: 'ADD_CHANNEL_SOCKET', payload: action.payload });
          }
        });

      } else if (action.type === 'SOCKET/GET_ACTIVE_USERS') {

        const formatActiveUsersForClient = (obj) => {
          var array = [];
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              array.push({ name: obj[key], _id: key });
            }
          }
          return array;
        }

        const formatedUsers = formatActiveUsersForClient(users);
        socket.emit('action', { type: 'ADD_ACTIVE_USERS_SOCKET', payload: formatedUsers });

      } else if (action.type === 'SOCKET/LOGOUT') {
        socket.broadcast.emit('action', { type: 'REMOVE_ACTIVE_USER_SOCKET', payload: { name: users[socket.id] } });
        delete users[socket.id];
      }
    })

    socket.on('disconnect', function() {

      socket.broadcast.emit('action', { type: 'REMOVE_ACTIVE_USER_SOCKET', payload: { name: users[socket.id] } });

      delete users[socket.id];
    });

  });
}

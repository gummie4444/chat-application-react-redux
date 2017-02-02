const initalState = {}
  //SOCKET API Here we append for our request to the server
const socket = (state = initalState, action) => {
  switch (action.type) {
    case 'message':
      return Object.assign({}, { message: action.data });

    case 'LOGIN':
      return Object.assign({}, { user: action.payload })

    case 'SIGNUP':
      return Object.assign({}, { user: action.payload })

    case 'ADD_MESSAGE':
      return Object.assign({}, { message: action.payload })

    case 'CHANGE_ACTIVE_CHANNEL':
      return Object.assign({}, { channel: action.payload })

    case 'GET_ACTIVE_USERS':
      return Object.assign({})

    case 'LOGOUT':
      return initalState

    default:
      return state;
  }
}


export default socket;

const initalState = []; //array af channels

const users = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        action.payload
      ]
    case 'ADD_USERS':
      return [
        ...action.payload
      ]
    case 'LOGOUT':
      return initalState;

    default:
      return state
  }
}


export default users

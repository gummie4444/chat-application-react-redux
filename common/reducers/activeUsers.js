const initalState = []; //array af channels

const activeUsers = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_ACTIVE_USER':
      return [
        ...state,
        action.payload
      ]
    case 'ADD_ACTIVE_USERS':
      return [
        ...action.payload
      ]
    case 'ADD_ACTIVE_USERS_SOCKET':
      return [
        ...action.payload
      ]

    case 'ADD_ACTIVE_USER_SOCKET':
      return [
        ...state.filter(s => s.name !== action.payload.name),
        action.payload
      ]
    case 'REMOVE_ACTIVE_USER_SOCKET':
      return [
        ...state.filter(s => s.name !== action.payload.name)
      ]
    case 'LOGOUT':
      return initalState

    default:
      return state
  }
}


export default activeUsers

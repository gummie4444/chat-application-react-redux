const initalState = '';

const activeChannel = (state = initalState, action) => {
  switch (action.type) {
    case 'CHANGE_ACTIVE_CHANNEL':
      return action.payload

    case 'LOGOUT':
      return initalState

    default:
      return state
  }
}


export default activeChannel

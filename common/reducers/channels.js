const initalState = []; //array af channels

const channels = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_CHANNEL':
      return [
        ...state,
        action.payload
      ]
    case 'ADD_CHANNEL_SOCKET':
      return [
        ...state,
        action.payload
      ]
    case 'ADD_CHANNELS':
      return [
        ...state,
        ...action.payload
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    case 'LOGOUT':
      return initalState

    default:
      return state
  }
}


export default channels

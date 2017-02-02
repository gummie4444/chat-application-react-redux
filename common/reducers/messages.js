const initalState = [];

const messages = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [
        ...state,
        action.payload
      ]
    case 'ADD_MESSAGE_SOCKET':
      return [
        ...state,
        action.payload
      ]
    case 'ADD_MESSAGES':
      console.log("action", action)
      if (action.payload.length === 0)
        return state;
      else {
        let channelID = action.payload[0].channelID

        return [...state.filter(m => m.channelID !== channelID),
          ...action.payload
        ];

      }
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


export default messages

// Import stuff
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getChatChannels, newChatChannel } from '../actions/channelActions';
import { getUsers, getActiveUsers } from '../actions/activeUserActions';
import Chat from '../components/Chat';

class ChatContainer extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    activeChannel: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    activeUsers: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    snackBar: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, user, activeChannel, channels } = this.props;
    dispatch(getChatChannels(user.name));
    dispatch(getUsers());
    dispatch(getActiveUsers());
  }

  render() {
    return (
      <Chat {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
    user: state.user,
    activeChannel: state.activeChannel,
    messages: state.messages,
    activeUsers: state.activeUsers,
    users: state.users,
    snackBar: state.snackBar
  }
}

ChatContainer = connect(
  mapStateToProps
)(ChatContainer)

export default ChatContainer;

import React, { PropTypes } from 'react';
import ChatChannelUserList from '../components/ChatChannelUserList';
import ChatMessageList from '../components/ChatMessageList';
import AppBar from 'material-ui/AppBar';

import { getMessagesForChannel, newMessage, upploadNewImage } from '../actions/messageActions';
import { logout, SET_SIGNUP_MODE, SET_LOGIN_MODE } from '../actions/authActions';
import { changeActiveChannel, newChatChannel, closeSnackBar } from '../actions/channelActions'

import RaisedButton from 'material-ui/RaisedButton';
import { TextField, FlatButton } from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Snackbar from 'material-ui/Snackbar';
import AddImageModal from './AddImageModal'

class Chat extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    activeUsers: PropTypes.array.isRequired,
    channels: PropTypes.array.isRequired,
    activeChannel: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    snackBar: PropTypes.object.isRequired
  };


  constructor(props, context) {
    super(props, context);
  }

  state = {
    messageValue: '',
    isImageModalOpen: false
  };

  componontWillMount() {
    const { dispatch } = this.props;

    //TODO:?????
    if (user && activeChannel) {
      dispatch(getMessagesForChannel(activeChannel));
    }
  }

  handleRequestClose(e) {
    this.props.dispatch(closeSnackBar());
  };

  componentDidUpdate() {
    const messageList = this.refs.testList;
    messageList.scrollTop = messageList.scrollHeight;
  }

  signOutUser() {
    this.props.dispatch(logout())
  }

  //Select current channel
  clickChannel(channel) {
    this.props.dispatch(changeActiveChannel(channel));
    this.props.dispatch(getMessagesForChannel(channel));
  }

  //Select user, either create new private channel or open old one
  clickUser(user) {
    //TODO:BETTER??
    const name = user.name > this.props.user.name ? (user.name + '-' + this.props.user.name) : (this.props.user.name + '-' + user.name);

    let channel = this.props.channels.filter((channel) => {
      return channel.name === name
    });

    if (channel.length !== 0) {
      this.props.dispatch(changeActiveChannel(channel['0']));
      this.props.dispatch(getMessagesForChannel(channel['0']));
    } else {
      this.props.dispatch(newChatChannel(name, [user.name, this.props.user.name], true));
    }
  }

  //SEND MESSAGE
  handleChange(e) {
    this.setState({
      messageValue: e.target.value,
    });
  };

  openImageModal() {
    this.setState({
      isImageModalOpen: true
    })
  }
  handleMessageSubmit(e) {
    e.preventDefault();


    const message = this.state.messageValue;
    if (message === '')
      return

    this.setState({
      messageValue: ''
    });

    this.props.dispatch(newMessage(message, this.props.activeChannel, this.props.user))
  }

  upploadImage(files) {
    this.props.dispatch(upploadNewImage(files, this.props.activeChannel, this.props.user));
    this.closeUpploadImageModal();
  }

  closeUpploadImageModal() {
    this.setState({
      isImageModalOpen: false
    })
  }

  render() {
    return (

      <div className ="chatContainer">
		<AppBar
			title = {"Chat application - User: "  +this.props.user.name }
			iconElementRight={ <FlatButton onClick = {this.signOutUser.bind(this)} secondary={true} label= "logout"/>}
		/>
		<div className ="chatListContainer">
			<div className ='chatMessageList'>
				<div ref ="testList" className = 'chatMessageListContainer'>
					<ChatMessageList {...this.props}/>
				</div>
			    <div className='chatMessageInputContainer'>
			     <form onSubmit={this.handleMessageSubmit.bind(this)} style ={{width:"100%"}}>
				    <TextField
				      fullWidth = {true}
				      hintText = 'Write message here'
				      className ='chatMessageInput'
				      value={this.state.messageValue}
      				  onChange={this.handleChange.bind(this)}
      				  disabled ={this.props.activeChannel === ''}
				    />

				    <FloatingActionButton disabled ={this.props.activeChannel === ''} type ="submit" className ="chatMessageInputButton" >
				    	<div style ={{color:"white"}}>send</div>
				    </FloatingActionButton>

				    <FlatButton disabled ={this.props.activeChannel === ''} style ={{height:'60px'}} onClick = {this.openImageModal.bind(this)}>
				    	Add image
				    </FlatButton>

				     </form>
			      </div>
			</div>

			<div className ="chatChannelUserListContainer">
				<ChatChannelUserList clickUser ={this.clickUser.bind(this)} clickChannel = {this.clickChannel.bind(this)} {...this.props}/>
			</div>
		</div>
  		<Snackbar
          open={this.props.snackBar.open}
          message={this.props.snackBar.message}
          autoHideDuration={3000}
          onRequestClose ={this.handleRequestClose.bind(this)}
        />
       <AddImageModal isOpen = {this.state.isImageModalOpen} upploadImage = {this.upploadImage.bind(this)} handleClose = {this.closeUpploadImageModal.bind(this)}/>

	</div>
    )
  }
}

export default Chat;

import React, { PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ImageMessage from './ImageMessage';
import Message from './Message';

class ChatMessageList extends React.Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    activeChannel: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  formatDate(date) {
    //TODO:ADD MOMENT JS
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    const tempDate = date;

    if (tempDate.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
      return strTime;
    } else {
      return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }

  }

  render() {

    const { messages, activeChannel, user } = this.props;

    return (
      <List>
        {messages.filter(m => m.channelID === activeChannel).map((message)=>
            message.imageURL ?
               <ImageMessage message = {message} formatDate = {this.formatDate} own = {user.name === message.user.name}/>
              :
               <Message message = {message} formatDate = {this.formatDate} own = {user.name === message.user.name}/> 
        )}
      </List>
    )
  }
}

export default ChatMessageList;

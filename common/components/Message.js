import React from 'react';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';


class Message extends React.Component {

  render() {
    const { message, formatDate, own } = this.props;
    return (
      <div>
      {own?
        <ListItem
        key = {message._id}
        secondaryText = {
          <span >
            {formatDate(new Date(message.createdAt))} <br/>
            <span>{message.user.name}</span>    
          </span>
        }
        primaryText={message.message}
        secondaryTextLines={2}
        rightAvatar={<Avatar> {message.user.name[0]}</Avatar>}
        className = { 'myMessage'}
        disabled = { true }
        >
      </ListItem>
      :
      <ListItem
        key = {message._id}
        secondaryText = {
          <span style ={{textAlign:'right'}}>
            {formatDate(new Date(message.createdAt))} <br/>
            <span>{message.user.name}</span>    
          </span>
        }
        primaryText={message.message}
        secondaryTextLines={2}
        leftAvatar={<Avatar> {message.user.name[0]}</Avatar>}
        className = 'otherMessage'
        disabled = { true }
         >
        </ListItem>
      }
      </div>

    )
  }
}
export default Message;

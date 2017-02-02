import React from 'react';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';

class ImageMessage extends React.Component {

  render() {
    const { message, formatDate, own } = this.props;
    return (
      <div>{own ?

      	      <ListItem
              key = {message._id}
              secondaryText = {
                <span>
                  {formatDate(new Date(message.createdAt))} <br/>
                  <span>{message.user.name}</span>    
                </span>
              }
              secondaryTextLines={2}
              rightAvatar={<Avatar> {message.user.name[0]}</Avatar>}
              className='myMessage'
              disabled = { true }
            >
          <img  style ={{maxHeight:'200px'}} src={'/api/getimage/' + message.imageURL}/>  
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
              secondaryTextLines={2}
              leftAvatar={<Avatar> {message.user.name[0]}</Avatar>}
              className='otherMessage'
              disabled = { true }
            >
         <img  style ={{maxHeight:'200px'}} src={'/api/getimage/' + message.imageURL}/>  
        </ListItem>
      }
	</div>


    )
  }
}

export default ImageMessage;

import React, { PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { ContentAdd, CommunicationChatBubble, ActionFace } from 'material-ui/svg-icons';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { getPrivateChatName } from '../helpers/helpers';

import AddChannelModal from './AddChannelModal';
import { newChatChannel } from '../actions/channelActions';

import SearchInput, { createFilter } from 'react-search-input'

class ChatChannelUserList extends React.Component {

  static propTypes = {
    channels: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    clickChannel: PropTypes.func.isRequired,
    clickUser: PropTypes.func.isRequired,
    activeChannel: PropTypes.string.isRequired,
    activeUsers: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isAddChannelModalOpen: false,
      searchTerm: ''
    };

  }

  openModal() {
    this.setState({
      isAddChannelModalOpen: true
    });
  }

  closeModal() {
    this.setState({
      isAddChannelModalOpen: false
    });
  }

  submitModal(channelName, users) {
    this.props.dispatch(newChatChannel(channelName, users))
    this.closeModal();
  }

  cancelModal() {
    this.closeModal();
  }

  pickChannel(channel) {
    this.props.clickChannel(channel)
  }

  pickUserChannel(user) {
    this.props.clickUser(user)
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  render() {
    //TODO:MABY REFACTOR INTO SMALLER COMPONENTS
    const { channels, activeUsers, user, activeChannel, users, dispatch } = this.props;

    const filteredChannels = channels.filter(createFilter(this.state.searchTerm, ['name']))
    const filteredActiveUsers = activeUsers.filter(u => u.name !== user.name).filter(createFilter(this.state.searchTerm, ['name'])) //only take 5 
    return (
      <div style ={{height:"100%"}}>
      <SearchInput  style = {{width:"100%"}} className="search-input" onChange={this.searchUpdated.bind(this)} />

      <div className = "channelList">  
        <List className = "testClass" >
          {filteredChannels.length > 0 && <Subheader>Channels</Subheader>}

          {filteredChannels.map(channel=>
          !channel.private ? <ListItem
            key = {channel._id}
            primaryText={channel.name}
            leftAvatar={<Avatar> # </Avatar>}
            rightIcon={<CommunicationChatBubble color = "whitesmoke"/>}
            onClick = {this.pickChannel.bind(this,channel)}
            className={activeChannel === channel.name ? 'activeChannel':''}
          />
          :
          <ListItem 
            key = {channel._id}
            primaryText = {getPrivateChatName(channel.users,user.name)}
            leftAvatar={<Avatar> <ActionFace color ="whitesmoke"/></Avatar>}
            rightIcon={<CommunicationChatBubble color = "whitesmoke"/>}
            onClick = {this.pickChannel.bind(this,channel)}
            className={activeChannel === channel.name ? 'activeChannel':''}
            />
          )}
          </List>
        </div>

        {filteredActiveUsers.length !== 0 && filteredChannels.length !== 0 && <Divider />}
        <ListItem     
            primaryText='New Channel'
            rightIcon={<ContentAdd />}
            onClick = {this.openModal.bind(this)}
          />  
        {filteredActiveUsers.length !== 0 && filteredChannels.length !== 0 && <Divider />}
        <div className = "channelList">
          <List>
            {filteredActiveUsers.length > 0 && <Subheader>Active users</Subheader>}
          {filteredActiveUsers.splice(0,5).map(activeUser=>
            <ListItem
              key = {activeUser._id}
              primaryText={activeUser.name}
              leftAvatar={<Avatar style ={{backgroundColor:"green"}}> <ActionFace color ="whitesmoke"/></Avatar>}
              rightIcon={<CommunicationChatBubble color ="whitesmoke"/>}
              onClick = {this.pickUserChannel.bind(this,activeUser)} //todopick user
            /> 
            )}
          </List>
        </div>
      <AddChannelModal dispatch = {dispatch} user = {user} users = {users} isOpen = {this.state.isAddChannelModalOpen} handleSubmit = {this.submitModal.bind(this)} handleClose = {this.cancelModal.bind(this)}/>
    </div>

    )
  }
}


export default ChatChannelUserList;

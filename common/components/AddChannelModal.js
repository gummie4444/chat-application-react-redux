import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import { isChannelNameAvailable } from '../actions/channelActions';
import LinearProgress from 'material-ui/LinearProgress';

import SearchInput, { createFilter } from 'react-search-input'

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

export default class AddChannelModal extends React.Component {
  state = {
    open: false,
    stepIndex: 0,
    channelName: '',
    users: [],
    channelError: '',
    searchTerm: '',
    checkingName: false,
    error: false
  };

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  checkChannelName() {
    //TODO:ADD VALIDATION

    this.setState({
      checkingName: true
    })

    const channelName = this.refs.channelName.getValue();

    this.props.dispatch(isChannelNameAvailable(channelName)).then((result) => {
      if (result) {
        this.setState({
          stepIndex: 1,
          channelName: channelName,
          checkingName: false,
          error: false
        });
      } else {
        this.setState({
          error: true,
          checkingName: false
        });
      }
    })

  }

  back() {
    this.setState({
      stepIndex: 0,
      users: [],
      channelName: '',
      searchTerm: '',
      checkingName: false
    })
  }

  checkCheckbox(name, t) {

    this.setState((prevState) => {
      const index = prevState.users.indexOf(name)
      return index > 0 ? { users: prevState.users.splice(index, 1) } : { users: [...prevState.users, name] }
    })
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  closeModal() {
    this.back();
    this.props.handleClose();
  }

  submit() {
    //TODO:ADD VALIDATION
    if (this.state.channelName !== '') {
      this.props.handleSubmit(this.state.channelName, [...this.state.users, this.props.user.name]); //TODO ADD USERS

      this.setState({
        open: false,
        stepIndex: 0,
        channelName: '',
        users: [],
        channelError: '',
        checkingName: false
      })
    } else {
      //TODO:ADD VALIDATION

      this.setState({
        channelError: 'Dude bad name bro'
      })
    }
  }

  render() {
    const { users, isOpen, handleClose, user } = this.props;

    const userNames = users.filter(createFilter(this.state.searchTerm, ['name']))

    const actions = this.state.stepIndex === 0 ? [<FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeModal.bind(this)}
      />,
      <FlatButton
        label="Next"
        primary={true}
        keyboardFocused={true}
        onClick={this.checkChannelName.bind(this)}
      />
    ] : [<FlatButton
        label="Back"
        primary={true}
        onClick={this.back.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.submit.bind(this)}
      />
    ]

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={isOpen}
          onRequestClose={handleClose}
        >
        <Stepper activeStep={this.state.stepIndex}>
          <Step>
            <StepLabel>Channel name</StepLabel>
          </Step>
          <Step>
            <StepLabel>Users</StepLabel>
          </Step>

        </Stepper>
        {this.state.stepIndex === 0 ?
          <div>
            <TextField
              ref='channelName'
              hintText="Channel name"
              floatingLabelText="Channel name"
              fullWidth = {true}
            />
            {this.state.error && <div style = {{textAlign:"center", color:"red"}}> <strong>Channel name unavailable</strong> </div>}

            {this.state.checkingName && <LinearProgress mode="indeterminate" /> }
          </div>
          :
          <div>
            <SearchInput style = {{width:"100%"}} className="search-input" onChange={this.searchUpdated.bind(this)} />
            <Divider />
            <List className ="modalUserList">
              {userNames.map((u)=>
                u.name !== user.name &&
                <ListItem
                  key = {u._id}
                  primaryText = {u.name}
                  leftCheckbox={<Checkbox onCheck = {this.checkCheckbox.bind(this,u.name)}/>}
                  />               
              )}
            </List>
          </div>
        }
        </Dialog>
      </div>
    );
  }
}

import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { isChannelNameAvailable } from '../actions/channelActions';
import LinearProgress from 'material-ui/LinearProgress';
import Dropzone from 'react-dropzone';

import SearchInput, { createFilter } from 'react-search-input'


export default class AddImageModal extends React.Component {
  state = {
    files: []
  };

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    upploadImage: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
  }

  onDrop(acceptedFiles) {

    this.setState({
      files: acceptedFiles
    });
  }

  submit() {
    this.setState({
      files: []
    })

    this.props.upploadImage(this.state.files);
  }

  back() {
    this.setState({
      files: []
    })

    this.props.handleClose();

  }

  removeThisImage() {
    this.setState({
      files: []
    });

  }

  render() {
    const { users, isOpen, handleClose, user } = this.props;

    const actions = [<FlatButton
        label="Cancel"
        primary={true}
        onClick={this.back.bind(this)}
      />,
      <FlatButton
        label="Add image"
        primary={true}
        keyboardFocused={true}
        onClick={this.submit.bind(this)}
      />
    ]

    return (
      <Dialog
          actions={actions}
          modal={false}
          open={isOpen}
          onRequestClose={handleClose}
        >

        {this.state.files.length !== 0 ?
          <div className = "imageWrapper">
            <div>{this.state.files.map((file) => <img className = "imageDropzoneImage" src={file.preview}/> )}</div> 
            <RaisedButton
             onClick ={this.removeThisImage.bind(this)}
             label = "Chose another image"
              secondary={true}
            />
          </div>
          :
          <Dropzone 
            className ="imageDropzone" onDrop={this.onDrop.bind(this)}
            //accept = "image/*"
            >
            <div style = {{width:"50%"}}>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        }

       </Dialog>
    );
  }
}

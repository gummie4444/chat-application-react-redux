// Import stuff
import React from 'react';
import { connect } from 'react-redux';
import LogMonitor from '../../common/containers/DevTools';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { loadUser } from '../actions/authActions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class AppContainer extends React.Component {

  static propTypes = {
    children: React.PropTypes.element,
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    //TOODODODODO
    //dispatch(newChatChannel());
    //dispatch(getOnlineUsers(user.name))
    //dispatch(loadUser()); 
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
		<div className="wrapper">
    		{ this.props.children }

    		<LogMonitor theme='solarized' />

  		</div>
	</MuiThemeProvider>

    )
  }
}

export default connect()(AppContainer)

import React, { PropTypes } from 'react';

import Form from '../components/Form';

import { changeSignupMode, changeLoginMode, login, signup, SET_LOGIN_MODE } from '../actions/authActions';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

class WelcomeContainer extends React.Component {

  constructor() {
    super();
  }
  componentWillMount() {
    const { dispatch, user, welcomeMode } = this.props;
  }

  handleLoginSubmit(user) {
    return this.props.dispatch(login({ name: user.name, password: user.password }));
  }

  handleSignupSubmit(user) {
    return this.props.dispatch(signup({ name: user.name, password: user.password }));
  }

  render() {
    const { dispatch, user } = this.props;
    return (
      <div className ="welcomeContainer">
		<h1>Chat app</h1>
		<h2>{this.props.welcomeMode === SET_LOGIN_MODE ? 'Login to use the app':'Signup with your username'}</h2>

		<RaisedButton
			className="testButton"
			label="Signup"
			onClick={()=> dispatch(changeSignupMode())}
			primary={this.props.welcomeMode === SET_LOGIN_MODE }
			/>
			<br/>

		<RaisedButton
			className="testButton"
			label="Login"
			onClick={()=> dispatch(changeLoginMode())}
			primary={this.props.welcomeMode !== SET_LOGIN_MODE }/>
			<br />

		{this.props.welcomeMode === SET_LOGIN_MODE ? <Form onSubmit ={this.handleLoginSubmit.bind(this)} submitText = 'Login' />:<Form onSubmit ={this.handleSignupSubmit.bind(this)} submitText = 'Signup'/>}
	</div>
    );
  }
}

const mapStateToProps = (state) => ({
  welcomeMode: state.welcomeMode,
  user: state.user
})

WelcomeContainer = connect(
  mapStateToProps
)(WelcomeContainer)

export default WelcomeContainer;

import '../common/css/style.css';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';

import { Redirect, Router, Route, IndexRoute } from 'react-router';
import React from 'react';

import ChatContainer from '../common/containers/ChatContainer';
import WelcomeContainer from '../common/containers/WelcomeContainer';
import AppContainer from '../common/containers/AppContainer';
import { browserHistory } from 'react-router';
import routes from '../common/routes';
import cookieAuth from '../common/middleware/cookieAuth';

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const rootElement = document.getElementById('app');

render(
  <Provider store={store}>
		<div>
			<Router history={browserHistory}>
			{routes}
			</Router>
		</div>
	</Provider>,

  rootElement
)

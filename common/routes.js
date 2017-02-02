import { Redirect, Router, Route, IndexRoute } from 'react-router';
import React from 'react';

import ChatContainer from './containers/ChatContainer';
import WelcomeContainer from './containers/WelcomeContainer';
import AppContainer from './containers/AppContainer';
import { browserHistory } from 'react-router';
import cookieAuth from './middleware/cookieAuth';

//import localStorageAuth from './middleware/localStorageAuth';

const requireAuth = (nextState, replace) => {
  //console.log(cookieAuth.isUserAuthenticated(), "auth");
  if (!cookieAuth.isUserAuthenticated()) {
    console.log("should redirect");
    //replace(null, '/welcome');
    //cb();
  } else {
    //cb();
  }
}

const Routes = (<Route component = {AppContainer}>
				<Route path = '/'  component = {WelcomeContainer}/>
				<Route path = '/chat' component = {ChatContainer}/>
			</Route>)


export default Routes;

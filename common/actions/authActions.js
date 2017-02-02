import cookieAuth from '../middleware/cookieAuth';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import { SubmissionError } from 'redux-form'


export const SET_SIGNUP_MODE = 'SET_SIGNUP_MODE'
export const SET_LOGIN_MODE = 'SET_LOGIN_MODE'
export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

export const changeSignupMode = () => ({

  type: SET_SIGNUP_MODE
})

export const changeLoginMode = () => ({
  type: SET_LOGIN_MODE
})

export const succesfullLogin = (user) => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      payload: user
    });
    dispatch({
      type: 'SOCKET/LOGIN',
      payload: user
    })
  }
}

export const succesfullSignup = (user) => {
  return dispatch => {
    dispatch({
      type: 'SIGNUP',
      payload: user
    });
    dispatch({
      type: 'SOCKET/SIGNUP',
      payload: user
    })
  }
}

export const succesfullLogout = (user) => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT'
    });
    dispatch({
      type: 'SOCKET/LOGOUT'
    })
  }
}

export const logout = (user) => {
    return dispatch => {
      //dispatch(startingSignout());
      return fetch('/api/logout', {
          method: 'post',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        })
        .then(response => {
          if (response.ok) {
            console.log("logout succes")

            dispatch(succesfullLogout(user));
            cookieAuth.deauthenticateUser();
            browserHistory.push('/');
          }
        })
        .catch(error => {
          console.log(error, "error");
          //dispatch(errorSignout(user.username));
          throw error
        });
    }
  }
  //???????
export const loadUser = () => {
  return dispatch => {
    const email = cookieAuth.getEmail();
    if (email) {
      dispatch(succesfullLogin({ name: name }));

    }
  }
}

export const login = (user) => {
  return dispatch => {
    //dispatch(startingSignin());
    return fetch('/api/login', {
        method: 'post',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      .then(response => {

        if (response.ok) {
          console.log("login succes", response)
          dispatch(succesfullLogin({ name: user.name }));
          cookieAuth.authenticateUser(user.name);
          browserHistory.push('/chat');
          //localStorageAuth.authenticateUser('TOKEN');

        } else if (response.status === 401) {
          throw new SubmissionError({ _error: 'Username or password invalid' })
        }
      })
  }
}

export const signup = (user) => {
  return dispatch => {
    //dispatch(startingSignup());
    return fetch('/api/signup', {
        method: 'post',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      .then(response => {
        if (response.ok) {
          console.log('SIGNUP SUCCES', response);
          dispatch(succesfullSignup({ name: user.name }));

          cookieAuth.authenticateUser(user.name);
          browserHistory.push('/chat');
        } else {
          throw new SubmissionError({ _error: 'Username taken' })
        }
      })

  }
}

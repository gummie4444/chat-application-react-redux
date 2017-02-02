import fetch from 'isomorphic-fetch';

export const succesfullGetUsers = (users) => ({
  type: 'ADD_USERS',
  payload: users
})

export const getActiveUsers = () => ({
  type: 'SOCKET/GET_ACTIVE_USERS'
})

export const getUsers = () => {

  return dispatch => {
    return fetch('/api/users', {
        method: 'get',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(res => {
        return res.json();
      })
      .then(users => {
        dispatch(succesfullGetUsers(users));
      })
      .catch(err => {
        console.log(err);
      })
  }
}

import cookie from 'react-cookie';

//USET ODODOD

class cookieAuth {

  /**
   * Authenticate a user. Save a name string in Local Storage
   *
   * @param {string} name
   */
  static authenticateUser(name) {
    cookie.save('name', name)
  }

  /**
   * Check if a user is authenticated - check if a name is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    console.log(cookie.load('name'), 'name');
    return !!cookie.load('name');
  }

  /**
   * Deauthenticate a user. Remove a name from Local Storage.
   *
   */
  static deauthenticateUser() {
    cookie.remove('name');
  }

  /**
   * Get a name value.
   *
   * @returns {string}
   */

  static getname() {
    return cookie.load('name');
  }

}

export default cookieAuth;

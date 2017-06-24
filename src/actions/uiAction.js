import axios from 'axios';
import { getMessages } from './messagesAction';
import { socketJoin, socketLeave } from './socketAction';

import { TOGGLE_SETTINGS_CLASSNAME, CHANGE_THEME, CHANGE_FONT, CHANGE_USERNAME, SIGNUP_SUCCESS,
  SIGNUP_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_OUT, LOGIN_CHECK_SUCCESS, LOGIN_CHECK_FAILED } from '../constants/userConstants';

// ******************** Profile change section *****************

export function settingsToggle(isActive) {
  return {
    type: TOGGLE_SETTINGS_CLASSNAME,    
    isActive,
  };
}

export function changeTheme(themeSelected) {
  return {
    type: CHANGE_THEME,
    themeSelected,
  };
}

export function changeFont(fontSize) {
  return {
    type: CHANGE_FONT,
    fontSize,
  };
}

export function changeNick(nick) {
  return {
    type: CHANGE_USERNAME,
    nick,
  };
}

export function profileChangeRequest(theme, fontSize, username) {
  return dispatch =>
    axios({
      method: 'post',
      url: '/users/setprofile',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        theme,
        fontSize,
        username,
      }),
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        theme !== null && dispatch(changeTheme(theme));  
        fontSize !== null && dispatch(changeFont(fontSize));
        username !== null && dispatch(changeNick(username));
      }
    })
    .catch(error => {
      console.log('Profile change request failed', error);
    });
}

// ************ Signup section **************

// Successful post dispatch
export function signupSuccess(successMsg) {
  return dispatch => {
    dispatch({
      type: SIGNUP_SUCCESS,
      successMsg,
    });
  };
}

export function signupError(error) {
  return dispatch => {
    dispatch({
      type: SIGNUP_ERROR,
      error: error.response.data.errors,
    });
  };
}

export function signupRequest(username, email, password, password2) {
  return dispatch =>
    axios({
      method: 'post',
      url: '/users/signup',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        username,
        email,
        password,
        password2,
      }),
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(signupSuccess(response.data));
      }
    })
    .catch(error => {
      console.log('request failed', error);
      dispatch(signupError(error));
    });
}


// ************ Login section ***************

export function loginSuccess(user) {
  return dispatch => {
    dispatch({
      type: LOGIN_SUCCESS,
      user: user.user,
      isAuthenticated: user.isAuthenticated,
    });
    dispatch(getMessages());
    user.isAuthenticated ? dispatch(socketJoin(user.user.username, user.user.email)) : null;
  };
}

export function loginError(error) {
  const { status, statusText } = error.response.status;
  return dispatch => {
    dispatch({
      type: LOGIN_ERROR,
      error: status,
      errorMsg: statusText,
    });
  };
}

export function logOut(name) {
  return dispatch => {
    axios({
      method: 'post',
      url: '/users/logout',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        dispatch({
          type: LOGIN_OUT,
        });
        dispatch(socketLeave(name));
      })
      .catch(error => {
        console.log('Logout failed', error);
      });
  };
}

export function loginRequest(email, password) {
  return dispatch =>
    axios({
      method: 'post',
      url: '/users/login',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email,
        password,
      }),
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(loginSuccess(response.data));
      }
    })
    .catch(error => {
      console.log('request failed', error);
      dispatch(loginError(error));
    });
}

export function loginCheckSuccess(user) {
  return dispatch => {
    dispatch({
      type: LOGIN_CHECK_SUCCESS,
      isAuthenticated: user.isAuthenticated,
      user: user.user || '',
    });
    user.isAuthenticated ? dispatch(socketJoin(user.user.username, user.user.email)) : null;
  };
}

export function loginCheckFailed(error) {
  return dispatch => {
    dispatch({
      type: LOGIN_CHECK_FAILED,
      isAuthenticated: false,
      errorStatus: error.response.status || '',
      errorMsg: error.response.data || '',
    });
  };
}

export function loginCheck() {
  return dispatch =>
    axios({
      method: 'get',
      url: '/users/loggedin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(loginCheckSuccess(response.data));
      }
    })
    .catch(error => {
      console.log('Couldn\'t check if session exists', error);
      dispatch(loginCheckFailed(error));
    });
}

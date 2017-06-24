import {
  TOGGLE_SETTINGS_CLASSNAME,
  CHANGE_THEME,
  CHANGE_FONT,
  CHANGE_USERNAME,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_OUT,
  LOGIN_CHECK_SUCCESS,
  LOGIN_CHECK_FAILED,
} from '../constants/userConstants';

function uiReducer(
  state = [{ authenticated: false, isLoggedIn: false }],
  action) {
  switch (action.type) {
    case TOGGLE_SETTINGS_CLASSNAME:
      if (action.isActive) {
        return [
          ...state,
          {
            settingsOpen: true,
          },
        ];
      }
      return [
        ...state,
        {
          settingsOpen: false,
        },
      ];

    case CHANGE_THEME:
      return { ...state, themeSelected: action.themeSelected };

    case CHANGE_FONT:
      return { ...state, fontSize: action.fontSize };

    case CHANGE_USERNAME:
      return { ...state, username: action.username };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        successMsg: action.successMsg,
        authenticated: true,
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        error: action.error,
        authenticated: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: action.isAuthenticated,
        user: action.user,
        themeSelected: action.user.themeSelected,
        fontSize: action.user.fontSize,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        error: action.error,
        errorMsg: action.errorMsg,
      };

    case LOGIN_OUT:
      return {
        ...state,
        isLoggedIn: false,
        authenticated: false,
        user: null,
      };

    case LOGIN_CHECK_SUCCESS:
      return {
        ...state,
        isLoggedIn: action.isAuthenticated,
        user: action.user,
        themeSelected: action.user.themeSelected,
        fontSize: action.user.fontSize,
      };

    case LOGIN_CHECK_FAILED:
      return {
        ...state,
        isLoggedIn: action.isAuthenticated,
        errorStatus: action.errorStatus,
        errorMsg: action.errorMsg,
      };

    default:
      return state;
  }
}

export default uiReducer;

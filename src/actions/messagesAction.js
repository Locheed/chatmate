import axios from 'axios';
import { POST_CHAT_MESSAGE, POST_CHAT_MESSAGE_ERROR, GET_CHAT_MESSAGE_ERROR, GET_CHAT_MESSAGES } from '../constants/messageConstants';


// Error dispatching on get
export function getError(error) {
  return dispatch => {
    dispatch({
      type: GET_CHAT_MESSAGE_ERROR,
      error,
    });
  };
}

export function getMessages() {
  return dispatch => {
    axios.get('messages')
      .then((res) => {
        dispatch({
          type: GET_CHAT_MESSAGES,
          payload: res.data
        });
      })
      .catch(error => {
        console.log('request failed', error);
        dispatch(getError(error));
      });
  };
}

// Successful post dispatch
export function postSuccess(sendTime, message, messageId) {
  return dispatch => {
    dispatch(getMessages());
  };
}

// Error dispatching on post
export function postError(error) {
  return dispatch => {
    dispatch({
      type: POST_CHAT_MESSAGE_ERROR,
      error,
    });
  };
}

export function postMessage(sendTime, message, messageId) {
  return dispatch =>
    axios({
      method: 'post',
      url: 'messages/post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        messageId,
        sendTime,
        message,
      }),
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(postSuccess(sendTime, message, messageId));
      }
    })
    .catch(error => {
      console.log('request failed', error);
      dispatch(postError(error));
    });
}




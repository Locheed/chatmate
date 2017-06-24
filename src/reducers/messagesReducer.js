import {
  POST_CHAT_MESSAGE,
  POST_CHAT_MESSAGE_ERROR,
  GET_CHAT_MESSAGE_ERROR,
  GET_CHAT_MESSAGES,
} from '../constants/messageConstants';

function messagesReducer(state = [], action) {
  switch (action.type) {
    case GET_CHAT_MESSAGES:
      return action.payload || [];

    case GET_CHAT_MESSAGE_ERROR:
      return [
        ...state,
        {
          error: 'Something went wrong while fetching posts.',
          errorMsg: `${action.error}`,
        },
      ];

    case POST_CHAT_MESSAGE:
      return state;

    case POST_CHAT_MESSAGE_ERROR:
      return [
        ...state,
        {
          error: 'Something went wrong while posting.',
          errorMsg: `${action.error}`,
        },
      ];

    default:
      return state;
  }
}

export default messagesReducer;

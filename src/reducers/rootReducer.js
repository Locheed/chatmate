import { combineReducers } from 'redux';

import messagesReducer from './messagesReducer';
import uiReducer from './uiReducer';
import socketReducer from './socketReducer';

const rootReducer = combineReducers({
  messages: messagesReducer,
  uiControl: uiReducer,
  socket: socketReducer,
});

export default rootReducer;

import { applyMiddleware, createStore, compose } from 'redux';
//import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import rootReducer from './reducers/rootReducer';

let composeEnhancers = compose;
const socket = io();

const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const initialState = {
  uiControl: { themeSelected: 'theme-three', authenticated: false },
};

const middleware = [thunk, socketIoMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger'); // eslint-disable-line global-require
  middleware.push(logger);
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware)));

export default store;

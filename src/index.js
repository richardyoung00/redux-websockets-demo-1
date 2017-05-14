import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import App from './App';
import './index.css';
import files from './reducers/files'

// import socket middleware
import { socketMiddleware } from './middleware/socket';

// import and initialise socket io client
import io from 'socket.io-client';

const socket = io();

const reducers = combineReducers({ files });

let store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // inject socket middleware into the store
  applyMiddleware(socketMiddleware(socket))
);

// listen for WS events from the server, and dispatch them directly to the redux store
socket.on('fileActions', (data) => {
  store.dispatch(data)
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

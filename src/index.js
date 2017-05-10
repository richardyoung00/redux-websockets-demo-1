import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import App from './App';
import './index.css';
import fileChanges from './reducers/fileChanges'
import { socketMiddleware } from './middleware';

const reducers = combineReducers({
  fileChanges,
});

const socket = io();

socket.on('connect', () => console.log("Connected to server"));
socket.on('disconnect', () => console.log("Disconnected from server"));

let store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(socketMiddleware(socket))
);

socket.on('serverFileChange', (data) => {
  store.dispatch(data)
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

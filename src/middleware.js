export const socketMiddleware = socket => store => next => action => {
  if (action.type === 'CREATE_FILE') {
    socket.emit('fileActions', action)
  }
  return next(action);
};
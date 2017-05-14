const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fsWrapper = require('./fsWrapper');
const actions = require('./src/actions/files');

// send action to clear all files
let clearAllFiles = (client) => {
  client.emit('fileActions', actions.clearFilesAction());
};

// iterate through all existing files and send action to add each one to client
let sendUpdatedListOfFiles = (client) => {
  fsWrapper.readDirectory((files) => {
    files.map((file) => {
      client.emit('fileActions', actions.fileCreatedAction(file));
    });
  });
};

// listen for new connections
io.on('connection', (client) => {
  // send clear files and send updated list
  clearAllFiles(client);
  sendUpdatedListOfFiles(client);

  // listen for actions from the client
  client.on('fileActions', (action) => {
    if (action.type === 'CREATE_FILE') {
      fsWrapper.createNewFile(action.filename);
    }
  })
});

// watch the directory for changes and send action via WS
fsWrapper.watch((changeType, fullPath) => {
  io.emit('fileActions', {type: changeType, name: fullPath})
});

http.listen(3001, () => {
  console.log('listening on *:3001');
});


const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

const directoryWatcher = require('./directoryWatcher');

const watchDir = 'C:/dev/redux-websockets/temp';

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.emit('serverFileChange', {type: 'CLEAR_FILES'});

  fs.readdir(watchDir, function (err, items) {
    items.map((item) => {
      socket.emit('serverFileChange', {type: 'SERVER_FILE_ADDED', name: item});
    });
  });

  socket.on('fileActions', (action) => {
    if (action.type === 'CREATE_FILE') {
      fs.openSync(watchDir + '/' + action.filename, 'w');
    }
  })

});

directoryWatcher.watch(watchDir, (changeType, fullPath) => {
  io.emit('serverFileChange', {type: changeType, name: fullPath})
});


http.listen(3001, function () {
  console.log('listening on *:3001');
});


var watch = require('node-watch');
var path = require('path');
const fs = require('fs');
const watchDir = 'C:/dev/redux-websockets/temp';

const changeTypeActions = {update: 'SERVER_FILE_ADDED', remove: 'SERVER_FILE_REMOVED'};

exports.watch = (listener) => {
  watch(watchDir, { recursive: true }, (changeType, name) => {
    listener(changeTypeActions[changeType], path.basename(name));
  });
};

exports.createNewFile = (filename) => {
  fs.openSync(watchDir + '/' + filename, 'w');
};

exports.readDirectory = (fileIterator) => {
  return fs.readdir(watchDir, (err, items) => fileIterator(items));
};





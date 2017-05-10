var watch = require('node-watch');
var path = require('path');

const changeTypeActions = {update: 'SERVER_FILE_ADDED', remove: 'SERVER_FILE_REMOVED'};

exports.watch = (watchDir, listener) => {
  watch(watchDir, { recursive: true }, (changeType, name) => {
    listener(changeTypeActions[changeType], path.basename(name));
  });
};

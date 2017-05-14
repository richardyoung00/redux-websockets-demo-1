// a file was added to the server
exports.fileCreatedAction = (filename) => {
  return {
    type: 'SERVER_FILE_ADDED',
    filename}
};

// a file was removed from the server
exports.fileRemovedAction = (filename) => {
  return {
    type: 'SERVER_FILE_REMOVED',
    filename}
};

// clear all files on the client
exports.clearFilesAction = () => {
  return {type: 'CLEAR_FILES'};
};

// create a new file on the server
exports.createFileAction = (filename) => {
  return {
    type: 'CREATE_FILE',
    filename
  };
};

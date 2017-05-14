exports.createFileAction = (filename) => {
  return {
    type: 'CREATE_FILE',
    filename
  };
};

exports.fileCreatedAction = (filename) => {
  return {
    type: 'SERVER_FILE_ADDED',
    filename}
};

exports.clearFilesAction = () => {
  return {type: 'CLEAR_FILES'};
};
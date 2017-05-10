export const createFileAction = (filename) => {
  return {
    type: 'CREATE_FILE',
    filename
  }
};
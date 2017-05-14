
const initialState = {
  fileList: []
};

const files = (state = initialState, action) => {

  switch (action.type) {
    // file was added to the server
    case 'SERVER_FILE_ADDED':
      const addList = state.fileList.slice();
      addList.push(action.filename);
      return {
        ...state,
        fileList: addList
      };
    // file was removed from the server
    case 'SERVER_FILE_REMOVED':
      return {
        ...state,
        fileList: removeItem(state.fileList, action.filename)
      };
    // clear all files
    case 'CLEAR_FILES':
      return {
        ...state,
        fileList: []
      };
    default:
      return state
  }
};

// remove an item from an array
function removeItem(array, name) {
  return array.filter( (item, index) => item !== name);
}

export default files
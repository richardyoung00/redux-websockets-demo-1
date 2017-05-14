
const initialState = {
  fileList: []
};

const files = (state = initialState, action) => {

  switch (action.type) {
    case 'SERVER_FILE_ADDED':
      const addList = state.fileList.slice();
      addList.push(action.filename);
      return {
        ...state,
        fileList: addList
      };
    case 'SERVER_FILE_REMOVED':
      return {
        ...state,
        fileList: removeItem(state.fileList, action.filename)
      };
    case 'CLEAR_FILES':
      return {
        ...state,
        fileList: []
      };
    default:
      return state
  }
};

function removeItem(array, name) {
  return array.filter( (item, index) => item !== name);
}

export default files
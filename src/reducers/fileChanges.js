
const initialState = {
  fileList: []
};

const fileChanges = (state = initialState, action) => {

  switch (action.type) {
    case 'SERVER_FILE_ADDED':
      const addList = state.fileList.slice();
      addList.push(action.name);
      return {
        ...state,
        fileList: addList
      };
    case 'SERVER_FILE_REMOVED':
      return {
        ...state,
        fileList: removeItem(state.fileList, action.name)
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

export default fileChanges
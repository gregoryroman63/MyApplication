import { createStore } from "redux";

function reducer(state, action) {
  if (!state) {
    return {
      repopulateForm: false
    };
  }
  if (action.type === "SET_REPOPULATE_FORM") {
    return {
      ...state,
      repopulateForm: action.repopulateForm
    };
  }
}
export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

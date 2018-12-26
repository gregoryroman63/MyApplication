import { createStore } from "redux";

function reducer(state, action) {
  if (!state) {
    return {
      user: null
    };
  }
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.user,
      roles: action.user.roles
    };
  }
}
export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

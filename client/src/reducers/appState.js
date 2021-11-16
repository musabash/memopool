import { UPDATE_STATE } from "../constants/actionTypes";
export default (appState = {}, action) => {
  switch(action.type) {
    case UPDATE_STATE:
      return ({...appState, ...action.payload});
    default:
      return appState;
  }
}
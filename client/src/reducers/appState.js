export default (appState = {}, action) => {
  switch(action.type) {
    case 'UPDATE_STATE':
      return ({...appState, ...action.payload});
    default:
      return appState;
  }
}
import { combineReducers } from 'redux';
import posts from './posts';
import appState from './appState'

export default combineReducers({
  posts,
  appState
})
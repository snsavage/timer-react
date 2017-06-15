import { combineReducers } from 'redux';
import { routineReducer } from './routine';

export default combineReducers({
  routine: routineReducer,
});

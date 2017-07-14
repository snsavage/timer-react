import { combineReducers } from 'redux';
import { routineReducer, routinesReducer } from './routine';

export default combineReducers({
  routine: routineReducer,
  routines: routinesReducer,
});

import { combineReducers } from 'redux';
import { routineReducer, routinesReducer, currentRoutineReducer } from './routine';

export default combineReducers({
  routine: routineReducer,
  routines: routinesReducer,
  currentRoutine: currentRoutineReducer,
});

import { combineReducers } from 'redux';

import { routineReducer, routinesReducer, currentRoutineReducer } from './routine';
import { sessionReducer } from './session';

export default combineReducers({
  routine: routineReducer,
  routines: routinesReducer,
  currentRoutine: currentRoutineReducer,
  session: sessionReducer,
});

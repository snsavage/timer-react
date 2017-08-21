import { combineReducers } from 'redux';

import { routineReducer, routinesReducer } from './routine';
import { currentRoutineReducer } from './currentRoutine'
import { sessionReducer } from './session';

export default combineReducers({
  routine: routineReducer,
  routines: routinesReducer,
  currentRoutine: currentRoutineReducer,
  session: sessionReducer,
});

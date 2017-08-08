import {
  createPlaylist,
  advancePlaylist,
  rewindPlaylist,
  updatePlaylist,
} from './routineUtils';

export function routineReducer(state = {
  loading: true,
  routine: {},
} , action) {
  switch(action.type) {
    case 'LOADING_ROUTINE':
      return Object.assign({}, state, { loading: true });

    case 'FETCH_ROUTINE':
      return Object.assign(
        {}, state, { loading: false, routine: action.payload }
      );

    default:
      return state;
  }
}

export function routinesReducer(state = {
  loading: true,
  routines: [],
}, action) {
  switch(action.type) {
    case 'LOADING_ROUTINES':
      return Object.assign({}, state, { loading: true });
    case 'FETCH_ROUTINES':
      return Object.assign(
        {}, state, { loading: false, routines: action.payload }
      );
    default:
      return state;
  }
}

export function currentRoutineReducer(state = {
  loading: true,
  routine: {},
  playlist: [],
  completedPlaylist: [],
}, action) {
  switch(action.type) {
    case 'LOADING_CURRENT_ROUTINE':
      return Object.assign({}, state, { loading: true });

    case 'FETCH_CURRENT_ROUTINE':
      return Object.assign(
        {}, state, {
          loading: false,
          routine: action.payload,
          playlist: createPlaylist(action.payload),
        }
      );

    case 'CLEAR_CURRENT_ROUTINE':
      return Object.assign({}, state, { routine: {}, playlist: [] });

    case 'START_TIMER':
      return Object.assign({}, state, { timerId: action.payload });

    case 'ADVANCE_TIMER':
      const updatedPlaylist = updatePlaylist(state.playlist);

      return Object.assign({}, state, { playlist: updatedPlaylist });
    default:
      return state;
  }
}

import uuidV4 from 'uuid/v4';

import {
  createPlaylist,
  advancePlaylist,
  rewindPlaylist,
} from './routineUtils';

const defaultRoutine = {
  id: uuidV4(),
  name: "",
  description: "",
  link: "",
  public: false,
  groups: [
    {
      id: uuidV4(),
      order: 1,
      times: 1,
      intervals: [
        {
          id: uuidV4(),
          name: "",
          order: 1,
          duration: 0,
        },
      ]
    },
  ]
}

export function currentRoutineReducer(state = {
  loading: true,
  routine: defaultRoutine,
  playlist: [],
  completedPlaylist: [],
}, action) {
  switch(action.type) {
    case 'CHANGE_CURRENT_ROUTINE':
      const routine = Object.assign(
        {}, state.routine, { [action.field]: action.value }
      );
      return Object.assign({}, state, { routine: routine });

    case 'CHANGE_CURRENT_ROUTINE_GROUP':
      const groups = state.routine.groups.map((group, index) => {
        if (group.id === action.groupId) {
          return Object.assign({}, group, {[action.field]: action.value});
        } else {
          return group;
        }
      });

      return Object.assign(
        {}, state, {routine: Object.assign({}, state.routine, {groups: groups})}
      );

    case 'CHANGE_CURRENT_ROUTINE_INTERVAL':
      const newGroups = state.routine.groups.map((group, index) => {
        if (group.id === action.groupId) {
          const intervals = group.intervals.map((interval) => {
            if (interval.id === action.intervalId) {
              return Object.assign({}, interval, {[action.field]: action.value});
            } else {
              return interval;
            }
          });

          return Object.assign({}, group, {intervals: intervals});
        } else {
          return group;
        }
      });

      return Object.assign(
        {}, state, {routine: Object.assign({}, state.routine, {groups: newGroups})}
      );

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
      return Object.assign(
        {}, state, { routine: defaultRoutine, playlist: [], completedPlaylist: [] }
      );

    case 'START_TIMER':
      return Object.assign({}, state, { timerId: action.payload });

    case 'ADVANCE_TIMER':
      return Object.assign(
        {}, state, advancePlaylist(state)
      );

    case 'REWIND_TIMER':
      return Object.assign(
        {}, state, rewindPlaylist(state)
      );

    default:
      return state;
  }
}

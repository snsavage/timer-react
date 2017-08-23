import uuidV4 from 'uuid/v4';

import {
  createPlaylist,
  advancePlaylist,
  rewindPlaylist,
} from './routineUtils';

function defaultRoutine(uuid) {
  return {
    id: uuid(),
    name: "",
    description: "",
    link: "",
    public: false,
    groups: [
      {
        id: uuid(),
        order: 1,
        times: 1,
        intervals: [
          {
            id: uuid(),
            name: "",
            order: 1,
            duration: 0,
          },
        ]
      },
    ]
  }
}

export function currentRoutineReducer(state = {
  loading: true,
  routine: defaultRoutine(uuidV4),
  playlist: [],
  completedPlaylist: [],
}, action) {
  switch(action.type) {
    case 'ADD_CURRENT_ROUTINE_GROUP':
      return Object.assign(
        {}, state, {routine: Object.assign(
          {}, state.routine, {
            groups: [...state.routine.groups, ...defaultRoutine(uuidV4).groups]
          }
        )
      });

    case 'REMOVE_CURRENT_ROUTINE_GROUP':
      const remainingGroups = state.routine.groups.filter((group) => {
        return group.id !== action.groupId;
      });

      return Object.assign(
        {}, state, { routine: Object.assign(
          {}, state.routine, { groups: remainingGroups }
        )
      });

    case 'ADD_CURRENT_ROUTINE_INTERVAL':
      const groupsWithNewInterval = state.routine.groups.map((group) => {
        if (group.id === action.groupId) {
          const defaultInterval = defaultRoutine(uuidV4).groups[0].intervals[0];
          const intervals = [...group.intervals, defaultInterval];

          return Object.assign({}, group, { intervals: intervals });
        } else {
          return group
        }
      });

      return  Object.assign(
        {}, state, { routine: Object.assign(
          {}, state.routine, { groups: groupsWithNewInterval }
        )}
      );

    case 'REMOVE_CURRENT_ROUTINE_INTERVAL':
      const groupsWithoutInterval = state.routine.groups.map((group) => {
        if (group.id === action.groupId) {
          const remainingIntervals = group.intervals.filter((interval) => {
            return interval.id !== action.intervalId;
          });

          return Object.assign({}, group, { intervals: remainingIntervals });
        } else {
          return group;
        }
      });

      const newRoutine = Object.assign({}, state.routine, { groups: groupsWithoutInterval });

      return Object.assign({}, state, { routine: newRoutine });

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
        {}, state, { routine: defaultRoutine(uuidV4), playlist: [], completedPlaylist: [] }
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

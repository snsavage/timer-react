import uuidV4 from 'uuid/v4';

import { compareOrder } from './routineUtils';

import {
  createPlaylist,
  advancePlaylist,
  rewindPlaylist,
} from './routineUtils';

function defaultRoutine(uuid, groupOrder = 1, intervalOrder = 1) {
  return {
    id: uuid(),
    name: "",
    description: "",
    link: "",
    public: false,
    groups: [
      {
        id: uuid(),
        order: groupOrder,
        times: 1,
        intervals: [
          {
            id: uuid(),
            name: "",
            order: intervalOrder,
            duration: 0,
          },
        ]
      },
    ]
  }
}

export function currentRoutineReducer(state = {
  loading: true,
  saved: true,
  error: "",
  routine: defaultRoutine(uuidV4),
  playlist: [],
  completedPlaylist: [],
}, action) {
  switch(action.type) {
    case 'SUCCESSFULLY_CREATED_ROUTINE':
      return Object.assign({}, state, {
        loading: false, saved: true, currentRoutine: action.payload
      });

    case 'UNSUCCESSFULLY_CREATED_ROUTINE':
      return Object.assign({}, state, {
        loading: false, saved: false, error: action.payload
      });

    case 'CREATING_ROUTINE':
      return Object.assign({}, state, { loading: true });

    case 'SUCCESSFULLY_UPDATED_ROUTINE':
      return Object.assign({}, state, {
        loading: false, saved: true, currentRoutine: action.payload
      });

    case 'UNSUCCESSFULLY_UPDATED_ROUTINE':
      return Object.assign({}, state, {
        loading: false, saved: false, error: action.payload
      });


    case 'UPDATING_ROUTINE':
      return Object.assign({}, state, { loading: true });

    case 'MARK_ROUTINE_AS_NOT_SAVED':
      return Object.assign({}, state, { saved: false });

    case 'MARK_ROUTINE_AS_SAVED':
      return Object.assign({}, state, { saved: true });

    case 'MOVE_GROUP_UP':
      return (function() {
        let order = state.routine.groups.find(
          (e) => e.id === action.groupId
        ).order

        const groups = state.routine.groups.map((group, index) => {
          if (order === 1) {
            return group;
          } else {
            if (group.id === action.groupId) {
              return Object.assign({}, group, { order: order - 1 });
            } else if (group.order === order - 1) {
              return Object.assign({}, group, { order: group.order + 1 });
            } else {
              return group;
            }
          }
        }).sort(compareOrder);

        return Object.assign(
          {}, state, {routine: Object.assign({}, state.routine, {groups: groups})}
        );
      })(state, action);

    case 'MOVE_INTERVAL_UP':
      return (function() {
        const groups = state.routine.groups.map((group, index) => {
          if (group.id === action.groupId) {
            let order = group.intervals.find((e) => e.id === action.intervalId
            ).order;

            const intervals = group.intervals.map((interval) => {
              if (order === 1) {
                return interval;
              } else {
                if (interval.id === action.intervalId) {
                  return Object.assign({}, interval, { order: order - 1});
                } else if (interval.order === order -1) {
                  return Object.assign({}, interval, { order: interval.order + 1});
                } else {
                  return interval;
                }
              }
            }).sort(compareOrder);

            return Object.assign({}, group, { intervals: intervals });
          } else {
            return group
          }
        })

        return Object.assign(
          {}, state, {routine: Object.assign({}, state.routine, {groups: groups})}
        );
      })(state, action);


    case 'MOVE_GROUP_DOWN':
      return (function() {
        let order = state.routine.groups.find(
          (e) => e.id === action.groupId
        ).order

        const groups = state.routine.groups.map((group, index) => {
          if (order === state.routine.groups.length) {
            return group;
          } else {
            if (group.id === action.groupId) {
              return Object.assign({}, group, { order: order + 1 });
            } else if (group.order === order + 1) {
              return Object.assign({}, group, { order: group.order - 1 });
            } else {
              return group;
            }
          }
        }).sort(compareOrder);

        return Object.assign(
          {}, state, {routine: Object.assign({}, state.routine, {groups: groups})}
        );
      })(state, action);

    case 'MOVE_INTERVAL_DOWN':
      return (function() {
        const groups = state.routine.groups.map((group, index) => {
          if (group.id === action.groupId) {
            let order = group.intervals.find(
              (e) => e.id === action.intervalId
            ).order

            const intervals = group.intervals.map((interval) => {
              if (order === group.intervals.length) {
                return interval;
              } else {
                if (interval.id === action.intervalId) {
                  return Object.assign({}, interval, { order: order + 1});
                } else if (interval.order === order + 1) {
                  return Object.assign({}, interval, { order: interval.order - 1});
                } else {
                  return interval;
                }
              }
            }).sort(compareOrder);

            return Object.assign({}, group, { intervals: intervals });
          } else {
            return group
          }
        })

        return Object.assign(
          {}, state, {routine: Object.assign({}, state.routine, {groups: groups})}
        );
      })(state, action);
      return state;

    case 'ADD_CURRENT_ROUTINE_GROUP':
      return Object.assign(
        {}, state, {routine: Object.assign(
          {}, state.routine, {
            groups: [
              ...state.routine.groups,
              ...defaultRoutine(uuidV4, state.routine.groups.length + 1).groups
            ]
          }
        )
      });

    case 'REMOVE_CURRENT_ROUTINE_GROUP':
      const remainingGroups = state.routine.groups.filter((group) => {
        return group.id !== action.groupId;
      }).map((group, index) => Object.assign(group, {order: index + 1}));

      return Object.assign(
        {}, state, { routine: Object.assign(
          {}, state.routine, { groups: remainingGroups }
        )
      });

    case 'ADD_CURRENT_ROUTINE_INTERVAL':
      const groupsWithNewInterval = state.routine.groups.map((group) => {
        if (group.id === action.groupId) {
          const defaultInterval = defaultRoutine(uuidV4).groups[0].intervals[0];
          const intervals = [
            ...group.intervals,
            {...defaultInterval, order: group.intervals.length + 1}
          ];

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
          }).map((interval, index) => Object.assign(interval, {order: index + 1}));

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
        {}, state, {
          routine: defaultRoutine(uuidV4),
          playlist: [],
          completedPlaylist: [],
          saved: true
        }
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

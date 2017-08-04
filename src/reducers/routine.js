export function currentRoutineReducer(state = {
  loading: true,
  routine: {},
  playlist: [],
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

    default:
      return state;
  }
}

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

function createPlaylist(routine) {
  let playlist = [];

  for(let j = 0; j < routine.groups.length; j++) {
    let group = routine.groups[j];

    for(let times = 0; times < group.times; times++) {
      for(let i = 0; i < group.intervals.length; i++) {
        const interval = group.intervals[i];

        playlist.push({
          groupID: group.id,
          groupNumber: times + 1,
          name: interval.name,
          duration: interval.duration,
          nowPlaying: false,
          played: false,
        });
      }
    }
  }

  return playlist;
}

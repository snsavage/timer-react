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

function updatePlaylist(playlist) {
  let newPlaylist = [...playlist];

  newPlaylist[0].remainingDuration = newPlaylist[0].remainingDuration - 1;

  return newPlaylist;
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
          remainingDuration: interval.duration,
          nowPlaying: false,
          played: false,
        });
      }
    }
  }

  return playlist;
}

export function routineReducer(state = {
  loading: true,
  routine: {},
} , action) {
  switch(action.type) {
    case 'DELETE_ROUTINE':
      return Object.assign({}, { routine: {}, loading: false });

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
    case 'DELETE_ROUTINES':
      return Object.assign({}, { routines: [], loading: false });
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
